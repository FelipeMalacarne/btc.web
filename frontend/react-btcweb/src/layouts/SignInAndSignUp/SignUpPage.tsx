import {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import * as Yup from 'yup';
import {FormControl} from "@mui/material";
import AuthService from "../../services/AuthService";
import SigninRequestModel from "../../models/auth/SigninRequestModel";


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                Boteco Bar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [error, setError] = useState('');
    const {authState, login} = useAuth();

    if (!authState.isLoading && authState.isAuthenticated) {
        return <Navigate to='/secure'/>
    }

    const schema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        cpf: Yup.string().length(11, 'Informe um CPF válido').required('CPF is required'),
        email: Yup.string().email('Informe um email válido').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await schema.validate({username, cpf, email, password});
            const response = await AuthService.register(username, cpf, email, password);
            setDisplayWarning(false);
            setError('');

            const loginResponse = await login(new SigninRequestModel(username, password));
            setUsername('');
            setCpf('');
            setEmail('');
            setPassword('');

        } catch (e: any) {
            setDisplayWarning(true);
            console.log(e.message)
            setError(e.message);
        }


    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                onChange={e => {
                                    setUsername(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="cpf"
                                label="CPF"
                                name="cpf"
                                autoComplete="cpf"
                                onChange={e => {
                                    setCpf(e.target.value)
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    {displayWarning && (
                        <FormControl error>
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        </FormControl>
                    )}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2" color='text.primary'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </Container>

    )
}

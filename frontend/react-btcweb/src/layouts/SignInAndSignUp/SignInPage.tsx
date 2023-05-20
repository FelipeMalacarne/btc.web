import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider, FormControl, useTheme} from '@mui/material';
import {useState} from 'react';
import * as Yup from 'yup';
import SigninRequestModel from "../../models/auth/SigninRequestModel";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

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

export const SignInPage = () => {
    const theme = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const {authState, login} = useAuth();

    const schema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    if(!authState.isLoading && authState.isAuthenticated){
        return <Navigate to='/secure'/>
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await schema.validate({username, password});

            const response = await login(new SigninRequestModel(username, password));
            setDisplayWarning(false);
            setError('');
            setLoggedIn(true);
        } catch (err: any) {
            setDisplayWarning(true);
            setError('Usuario ou senha inválidos');
        }
    };

    // if (loggedIn) {
    //     return <Navigate to="/secure/inventory"/>
    // }

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
                    <Avatar sx={{
                        m: 1, 
                        bgcolor: theme.palette.secondary.main,
                        
                        }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={e => {
                                setUsername(e.target.value)
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        {displayWarning && (
                            <FormControl error>
                                <Typography variant="body2" align="center"
                                    sx={{
                                        color: theme.palette.error.main,
                                    }}
                                >
                                    {error}
                                </Typography>
                            </FormControl>
                        )}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" color={'text.secondary'}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2" color='text.secondary'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
    );
}

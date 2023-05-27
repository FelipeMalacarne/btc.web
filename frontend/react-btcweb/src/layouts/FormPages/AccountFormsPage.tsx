import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import { Header } from '../utils/Header'
import ERoles from '../../models/ERoles'
import RoleSetRequest from '../../models/requests/RolesSetRequest'
import AccountRequest from '../../models/requests/AccountRequest'
import authHeader from '../../services/AuthHeader'
import { error } from 'console'


export const AccountFormsPage = () => {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [roleName, setRoleName] = useState<string>('');
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [isHelperTextVisible, setIsHelperTextVisible] = useState({
    username: false,
    cpf: false,
    password: false,
    email: false,
    role: false
  });


  const handleCreateAccount = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const url = `${envUrl}/api/accounts`;
    const token = authHeader().Authorization;

    const rolesSetRequest = [{
      roleId: ERoles[roleName as keyof typeof ERoles].valueOf() + 1
    }] as RoleSetRequest[];

    const accountToCreate = new AccountRequest(
      username,
      cpf,
      email,
      password,
      rolesSetRequest
    );
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(accountToCreate)
    };
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (response.ok) {
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setHttpError('');
      setUsername('');
      setCpf('');
      setPassword('');
      setEmail('');
      setRoleName('');
    } else {
      setHttpError(responseData.message);
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (validateForm()) {
      handleCreateAccount().catch((error: any) => {
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      });
    } else {
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
  }
  const validateForm = () => {
    const isUsernameValid = username.length >= 3 && username.length <= 70;
    const isCpfValid = cpf.length === 11;
    const isPasswordValid = password.length >= 6 && password.length <= 70;
    const isEmailValid = email.length >= 6 && email.length <= 70;
    const isRoleValid = roleName.length > 0;

    const isValid = isUsernameValid && isCpfValid && isPasswordValid && isEmailValid && isRoleValid
    setIsHelperTextVisible({
      username: !isUsernameValid,
      cpf: !isCpfValid,
      password: !isPasswordValid,
      email: !isEmailValid,
      role: !isRoleValid
    })
    return isValid;
  }

  return (
    <Box m="1rem 3rem" height='calc(100vh - 200px)'>
      <Header title={'Usuários'} subtitle={'Cadastro de Usuários'} />
      <Box
        mt={3}
        height='100%'
        component='form'
        onSubmit={handleSubmit}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        <Box display={'flex'} flexDirection={'column'} flexGrow={1} gap={2}>
          <FormControl>
            <TextField
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              label={'Nome'}
              variant={'outlined'}
              required
              error={isHelperTextVisible.username}
              helperText={isHelperTextVisible.username ? 'Nome deve ter entre 3 e 70 caracteres' : ''}
            />
          </FormControl>

          <FormControl>
            <TextField
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              label={'CPF'}
              variant={'outlined'}
              required
              error={isHelperTextVisible.cpf}
              helperText={isHelperTextVisible.cpf ? 'CPF deve ter 11 caracteres' : ''}
            />
          </FormControl>

          <FormControl>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              label={'Email'}
              variant={'outlined'}
              required
              error={isHelperTextVisible.email}
              helperText={isHelperTextVisible.email ? 'Email deve ter entre 6 e 70 caracteres' : ''}
              type='email'
            />
          </FormControl>

          <FormControl>
            <TextField
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label={'Senha'}
              variant={'outlined'}
              required
              error={isHelperTextVisible.password}
              helperText={isHelperTextVisible.password ? 'Senha deve ter entre 6 e 70 caracteres' : ''}
              type='password'
            />
          </FormControl>


          <FormControl>
            <InputLabel id='role-label'>Role</InputLabel>
            <Select
              sx={{ width: '150px' }}
              labelId='role-label'
              id='roleName'
              label='Role'
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              error={isHelperTextVisible.role}
            >
              <MenuItem value={"ROLE_USER"}> User </MenuItem>
              <MenuItem value={"ROLE_MODERATOR"}> Moderator </MenuItem>
              <MenuItem value={"ROLE_ADMIN"}> Admin </MenuItem>
            </Select>
          </FormControl>
          {httpError &&
            <Alert severity="error">
              {httpError}
            </Alert>
          }
          {showSuccessAlert &&
            <Alert severity="success">
              Usuário cadastrado com sucesso!
            </Alert>
          }
          {showErrorAlert &&
            <Alert severity="error">
              Preencha corretamente os espaços!
            </Alert>
          }

        </Box>
        <Box sx={{}}>
          <Button
            type='submit'
            variant='contained'
            sx={{ width: '200px', height: '40px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.contrastText }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

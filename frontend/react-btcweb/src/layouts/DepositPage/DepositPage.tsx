import React, { useState } from 'react'
import { Header } from '../utils/Header'
import { Alert, Autocomplete, Box, Button, FormControl, Grid, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useIngredients } from '../../hooks/useIngredients';
import { useAuth } from '../../hooks/useAuth';
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DataGrid, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import { useStock } from '../../hooks/useStock'
import DepositRequest from '../../models/requests/DepositRequest'
import authHeader from '../../services/AuthHeader'
import AuthService from '../../services/AuthService'
import StockService from '../../services/StockService'
import { useNavigate } from 'react-router-dom'

dayjs.extend(localizedFormat); // Extend


export const DepositPage = () => {
  const theme = useTheme();
  const { authState } = useAuth();
  const nav = useNavigate();
  const { ingredients, setIngredients } = useIngredients();
  const [ingredientNameSelected, setIngredientNameSelected] = useState<string | null>('');
  const [httpError, setHttpError] = useState<string>('');
  // form data
  const [accountId, setAccountId] = useState<number>(AuthService.getCurrentUser()?.id);
  const [ingredientId, setIngredientId] = useState<number>();
  const [amount, setAmount] = useState<string>('');
  const [entryDate, setEntryDate] = useState(dayjs());
  const [expirationDate, setExpirationDate] = useState(dayjs());

  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [isHelperTextVisible, setIsHelperTextVisible] = useState({
    ingredient: false,
    amount: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid()) {
      const newStock: DepositRequest = {
        ingredientId: ingredientId!,
        accountId: accountId!,
        amount: parseFloat(amount),
        entryDate: new Date(entryDate.format()),
        expirationDate: new Date(expirationDate.format()),
      }
      StockService.postNewDeposit(newStock)
      .then((response) => {
        setShowSuccessAlert(true);
        setShowErrorAlert(false);
        setIngredientNameSelected('');
        setIngredientId(undefined);
        setAmount('');
      })
      .catch((error) => {
        console.log(error)
        setHttpError(error.message);
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      });
    } else {
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
  }
  const handleChange = (event: any, newValue: string | null) => {
    const ingredientSelected = ingredients.find(ingredient => ingredient.name === newValue);
    if (ingredientSelected) {
      setIngredientId(ingredientSelected.id);
    }
  }
  const isFormValid = () => {
    const floatAmnt = parseFloat(amount);
    const isAmountValid = floatAmnt > 0 && floatAmnt < 1000000;
    const isIngredientValid = ingredientId !== undefined;
    setIsHelperTextVisible({
      ingredient: !ingredientId,
      amount: !isAmountValid,
    })
    return isAmountValid && ingredientId;
  }
  if(authState?.user?.roles[0] === 'ROLE_USER') {
    nav('/secure')
  }

  return (
    <Box m='1rem 3rem' height='calc(100vh - 200px)'>
      <Header title={'Deposito'} subtitle={'Entrada de Estoque'} />
      <Box
        component={'form'}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        onSubmit={handleSubmit}
      >
        <Box display={'flex'} flexDirection={'column'} flex={1} gap={2}>
          <FormControl sx={{ width: '385px', maxWidth: '100%' }}>
            <Autocomplete
              value={ingredientNameSelected}
              onChange={(event: any, newValue: string | null) => {
                setIngredientNameSelected(newValue);
                handleChange(event, newValue);
              }}
              autoComplete
              options={ingredients.map((ingredient) => ingredient.name)}
              renderInput={(params) => <TextField {...params} label="Ingredient" />}
            />
          </FormControl>
          <Grid container spacing={2}
            sx={{ width: '400px', maxWidth: '100%' }}>
            <Grid item xs>
              <FormControl >
                <TextField
                  label="Quantidade"
                  type="number"
                  required
                  error={isHelperTextVisible.amount}
                  helperText={isHelperTextVisible.amount ? 'Quantidade inválida' : ''}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography>
                          {ingredientNameSelected ? ingredients.find(ingredient => ingredient.name === ingredientNameSelected)?.unitOfMeasure.name : ''}
                        </Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <DatePicker
                  label="Data de validade"
                  value={expirationDate}
                  onChange={(value) => { if (value) setExpirationDate(value) }}
                  disablePast
                />
              </FormControl>
            </Grid>
          </Grid>
          {httpError &&
            <Alert severity="error">
              {httpError}
            </Alert>
          }
          {showSuccessAlert &&
            <Alert severity="success">
              Depósito cadastrado com sucesso!
            </Alert>
          }
          {showErrorAlert &&
            <Alert severity="error">
              Preencha corretamente os espaços!
            </Alert>
          }
        </Box>
        <Button
          type='submit'
          variant='contained'
          sx={{ width: '200px', height: '40px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.contrastText }}
          disabled={ingredientNameSelected === '' || amount === ''}
        >
          Cadastrar
        </Button>
      </Box>
    </Box>
  )
}

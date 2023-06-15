import { Alert, Autocomplete, Box, Button, FormControl, InputAdornment, TextField, Typography, useTheme } from "@mui/material"
import { Header } from "../utils/Header"
import { useStock } from "../../hooks/useStock";
import AuthService from "../../services/AuthService";
import { useState } from "react";
import dayjs from "dayjs";
import StockService from "../../services/StockService";
import WithdrawRequest from "../../models/requests/WithdrawRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const WithdrawPage = () => {
  const theme = useTheme();
  const { stock, setStock } = useStock();
  const { authState } = useAuth();
  const nav = useNavigate();

  // form data
  const [stockName, setStockName] = useState<string | null>('');
  const [amount, setAmount] = useState<string>('');

  // form validation
  const [httpError, setHttpError] = useState<string>('');
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [isHelperTextVisible, setIsHelperTextVisible] = useState({
    stock: false,
    amount: false,
  });

  // Request Data
  const [accountId, setAccountId] = useState<number>(AuthService.getCurrentUser()?.id);
  const [ingredientId, setIngredientId] = useState<number>();
  const [leaveDate, setLeaveDate] = useState<Date>(new Date(dayjs().format()));

  const isFormValid = () => {
    const floatAmnt = parseFloat(amount);
    const isAmountValid = floatAmnt > 0 && floatAmnt <= 1000000;
    const isStockValid = stockName !== null && stockName !== '';
    setIsHelperTextVisible({
      stock: !isStockValid,
      amount: !isAmountValid,
    });
    return isAmountValid && isStockValid;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid()) {
      const request = new WithdrawRequest(
        ingredientId!,
        accountId!,
        parseFloat(amount),
        leaveDate
      )
      StockService.postNewWithdraw(request)
        .then((response) => {
          setShowSuccessAlert(true);
          setShowErrorAlert(false);
          setStockName('');
          setIngredientId(undefined);
          setAmount('');
        })
        .catch((error) => {
          console.log(error)
          setShowSuccessAlert(false);
          setShowErrorAlert(true);
        })
    } else {
      setShowSuccessAlert(false);
      setShowErrorAlert(false);
    }

  }
  const handleChange = (event: any, newValue: string | null) => {
    setStockName(newValue);
    const stockSelected = stock.find((stock) => stock.ingredient.name === newValue);
    if (stockSelected) {
      setIngredientId(stockSelected.ingredient.id);
    }
  }
  if(authState.user?.roles[0] == "ROLE_USER"){
    nav('/secure');
  }
  return (
    <Box m='1rem 3rem' height='calc(100vh - 200px)'>
      <Header title={"Retirada"} subtitle={"Saída de estoque"} />
      <Box
        component={'form'}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        onSubmit={handleSubmit}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          flex={1}
          gap={2}
          sx={{ width: '400px', maxWidth: '100%' }}
        >
          <FormControl>
            <Autocomplete
              value={stockName}
              onChange={handleChange}
              autoComplete
              options={stock.map((stock) => stock.ingredient.name)}
              renderInput={(params) => <TextField {...params} label="Item" />
            }
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Quantidade"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography>
                      {stockName ? 
                        stock.find(stock => stock.ingredient.name === stockName)?.ingredient.unitOfMeasure.name : ''}
                    </Typography>
                  </InputAdornment>
                )
              }}
              error={isHelperTextVisible.amount}
              helperText={isHelperTextVisible.amount ? 'Quantidade inválida' : ''}
            />
          </FormControl>
          {httpError &&
            <Alert severity="error">
              {httpError}
            </Alert>
          }
          {showSuccessAlert &&
            <Alert severity="success">
              Retirada cadastrada com sucesso!
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
          disabled={stockName === '' || amount === ''}
        >
          Cadastrar
        </Button>
      </Box>

    </Box>
  )
}

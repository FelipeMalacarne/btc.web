import { Alert, Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from "../utils/Header";
import authHeader from '../../services/AuthHeader';
import UnitOfMeasureModel from '../../models/UnitOfMeasureModel';
import NewIngredientRequest from '../../models/requests/NewIngredientRequest';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const IngredientFormsPage = () => {
  const theme = useTheme();
  const { authState } = useAuth();
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [units, setUnits] = useState<UnitOfMeasureModel[]>([]);
  const [selectedUnitSymbol, setSelectedUnitSymbol] = useState<string>('');
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientUnit, setIngredientUnit] = useState<UnitOfMeasureModel>();
  const [ingredientMin, setIngredientMin] = useState<string>('');
  const [ingredientMax, setIngredientMax] = useState<string>('');


  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  useEffect(() => {
    const fetchUnits = async () => {
      const envUrl = process.env.REACT_APP_API_URL;
      const Url = envUrl + '/api/units';
      const token = authHeader().Authorization;
      
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(Url, requestOptions);
      const responseData = await response.json();
      const loadedUnits: UnitOfMeasureModel[] = [];
      for (const key in responseData) {
        loadedUnits.push({
          id: responseData[key].id,
          name: responseData[key].name,
          symbol: responseData[key].symbol
        })
      }
      setUnits(loadedUnits);
      setIsLoading(false);
    }
    fetchUnits().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [])
  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedUnit = units.find(unit => unit.symbol === event.target.value);
    if (selectedUnit) setSelectedUnitSymbol(selectedUnit.symbol);
    setIngredientUnit(selectedUnit);
  };
  const validateForm = () => {
    const isNameValid = ingredientName.length > 0 && ingredientName.length < 50;
    return isNameValid && ingredientUnit;
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postNewIngredient = async () => {
      const envUrl = process.env.REACT_APP_API_URL;
      const Url = envUrl + '/api/ingredients';
      const token = authHeader().Authorization;
      if (!ingredientName || !ingredientUnit) return;
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(new NewIngredientRequest(
          ingredientName,
          Number(ingredientMin),
          Number(ingredientMax),
          ingredientUnit.id
          )),
      }
      console.log(JSON.stringify({
        name: ingredientName,
        unitOfMeasure: ingredientUnit
      }),)
      const response = await fetch(Url, requestOptions);
      const responseData = await response.json();
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setIngredientName('');
      setSelectedUnitSymbol('');
      setIngredientMin('');
      setIngredientMax('');
      setIngredientUnit(undefined);
    }
    if (validateForm()) {
      postNewIngredient().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    } else {
      setShowErrorAlert(true);
    }
  }
  if(authState?.user?.roles[0] === 'ROLE_USER') {
    nav('/secure')
  }
  if (isLoading) return <CircularProgress />
  return (
    <Box m="1rem 3rem" height='calc(100vh - 200px)'>
      <Header title={'Ingredientes'} subtitle={'Cadastro de Ingredientes'} />
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
              sx={{ width: '300px' }}
              id='ingredient-name'
              label='Nome do ingrediente'
              variant='outlined'
              value={ingredientName}
              onChange={(event) => setIngredientName(event.target.value)}
              required
              error={ingredientName.length >= 50}
              helperText={ingredientName.length >= 50 ?
                'Name must be less than 50 characters' : ''
              }
            />
          </FormControl>
          <FormControl>
            <TextField
              sx={{ width: '300px' }}
              id='ingredient-min'
              label='Quantidade mínima'
              variant='outlined'
              value={ingredientMin}
              onChange={(event) => {
                if(event.target.value.toString().length <= 6){
                  setIngredientMin(event.target.value)
                }}}
              required
              error={Number(ingredientMin) < 0}
              helperText={Number(ingredientMin) < 0 ?
                'Quantidade mínima deve ser maior que 0' : ''
              }
            />
          </FormControl>
          <FormControl>
            <TextField
              sx={{ width: '300px' }}
              id='ingredient-max'
              label='Quantidade máxima'
              variant='outlined'
              value={ingredientMax}
              onChange={(event) => {
                if(event.target.value.toString().length <= 6){
                  setIngredientMax(event.target.value)
                }}}
              required
              error={Number(ingredientMax) < 0}
              helperText={Number(ingredientMax) < 0 ?
                'Quantidade máxima deve ser maior que 0' : ''
              }

            />
          </FormControl>
          <FormControl>
            <InputLabel id='unit-select-label'>Unidade</InputLabel>
            <Select
              sx={{ width: '100px' }}
              labelId='unit-select-label'
              id='unit-select'
              value={selectedUnitSymbol}
              label='Unidade'
              onChange={handleSelectChange}
              required
            >
              {units.map(unit => (
                <MenuItem key={unit.id} value={unit.symbol}>{unit.symbol}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {httpError &&
            <Alert severity="error">
              {httpError}
            </Alert>
          }
          {showSuccessAlert &&
            <Alert severity="success">
              Ingrediente cadastrado com sucesso!
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
            disabled={!ingredientName || !ingredientUnit}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

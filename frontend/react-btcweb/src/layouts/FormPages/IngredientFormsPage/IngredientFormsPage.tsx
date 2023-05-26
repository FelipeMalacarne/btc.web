import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from "../../utils/Header";
import authHeader from '../../../services/AuthHeader';
import UnitOfMeasureModel from '../../../models/UnitOfMeasureModel';

export const IngredientFormsPage = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [units, setUnits] = useState<UnitOfMeasureModel[]>([]);
  const [selectedUnitName, setSelectedUnitName] = useState<string>('');

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
        }}
      const response = await fetch(Url, requestOptions);
      const responseData = await response.json();
      const loadedUnits: UnitOfMeasureModel[] = [];
      for (const key in responseData) {
        loadedUnits.push({
          id: responseData[key].id,
          name: responseData[key].name,
          symbol: responseData[key].symbol
        })}
      setUnits(loadedUnits);
      setIsLoading(false);
    }
    fetchUnits().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  },[])

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedUnit = units.find(unit => unit.name === event.target.value);
    if(selectedUnit) setSelectedUnitName(selectedUnit.name);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  
  if(httpError) return <h1>{httpError}</h1>
  if(isLoading) return <CircularProgress/>
  return (
    <Box m="1rem 3rem">
      <Header   title={'Ingredientes'} subtitle={'Cadastro de Ingredientes'}/>
        <Box 
          component='form'
          onSubmit={handleSubmit}
          display={'flex'} 
          flexDirection={'column'} 
          gap={3}
        >
          <FormControl>
            <TextField
              sx={{width: '300px'}}
              id='ingredient-name'
              label='Nome do ingrediente'
              variant='outlined'
              required
            />
          </FormControl>

          
          <FormControl sx={{width: '300px'}}>
            <InputLabel id='unit-select-label'>Unidade de medida</InputLabel>
            <Select
              labelId='unit-select-label'
              id='unit-select'
              value={selectedUnitName}
              label='Unidade de medida'
              onChange={handleSelectChange}
              required
              >
              {units.map(unit => (
                <MenuItem key={unit.id} value={unit.name}>{unit.name}</MenuItem> 
                ))}
            </Select>
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            sx={{width: '300px', height: '35px', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}}
          >
            Cadastrar
          </Button>
        </Box>
    </Box>
  )
}

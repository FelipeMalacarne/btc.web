import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'
import IngredientModel from '../../../models/IngredientModel'
import { useUnits } from '../../../hooks/useUnits'
import UnitOfMeasureModel from '../../../models/UnitOfMeasureModel'
import authHeader from '../../../services/AuthHeader'
import NewIngredientRequest from '../../../models/requests/NewIngredientRequest'

interface EditIngredientDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ingredient: IngredientModel | undefined
  ingredients: IngredientModel[]
  setIngredients: React.Dispatch<React.SetStateAction<IngredientModel[]>>
}

export const EditIngredientDialog: React.FC<EditIngredientDialogProps> = (props) => {
  const theme = useTheme();
  const { units, setUnits } = useUnits();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  const [ingredientName, setIngredientName] = useState<string>(props.ingredient?.name || '');
  const [ingredientUnit, setIngredientUnit] = useState<UnitOfMeasureModel>(props.ingredient?.unitOfMeasure || {} as UnitOfMeasureModel);
  const [selectedUnitSymbol, setSelectedUnitSymbol] = useState<string>(props.ingredient?.unitOfMeasure.symbol || '');


  const handleEditIngredient = async () => {
    const evnUrl = process.env.REACT_APP_API_URL;
    const url = evnUrl + '/api/ingredients/' + props.ingredient?.id;
    const token = authHeader().Authorization;

    const newIngredientRequest: NewIngredientRequest = {
      name: ingredientName,
      unitOfMeasureId: ingredientUnit.id
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIngredientRequest)
    }

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    const updatedIngredient: IngredientModel = {
      id: responseData.id,
      name: responseData.name,
      unitOfMeasure: responseData.unitOfMeasure
    }
    const updatedIngredients = props.ingredients.map(ingredient => {
      if (ingredient.id === updatedIngredient.id) {
        return updatedIngredient;
      }
      return ingredient;
    }
    )
    props.setIngredients(updatedIngredients);
    setIsLoading(false);
    setShowSuccessAlert(true);
    setShowErrorAlert(false);
    props.setOpen(false);
  }


  const handleClose = () => { props.setOpen(false) };
  const handleSubmit = () => {
    if (validateForm()) {
      handleEditIngredient().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      })
    } else {
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedUnit = units.find(unit => unit.symbol === event.target.value);
    if (selectedUnit) {
      setSelectedUnitSymbol(selectedUnit.symbol);
      setIngredientUnit(selectedUnit);
    }
  };
  const validateForm = () => {
    const isNameValid = ingredientName.length > 0 && ingredientName.length < 50;
    return isNameValid && ingredientUnit;
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      
    >
      <DialogTitle fontSize={'24px'} fontWeight={'bold'}>
        Editar ingrediente
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          color: theme.palette.text.primary,
          label: { color: theme.palette.secondary.main }
        }}>
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
          {showSuccessAlert &&
            <Alert severity='success' sx={{ width: '100%' }}>
              Ingrediente editado com sucesso!
            </Alert>
          }
          {showErrorAlert &&
            <Alert severity='error' sx={{ width: '100%' }}>
              Preencha os campos corretamente!
            </Alert>
          }
        </Box>
      </DialogContent>
      <DialogActions>
          <Button
            onClick={handleClose}sx={{ color: theme.palette.text.primary }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant='contained'
            sx={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            Save
          </Button>
        </DialogActions>

    </Dialog>
  )
}

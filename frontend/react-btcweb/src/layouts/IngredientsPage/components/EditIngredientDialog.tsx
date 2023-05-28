import { Alert, Box, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material'
import React from 'react'
import IngredientModel from '../../../models/IngredientModel'

interface EditIngredientDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ingredient: IngredientModel | undefined
}

export const EditIngredientDialog: React.FC<EditIngredientDialogProps> = (props) => {
  const theme = useTheme();


  const handleClose = () => { };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle fontSize={'24px'} fontWeight={'bold'}>
        Edit Product
      </DialogTitle>
      {/* <DialogContent dividers>
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
        </Box>
      </DialogContent> */}

    </Dialog>
  )
}

import { Box, Divider, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import authHeader from '../../../services/AuthHeader';
import { Warning } from '@mui/icons-material';
import React from 'react'
import IngredientModel from '../../../models/IngredientModel';

interface DeleteIngredientDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ingredientId: number
  ingredients: IngredientModel[]
  setIngredients: React.Dispatch<React.SetStateAction<IngredientModel[]>>
}

export const DeleteIngredientDialog: React.FC<DeleteIngredientDialogProps> = (props) => {
  const theme = useTheme();
  const handleClickOpen = () => {
    props.setOpen(true);
  }
  const handleClose = () => {
    props.setOpen(false);
  }
  
  const handleDelete = () => {
    const fetchDeleteIngredient = async () => {
      const envUrl = process.env.REACT_APP_API_URL;
      const url = envUrl + '/api/ingredients/' + props.ingredientId;
      const token = authHeader().Authorization;

      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      }
      const response = await fetch(url, requestOptions);
      if(response.ok){
        const newIngredients = props.ingredients.filter(ingredient => ingredient.id !== props.ingredientId);
        props.setIngredients(newIngredients);
      }
    }
    fetchDeleteIngredient().catch((error: any) => {
      console.log(error);
    })
    props.setOpen(false);
  }



  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" display={'flex'} alignItems='center' fontSize={'18px'} fontWeight={'bold'}>
        <Warning sx={{
          color: 'red',
          mr: 1,
          fontSize: '24px'
        }} />
        {'Excluir Ingrediente'}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{
          color: theme.palette.text.primary
        }}>
          Tem certeza que deseja excluir o ingrediente e todos os seus dados?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            color: theme.palette.text.primary
          }}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          onClick={handleDelete}
          autoFocus
          sx={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          }}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}

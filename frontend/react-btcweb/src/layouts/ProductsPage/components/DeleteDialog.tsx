import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import authHeader from '../../../services/AuthHeader';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Divider, Typography, useTheme } from '@mui/material';


interface DeleteModalProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  productId: number
  // onDelete: (productId: number) => void
}

export const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const theme = useTheme();
  const handleClickOpen = () => {
    props.setOpen(true);
  }
  const handleClose = () => {
    props.setOpen(false);
  }

  const handleDelete = () => {
    const fetchDeleteProduct = async () => {
      const envUrl = process.env.REACT_APP_API_URL;
      const url = envUrl + '/api/products/' + props.productId;
      const token = authHeader().Authorization;

      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      }
      const response = await fetch(url, requestOptions);
      console.log(response)
      const responseData = await response.json();
    }
    fetchDeleteProduct().catch((error: any) => {
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
      <DialogTitle id="alert-dialog-title" display={'flex'} alignItems='center'>
        <WarningIcon sx={{ 
          color: 'red',
          mr: 1, 
          }} />
        {'Excluir produto'}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{
          color: theme.palette.text.primary
        }}>
          Tem certeza que deseja excluir o produto e todos os seus dados?
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

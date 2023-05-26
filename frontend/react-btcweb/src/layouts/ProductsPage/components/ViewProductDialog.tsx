import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material'
import React from 'react'
import ProductModel from '../../../models/ProductModel'

interface ViewDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  product: ProductModel | undefined
}

export const ViewProductDialog: React.FC<ViewDialogProps> = (props) => {
  const theme = useTheme();

  const handleClose = () => props.setOpen(false);
  
  
  
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const productPrice = currencyFormatter.format(Number(props.product?.price));


  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style:{
          backgroundColor: theme.palette.background.default,
        }
      }}
    >
      <DialogTitle id="alert-dialog-title" fontSize={'24px'} fontWeight={'bold'} >
        {props.product?.name}
      </DialogTitle>
      <DialogContent dividers>
        <Typography 
          gutterBottom 
          variant='subtitle1' 
          fontWeight={'bold'} 
          color={theme.palette.secondary.main}
        >
          Description
        </Typography>
        <Typography gutterBottom variant='body1'>
          {props.product?.description}
        </Typography>
        <Typography 
          gutterBottom 
          variant='subtitle1' 
          fontWeight={'bold'}
          color={theme.palette.secondary.main}
          >
          Price
        </Typography>
        <Typography gutterBottom variant='body1'>
          {currencyFormatter.format(Number(props.product?.price))}
        </Typography>
        <Typography 
          gutterBottom 
          variant='subtitle1' 
          fontWeight={'bold'}
          color={theme.palette.secondary.main}
          >
          Categories:
        </Typography>
        <Typography gutterBottom variant='body1'>
          {props.product?.categorySet[0].name}
        </Typography>
        <Typography 
          gutterBottom
          variant='subtitle1' 
          fontWeight={'bold'}
          color={theme.palette.secondary.main}
        >
          Ingredients:
        </Typography>
        <List
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: '8px',
          }}
        >
          {props.product?.ingredientList.map((ingredient) => (
            <ListItem key={ingredient.ingredient.id}>
              <ListItemText
                primary={ingredient.ingredient.name} 
                secondary={`Amount: 
                  ${ingredient.amount} 
                  ${ingredient.ingredient.unitOfMeasure.symbol}`} 
                />
            </ListItem>
          ))
          }
          </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant='outlined'
          sx={{
            color: theme.palette.text.primary
          }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>

  )
}

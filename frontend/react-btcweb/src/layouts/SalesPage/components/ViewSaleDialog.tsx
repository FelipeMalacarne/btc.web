import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material'
import React from 'react'
import SaleModel from '../../../models/SaleModel'
import dayjs from 'dayjs'

interface ViewSaleDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  sale: SaleModel | undefined
}
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const ViewSaleDialog: React.FC<ViewSaleDialogProps> = (props) => {
  const theme = useTheme();
  const handleClose = () => props.setOpen(false);
  console.log(props.sale)

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.default,
        }
      }}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" fontSize={'24px'} fontWeight={'bold'} >
        {'Venda ' + props.sale?.id }
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          gutterBottom
          variant='subtitle1'
          fontWeight={'bold'}
          color={theme.palette.secondary.main}
        >
          Vendido por:
        </Typography>
        <Typography gutterBottom variant='body1'>
          {`${props.sale?.account.name} - ${props.sale?.account.roles[0].name.substring(5)}`}
        </Typography>

        <Typography
          gutterBottom
          variant='subtitle1'
          fontWeight={'bold'}
          color={theme.palette.secondary.main}
        >
          Data
        </Typography>
        <Typography gutterBottom variant='body1'>
          {dayjs(props.sale?.time).format('DD/MM/YYYY HH:mm:ss')}
        </Typography>

        <Typography
          gutterBottom
          variant='subtitle1'
          fontWeight={'bold'}
          color={theme.palette.secondary.main}
        >
          Valor Total
        </Typography>
        <Typography gutterBottom variant='body1'>
          {currencyFormatter.format(Number(props.sale?.total))}
        </Typography>
        <Typography
          gutterBottom
          variant='subtitle1'
          fontWeight={'bold'}
          color={theme.palette.secondary.main}
        >
          Produtos:
        </Typography>
        <List
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: '8px',
          }}
        >
        {props.sale?.productList.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.amount}x ${item.product.name}`}
              secondary={currencyFormatter.format(Number(item.product.price * item.amount)) }

            />
          </ListItem>
        ))}
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

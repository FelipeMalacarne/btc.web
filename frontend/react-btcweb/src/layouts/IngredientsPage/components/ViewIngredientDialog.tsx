import React from 'react'
import IngredientModel from '../../../models/IngredientModel'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'

interface ViewDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ingredient: IngredientModel | undefined
}

export const ViewIngredientDialog: React.FC<ViewDialogProps> = (props) => {
  const theme = useTheme();

  const handleClose = () => props.setOpen(false);

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
    >
      <DialogTitle id="alert-dialog-title" fontSize={'24px'} fontWeight={'bold'} >
        {props.ingredient?.name}
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          gutterBottom
          variant='subtitle1'
          fontWeight={'bold'}
          color={theme.palette.secondary.main}
        >
          Unit of Measure:
        </Typography>
       <Box display={'flex'} gap={3}>
        <Typography gutterBottom variant='body1'>
          {props.ingredient?.unitOfMeasure.name}
        </Typography>
        <Typography gutterBottom variant='body1'>
          {props.ingredient?.unitOfMeasure.symbol}
        </Typography>
       </Box>
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

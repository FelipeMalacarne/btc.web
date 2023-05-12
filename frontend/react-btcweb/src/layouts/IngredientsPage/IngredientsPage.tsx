import { Box, Button, ButtonGroup, useTheme } from '@mui/material'
import React from 'react'
import { Header } from '../utils/Header'

export const IngredientsPage = () => {
  const theme = useTheme();
  return (
    <Box p={3}>
      <Header title='Ingredientes' subtitle='Vizualização de ingredientes' />
      <Box display='flex' justifyContent={'center'} >
        <ButtonGroup fullWidth>
          <Button>Adicionar</Button>
          <Button>Remover</Button>
          <Button>Editar</Button>
          <Button>Registrar Novo Ingrediente</Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

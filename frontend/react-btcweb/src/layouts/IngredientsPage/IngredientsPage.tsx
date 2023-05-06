import { Box, Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { Header } from '../Utils/Header'

export const IngredientsPage = () => {
  return (
    <Box p={3}>
      {/* <Header title='Ingredientes' subtitle='Vizualização de ingredientes' /> */}
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

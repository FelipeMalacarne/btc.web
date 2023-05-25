import { Box, Grid, TextField } from '@mui/material'
import React from 'react'
import { Header } from "../../utils/Header";

export const IngredientFormsPage = () => {
  return (
    <Box m="1rem 3rem">
      <Header title={'Ingredientes'} subtitle={'Cadastro de Ingredientes'}/>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Nome"
            autoComplete="given-name"
          />

      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="description"
          name="description"
          label="Descrição"
          autoComplete="family-name"
        />
      </Grid>
      </Grid>
    </Box>
  )
}

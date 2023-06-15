import { Box, useTheme } from '@mui/material'
import React from 'react'
import { useAccounts } from '../../hooks/useAccounts';
import { Loading } from '../utils/Loading';
import { Header } from '../utils/Header';
import { DataGrid, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const UsersPage = () => {
  const theme = useTheme();
  const { authState } = useAuth();
  const nav = useNavigate();
  const { accounts, isLoading, httpError } = useAccounts();
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Nome', minWidth: 100, flex: 1 },
    { field: 'cpf', headerName: 'CPF', minWidth: 100, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 100, flex: 1 },
    { field: 'roles', headerName: 'Cargo', width: 120 , 
    valueGetter: (params: GridValueGetterParams) => params.row.roles[0].name.substring(5) },
  ]


  if(authState?.user?.roles[0] === 'ROLE_USER' || authState?.user?.roles[0] === 'ROLE_MODERATOR') {
    nav('/secure')
  }
  if (isLoading) return <Loading/>
  if (httpError) return <div>{httpError}</div>
  return (
    <Box m='1rem 3rem'>
    <Header title={'Usuários'} subtitle={'Usuários cadastrados'} />
    <Box mt='40px' height='75vh'
      sx={{
        width: '99%',
        '& .MuiDataGrid-root': {
          border: 'none',
          '& .MuiDataGrid-cell': {
            border: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: 'none',
          },
          '& .MuiDataGrid-row': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: 'none',
          },
          '&. MuiDataGrid-toolbar': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: 'none',
          },
          '& .MuiButton-root': {
            // Defina a cor do texto dos botões na barra de ferramentas
            color: theme.palette.text.primary,
          },
        }
      }}
      >
      <DataGrid
        rows={accounts || []}
        columns={columns}
        getRowId={(row) => row.id}
        slots={{
          toolbar: GridToolbar
        }}
        loading={isLoading}
        autoHeight
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        density='compact'
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
          },
        }}
      />
    </Box>
  </Box>
  )
}

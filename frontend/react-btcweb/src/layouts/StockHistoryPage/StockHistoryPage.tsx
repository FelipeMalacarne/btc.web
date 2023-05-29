import React from 'react'
import { Header } from '../utils/Header'
import { Box, useTheme } from '@mui/material'
import { useStockMovement } from '../../hooks/useStockMovement'
import { DataGrid, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'

export const StockHistoryPage = () => {
  const theme = useTheme();
  const { stockMovement, isLoading } = useStockMovement();
  console.log(stockMovement)

  const columns=[
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'type', headerName: 'Tipo', minWidth: 100 },
    { field: 'accountName', headerName: 'Usuário', minWidth: 100, flex: 1 },
    { field: 'ingredient.name', headerName: 'Ingrediente', minWidth: 100, flex: 1, 
      valueGetter: (params: GridValueGetterParams) => params.row.ingredient.name },
    { field: 'amount', headerName: 'Quantidade', minWidth: 100 },
    { field: 'date', headerName: 'Data', width: 150,
      valueGetter: (params: GridValueGetterParams) => dayjs(params.row.date).format('DD/MM/YYYY HH:mm:ss') }

    
  ]

  return (
    <Box m='1rem 3rem'>
      <Header title={'Histórico'} subtitle={'Movimentações do estoque'} />
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
          }
        }}
      >
        <DataGrid
          rows={stockMovement || []}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{
            toolbar: GridToolbar
          }}
          loading={isLoading}
          autoHeight
          disableColumnMenu
          disableColumnSelector
        />
      </Box>
    </Box>
    )
}

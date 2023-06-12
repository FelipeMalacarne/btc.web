import { Box, CircularProgress, useTheme } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../utils/Header";
import { useEffect, useState } from "react";
import authHeader from "../../services/AuthHeader";
import StockModel from "../../models/StockModel";
import FlexBetween from "../utils/FlexBetween";
import { Loading } from "../utils/Loading";
import { DataGrid, GridToolbar, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";
import { useStock } from "../../hooks/useStock";

export const InventoryPage = () => {
  const theme = useTheme();
  const { stock, isLoading, httpError } = useStock();
  const columns = [
    { field: 'id', headerName: 'ID', minwidth: 80 },
    {
      field: 'ingredient',
      headerName: 'Item',
      flex: 3,
      valueGetter: (params: GridValueGetterParams) => params.row.ingredient.name
    },
    {
      field: 'minAmount',
      headerName: 'Min',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.ingredient.min} ${params.row.ingredient.unitOfMeasure.symbol}`
      }
    },
    {
      field: 'maxAmount',
      headerName: 'Max',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.ingredient.max} ${params.row.ingredient.unitOfMeasure.symbol}`
      }
    },
    {
      field: 'amount',
      headerName: 'Armazenado',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.amount} ${params.row.ingredient.unitOfMeasure.symbol}`
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.amount > params.row.ingredient.max ? 'Excesso' : params.row.amount < params.row.ingredient.min ? 'Falta' : 'Normal'
    }
  ]

  if (httpError) return <p>{httpError}</p>
  if (isLoading) return <Loading />
  return (
    <Box m="1rem 3rem">
      <Header title='Inventário' subtitle='Vizualização do inventário' />
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
          rows={stock}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{
            toolbar: GridToolbar
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}
          loading={isLoading}
          autoHeight
          disableColumnMenu
          disableColumnSelector
          density="compact"
          disableDensitySelector
        />
      </Box>
    </Box>
  );
}
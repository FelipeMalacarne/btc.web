import { Box, ButtonGroup, IconButton, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Header } from '../utils/Header'
import { useSales } from '../../hooks/useSales';
import { DataGrid, GridCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { Loading } from '../utils/Loading';
import dayjs from 'dayjs';
import { VisibilityOutlined } from '@mui/icons-material';
import SaleModel from '../../models/SaleModel';
import { ViewSaleDialog } from './components/ViewSaleDialog';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const SalesPage = () => {
  const theme = useTheme();
  const { sales, isLoading, httpError } = useSales();
  const [showViewDialog, setShowViewDialog] = useState<boolean>(false);
  const [saleSelected, setSaleSelected] = useState<SaleModel | undefined>(undefined);

  console.log(sales)

  const handleViewClick = (params: GridCellParams) => {
    const saleId = params.id as number;
    const sale = sales.find(sale => sale.id === saleId);
    setSaleSelected(sale);
    setShowViewDialog(true);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'accountName', headerName: 'Usuário', minWidth: 100, flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.account.name
      }
    },
    {
      field: 'total', headerName: 'Total', minWidth: 100, flex: 1,
      valueFormatter: ({ value }: any) => currencyFormatter.format(Number(value))
    },
    { field: 'totalItems', headerName: 'nº Itens', width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.productList.length
      }
    },
    {
      field: 'time', headerName: 'Data', width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return dayjs(params.row.time).format('DD/MM/YYYY HH:mm:ss')
      }
    },
    {
      field: 'actions', headerName: 'Ações', width: 60,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => {
        return (
          <ButtonGroup>
            <IconButton onClick={() => handleViewClick(params)}>
              <VisibilityOutlined sx={{
                color: theme.palette.text.primary
              }} />
            </IconButton>
          </ButtonGroup>
        );
      },

    }
  ]

  if (isLoading) return <Loading />
  if (httpError) return <div>{httpError}</div>
  return (
    <Box m={'1rem 3rem'} >
       {showViewDialog && (
        <ViewSaleDialog
          open={showViewDialog}
          setOpen={setShowViewDialog}
          sale={saleSelected} />
      )}
      <Header title='Vendas' subtitle='Vizualização de Vendas' />
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
          rows={sales || []}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{
            toolbar: GridToolbar
          }}
          loading={isLoading}
          autoHeight
          disableColumnMenu
          disableColumnSelector
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

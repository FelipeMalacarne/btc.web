import { useEffect, useState, useContext } from 'react'
import { useAuth } from '../../hooks/useAuth';
import ProductModel from '../../models/ProductModel';
import authHeader from '../../services/AuthHeader';
import { Box, Button, ButtonGroup, CircularProgress, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import {
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  Edit,
  EditOutlined as EditOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon
} from '@mui/icons-material';
import { Header } from '../utils/Header';
import { DeleteProductDialog } from './components/DeleteProductDialog';
import { ViewProductDialog } from './components/ViewProductDialog';
import { EditProductDialog } from './components/EditProductDialog';

export const ProductsPage = () => {
  const theme = useTheme();
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductModel[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showViewDialog, setShowViewDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [idProductSelected, setIdProductSelected] = useState<number>(0);
  const [productSelected, setProductSelected] = useState<ProductModel | undefined>(undefined);

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });


  useEffect(() => {
    const fetchProducts = async () => {
      const envUrl = process.env.REACT_APP_API_URL;
      const Url = envUrl + '/api/products';
      const token = authHeader().Authorization;

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(Url, requestOptions);
      const responseData = await response.json();
      const loadedProducts: ProductModel[] = [];
      for (const key in responseData) {
        loadedProducts.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          isActive: responseData[key].active,
          categorySet: responseData[key].categorySet,
          ingredientList: responseData[key].ingredientList
        })
      }
      setProducts(loadedProducts);
      setIsLoading(false);
    }
    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, [authState, showDeleteDialog, showEditDialog])

  const handleDeleteClick = (params: GridCellParams) => {
    const productId = params.id as number;
    setIdProductSelected(productId);
    setShowDeleteDialog(true);
  };
  const handleViewClick = (params: GridCellParams) => {
    const productId = params.id as number;
    const product = products.find(product => product.id === productId);
    setProductSelected(product);
    setShowViewDialog(true);
  }
  const handleEditClick = (params: GridCellParams) => {
    const productId = params.id as number;
    const product = products.find(product => product.id === productId);
    setProductSelected(product);
    setShowEditDialog(true);
  }


  if (httpError) {
    return <h1>{httpError}</h1>
  }
  if (isLoading && authState.isLoading) {
    return <CircularProgress />
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 80,
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      flex: 20
    },
    {
      field: "price",
      headerName: "Price",
      valueFormatter: ({ value }: any) => currencyFormatter.format(Number(value)),
      minWidth: 100,
      flex: 2
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      flex: 3,
      renderCell: (params: GridCellParams) => {
        return (
          <ButtonGroup>
            <IconButton onClick={() => handleViewClick(params)}>
              <VisibilityOutlinedIcon sx={{
                color: theme.palette.text.primary
              }} />
            </IconButton>
            <IconButton onClick={() => handleEditClick(params)}>
              <EditOutlinedIcon sx={{
                color: theme.palette.text.primary
              }} />
            </IconButton>

            <IconButton onClick={() => handleDeleteClick(params)}>
              <DeleteOutlineOutlinedIcon sx={{
                color: theme.palette.error.main,
              }} />
            </IconButton>
          </ButtonGroup>
        );
      },
    },

  ]

  return (
    <Box m="1rem 3rem">
      {showDeleteDialog && (
        <DeleteProductDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          productId={idProductSelected}
        />
      )}
      {showViewDialog && (
        <ViewProductDialog
          open={showViewDialog}
          setOpen={setShowViewDialog}
          product={productSelected}/>
      )}
      {showEditDialog && (
        <EditProductDialog
          open={showEditDialog}
          setOpen={setShowEditDialog}
          product={productSelected}/>
      )}
      <Header title='Produtos' subtitle='Vizualização de produtos' />
      {/* <Button variant='outlined' sx={{
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
      }}>
          Criar Novo Produto
      </Button> */}
      <Box mt='40px' height='75vh'
        sx={{
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
          rows={products || []}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{
            toolbar: GridToolbar
          }}
          loading={isLoading}
        />
      </Box>
    </Box>
  )
}

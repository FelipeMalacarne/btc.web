import { useEffect, useState, useContext } from 'react'
import { useAuth } from '../../hooks/useAuth';
import ProductModel from '../../models/ProductModel';
import authHeader from '../../services/AuthHeader';
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Margin, Padding } from '@mui/icons-material';
import { Header } from '../utils/Header';



export const ProductsPage = () => {

  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductModel[]>([])



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
          categories: responseData[key].categories,
          ingredientList: responseData[key].ingredients
        })
      }

      setProducts(loadedProducts);
      setIsLoading(false);  
    }


    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, [authState])

  console.log(products)

  if (httpError) {
    return <h1>{httpError}</h1>
  }

  if (isLoading && authState.isLoading) {
    return <h1>Loading</h1>
  }

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "price", headerName: "Price" },
  ]

  return (
    <Box p={3}>
      <Header title='Produtos' subtitle='Vizualização de produtos' />
      <ButtonGroup fullWidth>
        <Button>Adicionar</Button>
        <Button>Remover</Button>
        <Button>Editar</Button>
        <Button>Registrar Novo Ingrediente</Button>
      </ButtonGroup>
      {/* Search bar */}
      <Box display={"flex"}>
        <TextField sx={{ flex: 1, m: 3}} fullWidth id="fullWidth" />
      </Box>
      <DataGrid
        rows={products}
        columns={columns}
      />
    </Box>
  )
}

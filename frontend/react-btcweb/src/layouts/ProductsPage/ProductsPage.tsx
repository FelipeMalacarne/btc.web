import { useEffect, useState, useContext } from 'react'
import { useAuth } from '../../hooks/useAuth';
import ProductModel from '../../models/ProductModel';
import authHeader from '../../services/AuthHeader';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Padding } from '@mui/icons-material';



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
      for(const key in responseData){
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

  if(httpError){
    return <h1>{httpError}</h1>
  }

  if(isLoading && authState.isLoading){
    return <h1>Loading</h1>
  }

  const columns = [
    {field: "id", headerName: "ID"},
    {field: "name", headerName: "Name", flex: 1},
    {field: "description", headerName: "Description", flex: 2},
    {field: "price", headerName: "Price"},
  ]

  return (
    <Box p={3}>
      <Typography variant='h4' pb={3}>
        Products
      </Typography>
      <DataGrid 
        rows={products}
        columns={columns}
        pagination={true}
        autoHeight
        checkboxSelection
      />
    </Box>
  )
}

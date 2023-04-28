import { useEffect, useState, useContext } from 'react'
import { useAuth } from '../../hooks/useAuth';
import ProductModel from '../../models/ProductModel';


export const ProductsPage = () => {

  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductModel[]>([])



  useEffect(() => {
    const fetchProducts = async () => {
      const envUrl = process.env.REACT_APP_API_URL;
      const Url = envUrl + '/api/products';
      const token = authState.user?.token;

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }  
      }
      console.log(requestOptions)
      const response = await fetch(Url, requestOptions);
      const reponseData = await response.json();

      const loadedProducts: ProductModel[] = [];
      for(const key in reponseData){
          loadedProducts.push({
            id: reponseData[key].id,
            name: reponseData[key].name,
            description: reponseData[key].description,
            price: reponseData[key].price,
            isActive: reponseData[key].active,
            categories: reponseData[key].categories,
            ingredientList: reponseData[key].ingredients
        })
      }

      setProducts(loadedProducts);
      setIsLoading(false);
    }

    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    {console.log(products)}

}, [authState])

  if(isLoading && authState.isLoading){
    return <h1>Loading</h1>
  }

  return (
    <div>ProductsPage</div>
  )
}

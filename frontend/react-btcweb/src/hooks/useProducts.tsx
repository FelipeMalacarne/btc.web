import { useEffect, useState } from "react";
import ProductModel from "../models/ProductModel";
import authHeader from "../services/AuthHeader";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, [])
  


  return { products, setProducts, isLoading, httpError }
}

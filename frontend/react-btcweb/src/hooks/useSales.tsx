import React, { useEffect, useState } from 'react'
import SaleModel from '../models/SaleModel';
import authHeader from '../services/AuthHeader';

export const useSales = () => {
  const [sales, setSales] = useState<SaleModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>('');

  const fetchSales = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const Url = envUrl + '/api/sales';
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
    setSales(responseData);
    setIsLoading(false);
    setHttpError('');
  }

  useEffect(() => {
    fetchSales().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [])

  return { sales, setSales, isLoading, httpError }
}

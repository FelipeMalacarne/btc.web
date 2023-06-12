import React, { useEffect, useState } from 'react'
import AccountModel from '../models/AccountModel'
import authHeader from '../services/AuthHeader'

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<AccountModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [httpError, setHttpError] = useState<string | null>(null)

  const fetchAccounts = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const Url = envUrl + '/api/accounts';
    const token = authHeader().Authorization;

    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }
    try{ 
      const response = await fetch(Url, requestOptions);
      const responseData = await response.json();
      const loadedAccounts: AccountModel[] = [];
      for (const key in responseData) {
        loadedAccounts.push({
          id: responseData[key].id,
          name: responseData[key].name,
          cpf: responseData[key].cpf,
          email: responseData[key].email,
          password: responseData[key].password,
          roles: responseData[key].roles
        })
      }
      setAccounts(loadedAccounts);
    } 
    catch(error: any){
      setHttpError(error.message);
    } 
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, [accounts]);

  return { accounts, setAccounts, isLoading, httpError }
}

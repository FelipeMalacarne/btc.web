import React, { useEffect, useState } from 'react'
import IngredientModel from '../models/IngredientModel';
import authHeader from '../services/AuthHeader';

export const useIngredients = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);

  const fetchIngredients = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const Url = envUrl + '/api/ingredients';
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
    const loadedIngredients: IngredientModel[] = [];
    for (const key in responseData) {
      loadedIngredients.push({
        id: responseData[key].id,
        name: responseData[key].name,
        unitOfMeasure: responseData[key].unitOfMeasure
      })
    }
    const ingredientRows = loadedIngredients.map(ingredient => {
      return {
        id: ingredient.id,
        name: ingredient.name,
        unitOfMeasure: ingredient.unitOfMeasure.name,
      }
    })
    setIngredients(loadedIngredients);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchIngredients().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, []);
  
  return {ingredients, setIngredients, isLoading, httpError }
} 

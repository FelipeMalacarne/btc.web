import React, { useEffect, useState } from 'react'
import IngredientModel from '../../../models/IngredientModel'

interface rowsModel {
  id: number,
  name: string,
  unitOfMeasure: string
}
export const useIngredientRows = (ingredients: IngredientModel[]) => {
  const [rows, setRows] = useState<rowsModel[]>([]);
  const ingredientRows = ingredients.map(ingredient => {
    return {
      id: ingredient.id,
      name: ingredient.name,
      unitOfMeasure: ingredient.unitOfMeasure.name,
    }
  })
  useEffect(() => {
    setRows(ingredientRows);
  }, [ingredients]);
  
  return {rows}
}

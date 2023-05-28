import React, { useEffect, useState } from 'react'
import UnitOfMeasureModel from '../models/UnitOfMeasureModel';
import authHeader from '../services/AuthHeader';

export const useUnits = () => {
  const [isUnitsLoading, setIsUnitsLoading] = useState<boolean>(true);
  const [unitsHttpError, setUnitsHttpError] = useState<string | null>(null);
  const [units, setUnits] = useState<UnitOfMeasureModel[]>([]);

  const fetchUnits = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const Url = envUrl + '/api/units';
    const token = authHeader().Authorization;

    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }}
    const response = await fetch(Url, requestOptions);
    const responseData = await response.json();
    const loadedUnits: UnitOfMeasureModel[] = [];
    for (const key in responseData) {
      loadedUnits.push({
        id: responseData[key].id,
        name: responseData[key].name,
        symbol: responseData[key].symbol
      })
    }
    setUnits(loadedUnits);
    setIsUnitsLoading(false);
  }

  useEffect(() => {
    fetchUnits().catch((error: any) => {
      setIsUnitsLoading(false);
      setUnitsHttpError(error.message);
    });
  }, [])

  return { units, setUnits, isUnitsLoading, unitsHttpError }
}

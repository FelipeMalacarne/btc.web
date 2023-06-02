import React, { useMemo, useState } from 'react'
import { useSales } from '../../hooks/useSales';
import { Box, useTheme } from '@mui/material';
import { Header } from '../utils/Header';
import { DatePicker } from '@mui/x-date-pickers';


export const DailyPage = () => {
  const [startDate, setStartDate] = useState(new Date('2023-05-2'));
  const [endDate, setEndDate] = useState(new Date('2023-06-3'));
  const { sales } = useSales();
  const theme = useTheme();


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY" subtitle="Gráfico de vendas diárias" />
      <Box height="75vh">

      </Box>
    </Box>
  )
}

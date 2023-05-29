import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export const Loading = () => {
  return (
    <Box 
        height="calc(100vh - 200px)" 
        width='calc(100vw - 400px)'
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        >
        <CircularProgress />
      </Box>
  )
}

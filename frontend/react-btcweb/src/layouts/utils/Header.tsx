import { Box, Typography } from '@mui/material'
import React from 'react'

export const Header: React.FC<{title: string, subtitle: string}> = (props) => {
  return (
    <Box mb={2}>
      <Typography variant='h2' color={'inherit'} fontWeight={'bold'}>
        {props.title}
      </Typography>

      <Typography variant='h4' color={'inherit'} fontWeight={'light'}>
        {props.subtitle}
      </Typography>

    </Box>
  )
}

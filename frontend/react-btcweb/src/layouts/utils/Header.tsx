import { Box, Typography } from '@mui/material'
import React from 'react'

export const Header: React.FC<{title: string, subtitle: string}> = (props) => {
  return (
    <Box mb={3}>
      <Typography variant='h3' color={'inherit'} fontWeight={'bold'}>
        {props.title}
      </Typography>

      <Typography variant='h6' color={'inherit'} fontWeight={'light'}>
        {props.subtitle}
      </Typography>

    </Box>
  )
}

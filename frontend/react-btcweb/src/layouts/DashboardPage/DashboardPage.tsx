
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import FlexBetween from '../utils/FlexBetween';
import { Header } from '../utils/Header';
import { DownloadOutlined } from '@mui/icons-material';

export const DashboardPage = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [httpError, setHttpError] = React.useState<string | null>(null);

  return (
    <Box m="1rem 3rem">
      <FlexBetween>
        <Header title={'Dashboard'} subtitle={'Bem vindo ao seu dashboard'} />

        <Box>
          {/* <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{mr: '10px'}} />
            Download Reports
          </Button> */}
        </Box>
      </FlexBetween>

      <Box
        mt='20px'
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows='160px'
        gap='20px'
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : 'span 12'}
        }}
      >
        {/* ROW 1 */}


      </Box>
    </Box>
  )
}

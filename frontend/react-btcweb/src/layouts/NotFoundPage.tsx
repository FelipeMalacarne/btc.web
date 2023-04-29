import {Box, Button, Container, Typography} from "@mui/material";
import React from "react";

export const NotFoundPage = () => {
    return (
        <Box sx={
            {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                gap: '2rem'
            }
        }>
            <Typography variant='h2'>
                404 - Not Found
            </Typography>
            <Button variant='contained' href='/secure'>
                Go Home
            </Button>


        </Box>
    );
}
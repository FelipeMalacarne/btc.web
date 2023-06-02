import { Box, Button, ButtonGroup, CircularProgress, Icon, IconButton, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from '../utils/Header'
import { DataGrid, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import IngredientModel from '../../models/IngredientModel';
import authHeader from '../../services/AuthHeader';
import { DeleteOutlineOutlined, Edit, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { DeleteIngredientDialog } from './components/DeleteIngredientDialog';
import { ViewIngredientDialog } from './components/ViewIngredientDialog';
import { EditIngredientDialog } from './components/EditIngredientDialog';
import { useIngredients } from '../../hooks/useIngredients';
import { useIngredientRows } from './hooks/useIngredientRows';
import { render } from 'react-dom';

interface rowsModel {
  id: number,
  name: string,
  unitOfMeasure: string
}
export const IngredientsPage = () => {
  const theme = useTheme();
  const { ingredients, setIngredients, isLoading, httpError } = useIngredients();
  const { rows } = useIngredientRows(ingredients);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [ingredientSelected, setIngredientSelected] = useState<IngredientModel | undefined>(undefined);
  const [idIngredientSelected, setIdIngredientSelected] = useState<number>(0);

  const handleDeleteClick = (params: GridCellParams) => {
    const ingredientId = params.id as number;
    setIdIngredientSelected(ingredientId);
    setShowDeleteDialog(true);
  };

  const handleEditClick = (params: GridCellParams) => {
    const ingredientId = params.id as number;
    const ingredient = ingredients.find(ingredient => ingredient.id === ingredientId);
    setIngredientSelected(ingredient);
    setShowEditDialog(true);
  }

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 80, flex: 1 },
    { field: 'name', headerName: 'Item', flex: 20 },
    { field: 'unitOfMeasure', headerName: 'Unidade', minWidth: 100, flex: 2 },
    {
      field: 'actions', headerName: 'Ações', minWidth: 150, flex: 3, 
      renderCell: (params: GridCellParams) => (
        <ButtonGroup>
          <IconButton onClick={() => handleEditClick(params)}>
            <EditOutlined sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params)}>
            <DeleteOutlineOutlined sx={{ color: theme.palette.error.main }} />
          </IconButton>
        </ButtonGroup>
      )
    }]

  if (isLoading) {
    return <CircularProgress />
  }
  if (httpError) {
    return <p>{httpError}</p>
  }
  return (
    <Box m="1rem 3rem">
      {showDeleteDialog && (
        <DeleteIngredientDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          ingredientId={idIngredientSelected}
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      )}      
      {showEditDialog && (
        <EditIngredientDialog
          open={showEditDialog}
          setOpen={setShowEditDialog}
          ingredient={ingredientSelected}
          ingredients={ingredients}
          setIngredients={setIngredients}
          />
      )}

      <Header title='Ingredientes' subtitle='Vizualização de ingredientes' />
      <Box mt='40px' height='75vh'
        sx={{
          width: '99%',
          '& .MuiDataGrid-root': {
            border: 'none',
            '& .MuiDataGrid-cell': {
              border: 'none',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: 'none',
            },
            '& .MuiDataGrid-row': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: 'none',
            },
            '&. MuiDataGrid-toolbar': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: 'none',
            },

          }

        }}
      >
        <DataGrid
          rows={rows || []}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{
            toolbar: GridToolbar
          }}
          loading={isLoading}
          autoHeight
          disableColumnMenu
          disableColumnSelector
        />
      </Box>
    </Box>
  )
}

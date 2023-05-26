import { Box, Button, ButtonGroup, CircularProgress, Icon, IconButton, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from '../utils/Header'
import { DataGrid, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import IngredientModel from '../../models/IngredientModel';
import authHeader from '../../services/AuthHeader';
import { DeleteOutlineOutlined, Edit, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { DeleteIngredientDialog } from './components/DeleteIngredientDialog';
import { ViewIngredientDialog } from './components/ViewIngredientDialog';

interface rowsModel {
  id: number,
  name: string,
  unitOfMeasure: string
}


export const IngredientsPage = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
  const [rows, setRows] = useState<rowsModel[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [ingredientSelected, setIngredientSelected] = useState<IngredientModel | undefined>(undefined);
  const [idIngredientSelected, setIdIngredientSelected] = useState<number>(0);

  useEffect(() => {
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

      setRows(ingredientRows);
      setIngredients(loadedIngredients);
      setIsLoading(false);
    }

    fetchIngredients().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })

  }, [showDeleteDialog, showEditDialog]);

  const handleDeleteClick = (params: GridCellParams) => {
    const ingredientId = params.id as number;
    setIdIngredientSelected(ingredientId);
    setShowDeleteDialog(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 80, flex: 1 },
    { field: 'name', headerName: 'Name', flex: 20 },
    { field: 'unitOfMeasure', headerName: 'Measure', minWidth: 100, flex: 2 },
    {
      field: 'actions', headerName: 'Actions', minWidth: 150, flex: 3, renderCell: (params: GridCellParams) => (
        <ButtonGroup>
          <IconButton>
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

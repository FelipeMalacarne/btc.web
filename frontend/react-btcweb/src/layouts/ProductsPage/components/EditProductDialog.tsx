import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography, makeStyles, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductModel from '../../../models/ProductModel'
import IngredientListModel from '../../../models/IngredientListModel'
import { DeleteOutlineOutlined } from '@mui/icons-material'
import { AddIngredientDialog } from './AddIngredientDialog'
import authHeader from '../../../services/AuthHeader'
import ProductRequest from '../../../models/requests/ProductRequest'
import CategoryModel from '../../../models/CategoryModel'
import Ecategories from '../../../models/ECategory'
import IngredientListRequest from '../../../models/requests/IngredientListRequest'
import CategorySetRequest from '../../../models/requests/CategorySetRequest'
import { string } from 'yup'



interface EditProductDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  product: ProductModel | undefined
}

export const EditProductDialog: React.FC<EditProductDialogProps> = (props) => {
  const theme = useTheme();
  const [productName, setProductName] = useState<string>(props.product?.name || '');
  const [productDescription, setProductDescription] = useState<string>(props.product?.description || '');
  const [productPrice, setProductPrice] = useState<number>(props.product?.price || 0);
  const [productCategoryName, setProductCategoryName] = useState<string>(props.product?.categorySet[0].name || '');
  const [ingredientList, setIngredientList] = useState<IngredientListModel[]>(props.product?.ingredientList || []);
  const [productActive, setProductActive] = useState<boolean>(true);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  // edit ingredient dialog States
  const [addIngredientOpen, setAddIngredientOpen] = useState<boolean>(false);
  const [newIngredient, setNewIngredient] = useState<IngredientListModel>(
    {} as IngredientListModel
  );

  const handleClose = () => props.setOpen(false);
  const handleSave = () => {
    /// api call
    const fetchPutProduct = async () => {
      const envUrl = process.env.REACT_APP_API_URL;
      const url = envUrl + '/api/products/' + props.product?.id;
      const token = authHeader().Authorization;

      const ingredientListRequest = ingredientList.map((ingredientList) => {
        return{
          ingredientId: ingredientList.ingredient.id,
          amount: ingredientList.amount
        } as IngredientListRequest
      })
      const categoriesSetRequest = [
        {
          categoryId: Ecategories[productCategoryName as keyof typeof Ecategories].valueOf() + 1
        } 
      ] as CategorySetRequest[]

      const requestBody = new ProductRequest(
        productName,
        productDescription,
        productPrice,
        productActive,
        categoriesSetRequest,
        ingredientListRequest
        );
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
      console.log(requestBody)
      console.log(requestOptions)

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
  
      
    }
    fetchPutProduct().catch((error: any) => {
      console.log(error.message);
    })

    handleClose();
  }

  const handleIngredientListChange = (event: any, index: any) => {
    const updatedIngredientList = [...ingredientList];
    updatedIngredientList[index].amount = event.target.value;
    setIngredientList(updatedIngredientList);
  }

  const handleDeleteIngredient = (index: number) => {
    const updatedIngredientList = [...ingredientList];
    updatedIngredientList.splice(index, 1);
    setIngredientList(updatedIngredientList);
  }

  const handleAddIngredientOpen = () => setAddIngredientOpen(true);
  const handleAddIngredientClose = () => setAddIngredientOpen(false);
  const handleAddIngredient = () => {
    if(newIngredient){
      setIngredientList(prevState => [...prevState, newIngredient]);
      setNewIngredient({} as IngredientListModel);
      handleAddIngredientClose();
    }

  };

  const validateForm = () => {
    // Check all fields
    const isNameValid = productName.length >= 3 && productName.length <= 80;
    const isDescriptionValid = productDescription.length <= 300;
    const isPriceValid = productPrice > 0 && productPrice <= 10000;
    const isIngredientListValid = ingredientList.every(ingredient => ingredient.amount > 0 && ingredient.amount <= 100000);

    return isNameValid && isDescriptionValid && isPriceValid && isIngredientListValid;
  }
  const handleSubmit = () => {
    if (validateForm()) {
      handleSave();
    }
  }




  return (
    <>
      {addIngredientOpen && (
        <AddIngredientDialog
          open={addIngredientOpen}
          setOpen={setAddIngredientOpen}
          handleAddIngredient={handleAddIngredient}
          setNewIngredient={setNewIngredient}
        /> 
      )

      }
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle fontSize={'24px'} fontWeight={'bold'}>
          Edit Product
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            color: theme.palette.text.primary,
            label: {
              color: theme.palette.secondary.main
            }
          }}>
            <FormControl fullWidth>
              <TextField
                label="Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type='text'
                required
                error={productName.length < 2 || productName.length >= 80}
                helperText={productName.length < 2 || productName.length >= 80 ? 
                  'Name must be between 3 and 80 characters' : ''
                }

              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                type='text'
                multiline
                error={productDescription.length >= 200}
                helperText={productDescription.length >= 200 ?
                  'Description must be less than 300 characters' : ''
                }
              />
            </FormControl>
            <Box display={'flex'} gap={2}>
              <FormControl fullWidth>
                <TextField
                  label="Price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(Number(e.target.value))}
                  type='number'
                  required
                  error={productPrice <= 0 || productPrice > 10000}
                  helperText={productPrice <= 0 || productPrice > 10000 ?
                    "Invalid price" : ""
                  }

                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id='category'>Category</InputLabel>
                <Select
                  labelId='category'
                  id='category'
                  label='Category'
                  value={productCategoryName}
                  onChange={(e) => setProductCategoryName(e.target.value)}
                >
                  <MenuItem value={"FOOD"}>
                    Food
                  </MenuItem>
                  <MenuItem value={"DRINK"}>
                    Drink
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl fullWidth>

              {ingredientList.map((ingredientListItem, index) => (
                <ListItem key={ingredientListItem.ingredient.id}>
                  <ListItemText
                    primary={ingredientListItem.ingredient.name}
                    secondary={`Amount: ${ingredientListItem.amount} ${ingredientListItem.ingredient.unitOfMeasure.symbol}`} />

                  <TextField
                    type='number'
                    label='Amount'
                    value={ingredientListItem.amount}
                    onChange={(event) => handleIngredientListChange(event, index)}
                    required
                    error={ingredientListItem.amount < 1 || ingredientListItem.amount > 100000}
                    helperText={ingredientListItem.amount < 1 || ingredientListItem.amount > 100000 ?
                      'Invalid Amount' : ''
                    }
                    sx={{
                      width: '100px'
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography>
                            {ingredientListItem.ingredient.unitOfMeasure.symbol}
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                  <IconButton onClick={() => handleDeleteIngredient(index)} sx={{ marginLeft: 1 }}>
                    <DeleteOutlineOutlined color='error' />
                  </IconButton>
                </ListItem>
              ))}
              <Button 
                onClick={handleAddIngredientOpen} 
                variant='outlined'
                sx={{ 
                  marginTop: 2,
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.text.primary 
                }}
              >
                Add Ingredient
              </Button>
            </FormControl>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant='contained'
            sx={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

import { Alert, Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, ListItem, ListItemText, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import { Header } from '../utils/Header'
import ProductModel from '../../models/ProductModel';
import ProductRequest from '../../models/requests/ProductRequest';
import CategorySetRequest from '../../models/requests/CategorySetRequest';
import IngredientListRequest from '../../models/requests/IngredientListRequest';
import IngredientModel from '../../models/IngredientModel';
import authHeader from '../../services/AuthHeader';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import IngredientListModel from '../../models/IngredientListModel';
import { AddIngredientDialog } from '../ProductsPage/components/AddIngredientDialog';
import Ecategories from '../../models/ECategory';

export const ProductFormsPage = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productActive, setProductActive] = useState<boolean>(true);
  const [productIngredientList, setProductIngredientList] = useState<IngredientListModel[]>([]);
  const [productCategoryName, setProductCategoryName] = useState<string>('');
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [ingredientOptionsFiltered, setIngredientOptionsFiltered] = useState<IngredientModel[]>([]);
  const [addIngredientOpen, setAddIngredientOpen] = useState<boolean>(false);
  const [newIngredient, setNewIngredient] = useState<IngredientListModel>(
    {} as IngredientListModel
  );
  useEffect(() => {
    const fetchIngredients = async () => {
      const envUrl = process.env.REACT_APP_API_URL;
      const url = envUrl + '/api/ingredients';
      const token = authHeader().Authorization;
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      const loadedIngredients: IngredientModel[] = [];
      for (const key in responseData) {
        loadedIngredients.push({
          id: responseData[key].id,
          name: responseData[key].name,
          unitOfMeasure: responseData[key].unitOfMeasure
        });
      }
      const filteredIngredients = loadedIngredients.filter(ingredient => {
        const ingredientAlreadyAdded = productIngredientList.find(productIngredient => productIngredient.ingredient.id === ingredient.id);
        return !ingredientAlreadyAdded
      })
      setIngredientOptionsFiltered(filteredIngredients);
      setIsLoading(false);
    }
    fetchIngredients().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, [])

  const validateForm = () => {
    const price = parseFloat(productPrice);
    const isNameValid = productName.length < 50 && productName.length > 0;
    const isDescriptionValid = productDescription.length < 200 && productDescription.length > 0;
    const isPriceValid = price > 0 && price < 100000;
    const isCategoryValid = productCategoryName.length > 0;
    const isProductIngredientListValid = productIngredientList.every(ingredient => ingredient.amount > 0 && ingredient.amount <= 100000);

    return isNameValid && isDescriptionValid && isPriceValid && isCategoryValid && isProductIngredientListValid;
  }

  const handleCreateProduct = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const url = envUrl + '/api/products';
    const token = authHeader().Authorization;

    const ingredientListRequest = productIngredientList.map((ingredientList) => {
      return {
        ingredientId: ingredientList.ingredient.id,
        amount: ingredientList.amount
      } as IngredientListRequest
    })
    const categoriesSetRequest = [{
      categoryId: Ecategories[productCategoryName as keyof typeof Ecategories].valueOf() + 1
    }] as CategorySetRequest[]

    const productToCreate = new ProductRequest(
      productName,
      productDescription,
      parseFloat(productPrice),
      productActive,
      categoriesSetRequest,
      ingredientListRequest
    )

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productToCreate)
    }
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    if (response.ok) {
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductActive(true);
      setProductIngredientList([]);
      setProductCategoryName('');
    } else {
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (validateForm()) {
      handleCreateProduct().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      })
    } else {
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
  }
  const handleIngredientListChange = (event: any, index: any) => {
    const updatedIngredientList = [...productIngredientList];
    updatedIngredientList[index].amount = event.target.value;
    setProductIngredientList(updatedIngredientList);
  }
  const handleDeleteIngredient = (index: number) => {
    const updatedIngredientList = [...productIngredientList];
    updatedIngredientList.splice(index, 1);
    setProductIngredientList(updatedIngredientList);
  }
  const handleAddIngredientOpen = () => setAddIngredientOpen(true);
  const handleAddIngredientClose = () => setAddIngredientOpen(false);
  const handleAddIngredient = () => {
    if (newIngredient) {
      setProductIngredientList(prevState => [...prevState, newIngredient]);
      setNewIngredient({} as IngredientListModel);
      handleAddIngredientClose();
    }
  };

  if (isLoading) return <CircularProgress />
  return (
    <Box m="1rem 3rem" height='calc(100vh - 200px)'>
      {addIngredientOpen && (
        <AddIngredientDialog
          open={addIngredientOpen}
          setOpen={setAddIngredientOpen}
          handleAddIngredient={handleAddIngredient}
          setNewIngredient={setNewIngredient}
          productIngredients={productIngredientList}
        />
      )}
      <Header title={'Produtos'} subtitle={'Cadastro de Produtos'} />
      <Box
        mt={3}
        height='100%'
        component='form'
        onSubmit={handleSubmit}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        <Box display={'flex'} flexDirection={'column'} flexGrow={1} gap={2}>
          <FormControl>
            <TextField
              label="Nome do produto"
              variant="outlined"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              required
              error={productName.length >= 50}
              helperText={productName.length >= 50 ?
                'Nome deve conter menos de 50 caracteres' : ''
              }
            />
          </FormControl>
          <TextField
            label="Descrição do produto"
            variant="outlined"
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
            required
            multiline
            error={productDescription.length >= 200}
            helperText={productDescription.length >= 200 ?
              'Descrição deve conter menos de 200 characteres' : ''
            }
          />
          <Box display={'flex'} gap={2} sx={{ width: '300px' }}>
            <FormControl>
              <TextField
                fullWidth
                label="Preço"
                variant="outlined"
                type='number'
                value={productPrice}
                onChange={(event) => setProductPrice(event.target.value)}
                required
                InputProps={{
                  endAdornment: 'R$'
                }}
                error={parseFloat(productPrice) > 100000 || parseFloat(productPrice) < 0}
                helperText={parseFloat(productPrice) > 100000 || parseFloat(productPrice) < 0 ?
                  'Preço deve ser maior que 0 e menor que 100.000' : ''
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
                <MenuItem value={"FOOD"}> Food </MenuItem>
                <MenuItem value={"DRINK"}> Drink </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography variant='h6' color={theme.palette.secondary.main}>Ingredientes</Typography>
          <FormControl fullWidth>
            {productIngredientList.map((ingredientListItem, index) => (
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
          {httpError &&
            <Alert severity="error">
              {httpError}
            </Alert>
          }
          {showSuccessAlert &&
            <Alert severity="success">
              Produto cadastrado com sucesso!
            </Alert>
          }
          {showErrorAlert &&
            <Alert severity="error">
              Preencha corretamente os espaços!
            </Alert>
          }
        </Box>
        <Box sx={{}}>
          <Button
            type='submit'
            variant='contained'
            sx={{ width: '200px', height: '40px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.contrastText }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

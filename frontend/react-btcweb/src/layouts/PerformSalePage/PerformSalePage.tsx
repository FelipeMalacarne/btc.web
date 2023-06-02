import { Autocomplete, Box, Button, Container, Divider, FormControl, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, Stack, TextField, Typography, useTheme } from '@mui/material'
import { Header } from '../utils/Header';
import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react';
import { useIngredients } from '../../hooks/useIngredients';
import FlexBetween from '../utils/FlexBetween';
import { DataGrid, GridToolbar, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useProducts } from '../../hooks/useProducts';
import ProductModel from '../../models/ProductModel';
import AuthService from '../../services/AuthService';
import ProductListModel from '../../models/SaleProductModel';
import ProductListRequest from '../../models/requests/ProductListRequest';
import { AddProductDialog } from './components/AddProductDialog';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { hover } from '@testing-library/user-event/dist/hover';
import SaleRequest from '../../models/requests/SaleRequest';
import SaleService from '../../services/SaleService';
import { SuccessDialog } from '../utils/SuccessDialog';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const PerformSalePage = () => {
  const theme = useTheme();
  const { products } = useProducts();

  const [selectedProducts, setSelectedProducts] = useState<ProductModel[]>([]);
  const [showAddProductDialog, setShowAddProductDialog] = useState<boolean>(false);
  const [saleProductList, setSaleProductList] = useState<ProductListModel[]>([]);
  const [showHelperText, setShowHelperText] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [showWarningDialog, setShowWarningDialog] = useState<boolean>(false);

  // Request Data
  const [ accountId ] = useState<number>(AuthService.getCurrentUser()?.id);


  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!isFormValid()) {
      setShowHelperText(true);
      return;
    }
    setShowHelperText(false);
    const requestProductList = saleProductList.map((item) => {
      return new ProductListRequest(item.product.id, item.amount);
    });
    const saleRequest = new SaleRequest(accountId!, requestProductList);

    try {
      const response = await SaleService.postNewSale(saleRequest)
      console.log(response)
      if (response.ok){
        setShowSuccessDialog(true);
        setSaleProductList([]);
      } else {
        setShowWarningDialog(true);
      } 

        
    } catch (error) {
      setShowWarningDialog(true);
    }
    
  }
  function handleProductListChange(event: any, index: number): void {
    const updatedProductList = [...saleProductList];
    updatedProductList[index].amount = event.target.value;
    setSaleProductList(updatedProductList);
  }
  const handleDeleteProduct = (index: number) => {
    const updatedIngredientList = [...saleProductList];
    updatedIngredientList.splice(index, 1);
    setSaleProductList(updatedIngredientList);
  }

  const isFormValid = (): boolean => {
    const isProductListValid = saleProductList.length > 0;
    const isProductAmountValid = saleProductList.every((item) => item.amount > 0 && item.amount <= 100);
    return isProductListValid && isProductAmountValid;
  }

  return (
    <Box m="1rem 3rem">
      {showAddProductDialog &&
        <AddProductDialog
          open={showAddProductDialog}
          setOpen={setShowAddProductDialog}
          products={products}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          setSaleProductList={setSaleProductList}
        />
      }
      {showSuccessDialog && 
        <SuccessDialog
          open={showSuccessDialog}
          setOpen={setShowSuccessDialog}
          message={'Venda realizada com sucesso!'}
        />
      }
      {showWarningDialog &&
        <SuccessDialog
          open={showWarningDialog}
          setOpen={setShowWarningDialog}
          message={'Não foi possível realizar a venda!'}
        />
      }
      <Header title={'Vendas'} subtitle={'Realizar Venda'} />
      <Grid container 
        height='100%'
        component='form'
        onSubmit={handleSubmit}
        justifyContent={'space-between'}
        mt={5}
      >
        <Grid item xs={12} sm={6}
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
            gap: 2,
            mb: 2
          }}
          display={'flex'}
          flexDirection={'column'}
          >
          <Typography variant='h5' color={'secondary'} sx={{ marginBottom: 1  }}>
            Produtos
          </Typography>
          <Divider/>
          <FormControl fullWidth sx={{ gap: 1, flexGrow: 1 }}>
            <List>
              {saleProductList.map((item: ProductListModel, index) => (
                <ListItem key={item.product.id}>
                  <ListItemText
                    primary={item.product.name}
                    secondary={`${currencyFormatter.format(Number(item.product.price))} por unidade`} />
                  <TextField
                    type='number'
                    label='Amount'
                    value={item.amount}
                    onChange={(event) => handleProductListChange(event, index)}
                    required
                    error={showHelperText}
                    helperText={showHelperText ?
                      'Invalid Amount' : ''
                    }
                    sx={{
                      width: '100px'
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography>
                            un
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                  <IconButton onClick={() => handleDeleteProduct(index)} sx={{ marginLeft: 1 }}>
                    <DeleteOutlineOutlined color='error' />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </FormControl>
          <Button 
            onClick={() => setShowAddProductDialog(true)}
            variant='outlined'
            fullWidth
            sx={{
              marginTop: 2,
              color: theme.palette.text.primary,
              borderColor: theme.palette.text.primary
            }}
          >
            Adicionar Produto
          </Button>
        </Grid>
        <Grid item xs={12} sm={5.5}
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
            gap: 2,
            mb: 2
          }}
          display={'flex'}
          flexDirection={'column'}
        >
          <Typography variant='h5' color={'secondary'} sx={{ marginBottom: 1 }}>
            Resumo
          </Typography>
          <Divider/>
          <Stack spacing={2} sx={{ marginTop: 2 }} flexGrow={1}>
              {saleProductList.map((item: ProductListModel, index) => (
                <FlexBetween key={item.product.id}>
                  <Typography variant='body1' color={''}>
                    {item.product.name} x {item.amount}
                  </Typography>
                  <Typography variant='body1' color={''}>
                    {currencyFormatter.format(item.amount * item.product.price)}
                  </Typography>
                </FlexBetween>
              ))}
            <Divider />
            <FlexBetween>
              <Typography variant='body1' color={''}>
                Total a Pagar
              </Typography>
              <Typography variant='body1' color={''}>
                {currencyFormatter.format(saleProductList.reduce((acc, item) => acc + (item.amount * item.product.price), 0))}
              </Typography>
            </FlexBetween>
          </Stack>
          <Button
            type='submit'
            variant='contained'
            sx={{
              marginTop: 2,
              color: theme.palette.secondary.contrastText,
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.secondary.contrastText,
              }}}
            disabled={saleProductList.length === 0}
          >
            Finalizar Venda
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

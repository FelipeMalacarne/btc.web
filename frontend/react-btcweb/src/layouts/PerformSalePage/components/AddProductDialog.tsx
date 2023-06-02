import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'
import ProductListModel from '../../../models/SaleProductModel'
import { useProducts } from '../../../hooks/useProducts'
import ProductModel from '../../../models/ProductModel'
import ProductListRequest from '../../../models/requests/ProductListRequest'

interface AddProductDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  products: ProductModel[]
  selectedProducts: ProductModel[]
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>
  setSaleProductList: React.Dispatch<React.SetStateAction<ProductListModel[]>>
}

export const AddProductDialog: React.FC<AddProductDialogProps> = (props) => {
  const theme = useTheme();

  const [productName, setProductName] = useState<string | null>('');
  const [productId, setProductId] = useState<number>();
  const [product, setProduct] = useState<ProductModel>();

  const handleChange = (event: any, newValue: string | null) => {
    setProductName(newValue);
    const productSelected = props.products.find((product) => product.name === newValue);
    setProduct(productSelected);
  }
  const handleAddProduct = () => {
    const requestItem = new ProductListModel( product!, 1);
    props.setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product!]);
    props.setSaleProductList((prevSaleProductList) => [...prevSaleProductList, requestItem]);
    props.setOpen(false);
  }
  const filteredProducts = () => {
    return props.products.filter((product) => {
      const productAlreadySelected = props.selectedProducts.find((selectedProduct) => selectedProduct.id === product.id);
      return !productAlreadySelected;
    })
}

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      fullWidth
    >
      <DialogTitle>
        Add Product
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth>
          <Autocomplete
            value={productName}
            onChange={handleChange}
            autoComplete
            options={ filteredProducts().map((product) => product.name) }
            renderInput={(params) => <TextField {...params} label="Item" />
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.setOpen(false)}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddProduct}
          autoFocus
          variant="contained"
          sx={{
            backgroundColor: theme.palette.success.main,
            color: theme.palette.primary.contrastText,
          }}
          disabled={!productName}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import authHeader from "../../../services/AuthHeader"
import IngredientModel from "../../../models/IngredientModel"
import IngredientListModel from "../../../models/IngredientListModel"

interface AddIngredientDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleAddIngredient: () => void
  setNewIngredient: React.Dispatch<React.SetStateAction<IngredientListModel>>

}

export const AddIngredientDialog: React.FC<AddIngredientDialogProps> = (props) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>('');
  const [newAmount, setNewAmount] = useState<number>(0);
  const [ingredientOptions, setIngredientOptions] = useState<IngredientModel[]>([]);
  const [ingredientNameSelected, setIngredientNameSelected] = useState<string>('');

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

      setIngredientOptions(loadedIngredients);
      setIsLoading(false);
    }
    fetchIngredients().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })

  }, [])

  const handleChange = (event: SelectChangeEvent<string>) => {
    setIngredientNameSelected(event.target.value);
    const ingredientSelected = ingredientOptions.find(ingredient => ingredient.name === event.target.value);
    if (ingredientSelected) {
      const newIngredient = new IngredientListModel(newAmount, ingredientSelected);
      props.setNewIngredient(newIngredient);
    }
  }


  if (httpError) {
    return <h1>{httpError}</h1>
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      fullWidth
    >
      <DialogTitle>
        Add Ingredient
      </DialogTitle>
      <DialogContent dividers>
        <Box display={'flex'}>
          <FormControl fullWidth>
            <InputLabel id="selectIngredientLabel"  >
              Ingredient
            </InputLabel>
            <Select
              value={ingredientNameSelected}
              onChange={handleChange}
              labelId="selectIngredientLabel"
              label="Ingredient"
              id="selectIngredient"
              fullWidth
            >
              {ingredientOptions.map((ingredient) => (
                <MenuItem key={ingredient.id} value={ingredient.name}>
                  {ingredient.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </Box>

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
          onClick={props.handleAddIngredient}
          autoFocus
          variant="contained"
          sx={{
            backgroundColor: theme.palette.success.main,
            color: theme.palette.primary.contrastText,
          }}
          disabled={!ingredientNameSelected}
        >
          Add
        </Button>

      </DialogActions>

    </Dialog>
  )
}

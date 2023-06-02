import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

interface WarningDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  message: string
}

export const WarningDialog: React.FC<WarningDialogProps> = (props) => {
  const theme = useTheme();
  return (
    <Dialog open={true} fullWidth>
      <DialogTitle display={'flex'} flexDirection={'row'} gap={1}>
        <WarningAmberOutlinedIcon color="error" />
          Erro!
      </DialogTitle>
      <DialogContent>
        {props.message}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => props.setOpen(false)}
          variant='contained'  
          sx={{
            backgroundColor: theme.palette.success.main,
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.palette.success.dark,
              color: '#fff',
            }
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

import { WarningAmberOutlined } from '@mui/icons-material';
import { Typography, Paper, useTheme } from '@mui/material';
import dayjs from 'dayjs';

interface NotificationProps {
  title: string,
  message: string,
  date: Date,
}
export const NotificationCard: React.FC<NotificationProps> = (props) => {
  const theme = useTheme();
  return (
    <Paper elevation={0} 
      sx={{
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
      }}
    >
      <Typography variant="subtitle1" display={'flex'} flexDirection={'row'} gap={1}
        sx={{
          fontWeight: 'bold',
          marginBottom: theme.spacing(1),
        }}
      >
        <WarningAmberOutlined color="error" />
        {props.title}
      </Typography>
      <Typography variant="body2"
        sx={{
          marginBottom: theme.spacing(1),
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'pre-line', 
        }}
      >
        {props.message}
      </Typography>
      <Typography variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: '0.8rem',
        }}
      >
        {dayjs(props.date).format('DD/MM/YYYY HH:mm:ss')}
      </Typography>
    </Paper>
  );
};

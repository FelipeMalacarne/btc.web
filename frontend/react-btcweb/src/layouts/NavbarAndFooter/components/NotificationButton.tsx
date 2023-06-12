import React, { useState } from 'react'
import NotificationModel from '../../../models/NotificationModel'
import { NotificationCard } from './NotificationCard';
import { Badge, Button, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { NotificationsOutlined } from '@mui/icons-material';

interface NotificationsProps {
  notifications: NotificationModel[]
}
export const NotificationButton = (props: NotificationsProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        sx={{
          color: theme.palette.text.primary,
        }}
        onClick={handleClick}
      >
        <Badge badgeContent={props.notifications.length} color="secondary">
          <NotificationsOutlined />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          width: 400,
          maxHeight: 600,
        }}

      >
        {props.notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleClose}>
            <NotificationCard
              title={notification.title}
              message={notification.message}
              date={notification.date}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

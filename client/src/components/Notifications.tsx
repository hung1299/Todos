import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import {
  fetchAllNotification,
  fetchChangeSeenNotification,
} from '../features/notificationSlice';

interface Notification {
  content: string;
  sender: string;
  seen: boolean;
  id: string;
  userId?: string;
}

export default function Notifications() {
  const userId = useSelector((state: RootState) => state.user.value.id);
  const notifications = useSelector(
    (state: RootState) => state.notifications.value
  );
  const seenNotifications = useSelector((state: RootState) =>
    state.notifications.value.filter((n) => n.seen === false)
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNotification(userId));
  }, [dispatch, userId]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = (n: Notification) => {
    dispatch(
      fetchChangeSeenNotification({
        userId,
        notification: { ...n, seen: true },
      })
    );
  };

  const handleMarkAsRead = () => {
    for (let n of seenNotifications) {
      dispatch(
        fetchChangeSeenNotification({
          userId,
          notification: { ...n, seen: true },
        })
      );
    }
  };

  return (
    <Box sx={{ mx: 2 }}>
      <IconButton onClick={handleClick}>
        <Badge color='error' badgeContent={seenNotifications?.length}>
          <NotificationsIcon color='primary' />
        </Badge>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 50,
          horizontal: -100,
        }}
      >
        <Box
          sx={{
            maxWidth: 360,
            maxHeight: 500,
            borderRadius: 5,
            position: 'relative',
          }}
        >
          {notifications.length > 0 ? (
            <List
              sx={{
                p: 0,
              }}
            >
              {notifications
                ?.map((n, index) => (
                  <ListItem
                    key={index}
                    divider
                    sx={
                      n.seen
                        ? { p: 0, backgroundColor: '#fff' }
                        : { p: 0, backgroundColor: '#d9eaf4' }
                    }
                  >
                    <ListItemButton
                      onClick={() => handleClickNotification(n)}
                      sx={{ px: 2, py: 2 }}
                    >
                      <ListItemText
                        primary={
                          <Link
                            to='/'
                            style={{
                              textDecoration: 'none',
                              color: '#4a5057',
                            }}
                          >
                            <Typography
                              sx={{ display: 'inline' }}
                              component='span'
                              variant='body1'
                              color='primary'
                            >
                              {n.sender + ' '}
                            </Typography>
                            {n.content}
                          </Link>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))
                .reverse()}
            </List>
          ) : (
            <Box sx={{ p: 1.5, px: 2 }}>
              <Typography>There are no notification!</Typography>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              position: 'sticky',
              justifyContent: 'flex-end',
              backgroundColor: '#f0f0f0',
              bottom: 0,
            }}
          >
            <Button
              onClick={() => handleMarkAsRead()}
              sx={{ textTransform: 'none', p: 0, px: 1 }}
            >
              Mark as read
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}

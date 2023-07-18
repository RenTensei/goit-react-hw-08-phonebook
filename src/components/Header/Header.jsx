import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import { AppRoutes } from 'components/App/AppRoutes';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from 'slices/auth/actions';
import { authSelectors } from 'slices/auth/selectors';

export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.selectLoginStatus);

  // MUI Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuNavigate = navigateTo => {
    navigate(navigateTo);
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <NavLink to={AppRoutes.ROOT}>
            <Button variant="outlined" color="secondary">
              Home
            </Button>
          </NavLink>

          {isLoggedIn && (
            <NavLink to={AppRoutes.CONTACTS}>
              <Button variant="outlined" color="secondary">
                Contacts
              </Button>
            </NavLink>
          )}
        </Box>

        <div>
          <IconButton size="large" onClick={handleMenu} color="secondary">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {!isLoggedIn && (
              <MenuItem onClick={() => handleMenuNavigate(AppRoutes.REGISTER)}>
                Register
              </MenuItem>
            )}
            {!isLoggedIn && (
              <MenuItem onClick={() => handleMenuNavigate(AppRoutes.LOGIN)}>
                Login
              </MenuItem>
            )}
            {isLoggedIn && (
              <MenuItem
                onClick={() => {
                  dispatch(logOut());
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

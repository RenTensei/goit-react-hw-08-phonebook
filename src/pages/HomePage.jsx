import { Button, Stack, Typography } from '@mui/material';
import { AppRoutes } from 'components/App/AppRoutes';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authSelectors } from 'slices/auth/selectors';

export const HomePage = () => {
  const isLoggedIn = useSelector(authSelectors.selectLoginStatus);

  return (
    <Stack alignItems="center" spacing={4}>
      <Typography variant="h3" maxWidth="md" sx={{ textAlign: 'center' }}>
        Simple React-Redux app to keep your contacts up to date!
      </Typography>
      <img
        src={`${process.env.PUBLIC_URL}/pepo-g-peepo.gif`}
        alt="Pepe"
        width="240"
      />

      {isLoggedIn ? (
        <>
          <Typography variant="h6">
            You are logged in! Feel free to use the app.
          </Typography>
          <NavLink to={AppRoutes.CONTACTS}>
            <Button variant="outlined" color="primary">
              Contacts
            </Button>
          </NavLink>
        </>
      ) : (
        <>
          <Typography variant="h6">
            To use this app, you should login or register, if you haven't done
            it yet!
          </Typography>
          <NavLink to={AppRoutes.LOGIN}>
            <Button variant="outlined" color="primary">
              Login
            </Button>
          </NavLink>
          <NavLink to={AppRoutes.REGISTER}>
            <Button variant="outlined" color="primary">
              Register
            </Button>
          </NavLink>
        </>
      )}
    </Stack>
  );
};

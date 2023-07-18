import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { AppRoutes } from './AppRoutes';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { Login } from 'pages/Login';
import { HomePage } from 'pages/HomePage';
import { Register } from 'pages/Register';
import { Contacts } from 'pages/Contacts';
import { NotFound } from 'pages/NotFound';
import { Header } from 'components/Header/Header';
import { refreshUser } from 'slices/auth/actions';
import { authSelectors } from 'slices/auth/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(authSelectors.selectRefreshStatus);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <CircularProgress />
  ) : (
    <>
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path={AppRoutes.ROOT} element={<HomePage />} />
          <Route
            path={AppRoutes.REGISTER}
            element={
              <PublicRoute component={Register} redirect={AppRoutes.CONTACTS} />
            }
          />
          <Route
            path={AppRoutes.LOGIN}
            element={
              <PublicRoute component={Login} redirect={AppRoutes.CONTACTS} />
            }
          />
          <Route
            path={AppRoutes.CONTACTS}
            element={
              <PrivateRoute
                component={Contacts}
                redirect={AppRoutes.REGISTER}
              />
            }
          />
          <Route path={AppRoutes.ANY} element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

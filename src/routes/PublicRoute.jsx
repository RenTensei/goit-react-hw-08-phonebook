import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelectors } from 'slices/auth/selectors';

export const PublicRoute = ({ component: Component, redirect }) => {
  const isLoggedIn = useSelector(authSelectors.selectLoginStatus);

  return isLoggedIn ? <Navigate to={redirect} /> : <Component />;
};

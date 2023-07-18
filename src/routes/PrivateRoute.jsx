import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelectors } from 'slices/auth/selectors';

export const PrivateRoute = ({ component: Component, redirect }) => {
  const isLoggedIn = useSelector(authSelectors.selectLoginStatus);

  return isLoggedIn ? <Component /> : <Navigate to={redirect} />;
};

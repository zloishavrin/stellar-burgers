import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type UnprotectedRouteProps = {
  children: ReactElement;
};

export const UnprotectedRoute: FC<UnprotectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  return children;
};

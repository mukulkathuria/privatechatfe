import React, { FC, memo } from 'react';
import { Navigate } from 'react-router-dom';
import cookie from 'js-cookie';
import { LOGIN_PATH } from 'src/Constants/routes.constants';
import {
  ACCESS_TOKEN_LOC,
  REFRESH_TOKEN_LOC
} from 'src/Constants/common.constants';

interface authProps {
  children: JSX.Element;
}

const areEqual = () => {
  return true;
};

const RequireAuth: FC<authProps> = ({ children }) => {
  const token = cookie.get(ACCESS_TOKEN_LOC);
  const refreshToken = cookie.get(REFRESH_TOKEN_LOC);

  if (!token || !refreshToken) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  return children;
};

export default memo(RequireAuth, areEqual);

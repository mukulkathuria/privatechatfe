import { lazy, createElement } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import {
  DASHBOARD_ROUTE,
  FOURNOTFOUR_ROUTE,
  LOGIN_PATH,
  LOGIN_ROUTE
} from 'src/Constants/routes.constants';

const HomePage = SuspenseLoader(lazy(() => import('src/pages/Home/HomePage')));
const FourNotFour = SuspenseLoader(lazy(() => import('src/pages/Error/404')));
const RequireAuth = SuspenseLoader(
  lazy(() => import('src/Components/common/Containers/RequireAuth'))
);
const LoginedUser = SuspenseLoader(
  lazy(() => import('src/Components/common/Containers/LoginedUser'))
);
const Dashboard = SuspenseLoader(
  lazy(() => import('src/pages/Chat/ChatBoxPage'))
);

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: createElement(Navigate, { to: LOGIN_PATH, replace: true })
    },
    {
      path: LOGIN_ROUTE,
      element: createElement(LoginedUser, {}, createElement(HomePage))
    },
    {
      path: FOURNOTFOUR_ROUTE,
      element: createElement(FourNotFour)
    },
    {
      path: DASHBOARD_ROUTE,
      element: createElement(RequireAuth, {}, createElement(Dashboard))
    },
    {
      path: '*',
      element: createElement(Navigate, { to: '/404', replace: true })
    }
  ]);
}

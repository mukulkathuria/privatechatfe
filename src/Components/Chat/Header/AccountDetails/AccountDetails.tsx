import React, { lazy, MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { AccDetails, Logout } from './style/accountdetails.style';

const BackDropAcc = SuspenseLoader(
  lazy(() => import('./BackdropAcc/Backdropaccount'))
);

const AccountDetails = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    const { REFRESH_TOKEN_LOC } = await import(
      'src/Constants/common.constants'
    );
    const {
      default: { get }
    } = await import('js-cookie');
    const refreshtoken = get(REFRESH_TOKEN_LOC);
    if (refreshtoken) {
      try {
        const { removeUserData } = await import('src/utils/removeUserData');
        const { LOGIN_PATH } = await import('src/Constants/routes.constants');
        const { getLogout } = await import('src/services/login/login.services');
        await getLogout({ refresh_token: refreshtoken });
        await removeUserData();
        navigate(LOGIN_PATH, { replace: true });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }, []);

  const handleProfile = useCallback(async () => {
    const { changeChatRoute } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    const { appDispatch } = await import('src/Redux/store/store');
    const { ChatRoutes } = await import('src/Redux/dtos/chat.reducer.dto');
    appDispatch(changeChatRoute(ChatRoutes.profile));
  }, []);

  const hideAccountDetails = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const accountdetails = document.getElementById('accountsdetails');
    if (accountdetails) {
      accountdetails.style.display = 'none';
    }
  }, []);

  const backdropProps = {
    show: true,
    clicked: hideAccountDetails
  };

  return (
    <div id="accountsdetails" style={{ display: 'none' }}>
      <BackDropAcc {...backdropProps} />
      <AccDetails>
        <Logout onClick={handleProfile}>Profile</Logout>
        <Logout onClick={handleLogout}>Log out</Logout>
      </AccDetails>
    </div>
  );
};
export default AccountDetails;

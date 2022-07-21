import React, { MemoExoticComponent, memo, lazy } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { ChatHeaderDiv, UserDetailsDiv } from './style/chathomeheader';

const MenuImage = require('src/assets/menuvertical.png').default;

const AccountDetails = SuspenseLoader(
  lazy(() => import('./AccountDetails/AccountDetails'))
);

const ChatBoxHomeHeader: MemoExoticComponent<() => JSX.Element> = memo(() => {
  const showAccountDetails = () => {
    const accountdetails = document.getElementById('accountsdetails');
    if (accountdetails) {
      accountdetails.style.display = '';
    }
  };
  return (
    <ChatHeaderDiv>
      <div>Chats</div>
      <UserDetailsDiv onClick={showAccountDetails}>
        <img src={MenuImage} alt="menu" />
        <AccountDetails />
      </UserDetailsDiv>
    </ChatHeaderDiv>
  );
});

export default ChatBoxHomeHeader;

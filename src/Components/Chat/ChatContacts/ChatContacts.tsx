// eslint-disable-next-line object-curly-newline
import React, { lazy, memo, MemoExoticComponent, useCallback } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { ChatRoutes } from 'src/Redux/dtos/chat.reducer.dto';
import { useAppDispatch, useAppSelector } from 'src/Redux/store/store';
import { FloatButton } from './style/chatcontacts.style';

const Header = SuspenseLoader(lazy(() => import('../Header/ChatHomeHeader')));
const ChatModal = SuspenseLoader(
  lazy(() => import('../ContactModal/ContactModal'))
);
const Contacts = SuspenseLoader(lazy(() => import('./Chats/Contacts')));
const UserProfile = SuspenseLoader(lazy(() => import('./profile/UserProfile')));

const ChatContacts: MemoExoticComponent<() => JSX.Element> = memo(() => {
  const dispatch = useAppDispatch();
  const showDialog = useAppSelector((state) => state.chatReducer.chatDialog);
  const chatroute = useAppSelector((state) => state.chatReducer.chatRoute);

  const handleAdd = useCallback(async () => {
    const { toogleModal } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    dispatch(toogleModal(true));
  }, []);

  return (
    <>
      {(() => {
        switch (chatroute) {
          case ChatRoutes.profile:
            return <UserProfile />;

          default:
            return (
              <div>
                <Header />
                <Contacts />
                <FloatButton onClick={handleAdd}>+</FloatButton>
                {showDialog ? <ChatModal /> : null}
              </div>
            );
        }
      })()}
    </>
  );
});

export default ChatContacts;

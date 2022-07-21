// eslint-disable-next-line object-curly-newline
import React, { lazy, memo, MemoExoticComponent, useCallback } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { useAppDispatch, useAppSelector } from 'src/Redux/store/store';
import { FloatButton } from './style/chatcontacts.style';

const Header = SuspenseLoader(lazy(() => import('../Header/ChatHomeHeader')));
const ChatModal = SuspenseLoader(
  lazy(() => import('../ContactModal/ContactModal'))
);
const Contacts = SuspenseLoader(lazy(() => import('./Chats/Contacts')));

const ChatContacts: MemoExoticComponent<() => JSX.Element> = memo(() => {
  const dispatch = useAppDispatch();
  const showDialog = useAppSelector((state) => state.chatReducer.chatDialog);

  const handleAdd = useCallback(async () => {
    const { toogleModal } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    dispatch(toogleModal(true));
  }, []);

  return (
    <div>
      <Header />
      <Contacts />
      <FloatButton onClick={handleAdd}>+</FloatButton>
      {showDialog ? <ChatModal /> : null}
    </div>
  );
});

export default ChatContacts;

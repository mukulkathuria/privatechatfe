/* eslint-disable operator-linebreak */
import React, { lazy, memo, useCallback } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { useAppDispatch, useAppSelector } from 'src/Redux/store/store';
import { contactsDto } from './Contacts/dto/contacts.dto';
import { ModalHeader, NoMoreContacts } from './style/contactmodal.style';

const Modal = SuspenseLoader(lazy(() => import('src/Components/Modal/Modal')));
const ChatContacts = SuspenseLoader(
  lazy(() => import('src/Components/Chat/ContactModal/Contacts/ChatContacts'))
);

const ContactModal = memo(() => {
  const dispatch = useAppDispatch();
  const { Contacts } = useAppSelector(
    (state) => state.chatReducer.userData.data
  );

  const handleClose = useCallback(async () => {
    const { toogleModal } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    dispatch(toogleModal(false));
  }, []);

  const modalProps = {
    show: true,
    modalClose: handleClose
  };

  return (
    <Modal {...modalProps}>
      <ModalHeader>Contacts</ModalHeader>
      {Contacts && Contacts.length ? (
        Contacts?.map((l: contactsDto) => {
          const contactsProps = {
            contact: l
          };
          return <ChatContacts key={l.id} {...contactsProps} />;
        })
      ) : (
        <NoMoreContacts>No More Contacts Available</NoMoreContacts>
      )}
    </Modal>
  );
});

export default ContactModal;

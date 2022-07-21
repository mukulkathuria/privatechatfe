/* eslint-disable operator-linebreak */
import React, { memo, SyntheticEvent } from 'react';
import { contactsDto } from './dto/contacts.dto';
import {
  ContactDiv,
  ContactImage,
  ContactRightDiv,
  ContactsLeftdiv
} from './style/chatcontact.style';

type chatContactProp = {
  contact: contactsDto;
};

const NoUserImage = require('src/assets/nouser.jpg');

const ChatContacts = memo<chatContactProp>((props: chatContactProp) => {
  const { contact } = props;

  const imageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { target } = e;
    (target as HTMLImageElement).src =
      'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  };

  const handleClick = async () => {
    const { addUserinChatBox } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    const { toogleModal } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    const { appDispatch } = await import('src/Redux/store/store');
    appDispatch(addUserinChatBox(contact.username));
    appDispatch(toogleModal(false));
  };

  return (
    <ContactDiv onClick={handleClick}>
      <ContactsLeftdiv>
        <ContactImage
          src={contact.profile_pic || NoUserImage.default}
          alt=""
          onError={imageError}
        />
      </ContactsLeftdiv>
      <ContactRightDiv>{contact.name}</ContactRightDiv>
    </ContactDiv>
  );
});

export default ChatContacts;

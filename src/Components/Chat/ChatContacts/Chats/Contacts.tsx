/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
import React, { memo } from 'react';
import Loader from 'src/Components/Loader';
import { useAppDispatch, useAppSelector } from 'src/Redux/store/store';
import { ChatContactsDto } from './dto/chat.contacts.dto';
import {
  ContactsDiv,
  ContactsLeftDiv,
  ContactsRightDiv
} from './style/contacts.style';

const NoUserImage = require('src/assets/nouser.jpg').default;

const Contacts = memo(() => {
  const { isFecthing, data } = useAppSelector(
    (state) => state.chatReducer.userData
  );

  const selected = useAppSelector((state) => state.chatReducer.selectedChat);
  const dispatch = useAppDispatch();

  const handleSelect = async (index: number) => {
    if (selected?.selectedIndex !== index || !selected) {
      const { selectChatContact } = await import(
        'src/Redux/actions/chat.reducer.actions'
      );
      const selectedContact = {
        ...data.Chats[index],
        selectedIndex: index
      };
      dispatch(selectChatContact(selectedContact));
    }
  };

  if (isFecthing || !data) {
    return <Loader />;
  }

  return data?.Chats?.length
    ? data.Chats.map((l: ChatContactsDto, i: number) => (
        <ContactsDiv
          key={l._id}
          selected={selected?.selectedIndex === i}
          onClick={() => handleSelect(i)}
        >
          <ContactsLeftDiv>
            <img src={l.user.profile_pic || NoUserImage} alt="profile" />
          </ContactsLeftDiv>
          <ContactsRightDiv>{l.user.name}</ContactsRightDiv>
        </ContactsDiv>
      ))
    : null;
});

export default Contacts;

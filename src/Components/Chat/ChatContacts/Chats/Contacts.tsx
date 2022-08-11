/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
import React, { memo } from 'react';
import Loader from 'src/Components/Loader';
import { useAppDispatch, useAppSelector } from 'src/Redux/store/store';
import { getProfile } from 'src/utils/getPicsUrl';
import { ChatContactsDto } from './dto/chat.contacts.dto';
import {
  ContactsDiv,
  ContactsLeftDiv,
  ContactsRightDiv,
  LastMessageDiv
} from './style/contacts.style';

const NoUserImage = require('src/assets/nouser.jpg').default;

const Contacts = memo(() => {
  const { isFecthing, data } = useAppSelector(
    (state) => state.chatReducer.userData
  );

  const selected = useAppSelector((state) => state.chatReducer.selectedChat);
  const currentUser = useAppSelector(
    (state) => state.chatReducer.userData.data?.username
  );
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
            <img
              src={getProfile(l.user.profile) || NoUserImage}
              alt="profile"
            />
          </ContactsLeftDiv>
          <ContactsRightDiv>
            <div>{l.user.name}</div>
            <LastMessageDiv>
              <div>
                <strong>
                  {l?.chatInfo?.lastMessage?.sender === currentUser
                    ? 'You: '
                    : ''}
                </strong>
                {l?.unseenMessages ? (
                  <strong>{l?.chatInfo?.lastMessage?.message}</strong>
                ) : (
                  l?.chatInfo?.lastMessage?.message
                )}
              </div>
              <div>{l?.unseenMessages || ''}</div>
            </LastMessageDiv>
          </ContactsRightDiv>
        </ContactsDiv>
      ))
    : null;
});

export default Contacts;

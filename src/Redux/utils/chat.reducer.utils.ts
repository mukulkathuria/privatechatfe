import { contactsDto } from 'src/Components/Chat/ContactModal/Contacts/dto/contacts.dto';

export const addtoChatBox = (userdata: any, payload: any) => {
  const user = {
    ...userdata,
    chats: [payload],
    contacts: userdata.contacts.filter(
      (l: contactsDto) => l.username !== payload.username
    )
  };
  return user;
};

type UserDto = {
  username: string;
  name: string;
  profile: string;
};

export type lastMessageDto = {
  sender: string;
  message: string;
};

type chatInfoDto = {
  lastMessage: lastMessageDto;
};

export type ChatContactsDto = {
  chatroomid: string;
  _id: string;
  user: UserDto;
  unseenMessages: number;
  chatInfo: chatInfoDto;
};

type UserDto = {
  username: string;
  name: string;
  profile: string;
};

export type ChatContactsDto = {
  chatroomid: string;
  _id: string;
  user: UserDto;
};

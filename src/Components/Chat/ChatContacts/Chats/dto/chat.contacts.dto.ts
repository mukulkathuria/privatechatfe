type UserDto = {
  username: string;
  name: string;
  profile_pic: string;
};

export type ChatContactsDto = {
  chatroomid: string;
  _id: string;
  user: UserDto;
};

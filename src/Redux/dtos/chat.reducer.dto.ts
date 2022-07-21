import { initialdataDto } from './reducer.utils.dto';

interface UserDetails {
  username: string;
  profile_pic: string;
  name: string;
}

type contactsDto = {
  id: string;
  user: UserDetails;
  selectedIndex: number;
}

export type chatReducerDto = {
  userData: initialdataDto;
  chatDialog: boolean;
  selectedChat: contactsDto | null;
  isFriendOnline: boolean;
  currentStep: number;
};

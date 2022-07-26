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

// eslint-disable-next-line no-shadow
export enum ChatRoutes {
  profile = 'profile'
}

export type chatReducerDto = {
  userData: initialdataDto;
  chatDialog: boolean;
  selectedChat: contactsDto | null;
  isFriendOnline: boolean;
  currentStep: number;
  chatRoute: ChatRoutes | null
};

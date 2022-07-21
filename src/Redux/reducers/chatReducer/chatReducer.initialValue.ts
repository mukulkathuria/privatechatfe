import { chatReducerDto } from 'src/Redux/dtos/chat.reducer.dto';
import { getInitialData } from 'src/Redux/utils/default.data';

export const chatInitialValue: chatReducerDto = {
  userData: getInitialData(),
  chatDialog: false,
  selectedChat: null,
  isFriendOnline: false,
  currentStep: 0
};

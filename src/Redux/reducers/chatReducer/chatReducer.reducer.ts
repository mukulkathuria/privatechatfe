import { actionDto } from 'src/Redux/dtos/common.filter.dto';
import {
  ADD_CHAT_IN_CHATBOX,
  CHANGE_CHAT_DIALOG,
  GET_CHAT_DATA,
  SELECT_CHAT,
  TOGGLE_FRIEND_ONLINE
} from 'src/Redux/types/chat.reducer.type';
import { getReducerData } from 'src/Redux/utils/reducer.common.utils';
import { chatInitialValue } from './chatReducer.initialValue';

const chatReducer = (state = chatInitialValue, action: actionDto) => {
  const { type, payload, subType } = action;
  switch (type) {
    case GET_CHAT_DATA: {
      if (subType) {
        return {
          ...state,
          userData: getReducerData(subType, state.userData, payload)
        };
      }
      return state;
    }

    case CHANGE_CHAT_DIALOG:
      return {
        ...state,
        chatDialog: Boolean(payload)
      };

    case ADD_CHAT_IN_CHATBOX:
      return {
        ...state,
        userData: {
          ...state.userData,
          data: payload
        }
      };

    case SELECT_CHAT:
      return {
        ...state,
        selectedChat: payload,
        currentStep: payload ? 1 : 0
      };

    case TOGGLE_FRIEND_ONLINE:
      return {
        ...state,
        isFriendOnline: Boolean(payload)
      };
    default:
      return state;
  }
};

export default chatReducer;

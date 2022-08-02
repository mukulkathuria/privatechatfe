import { ThunkDispatch } from '@reduxjs/toolkit';
import { ChatRoutes } from '../dtos/chat.reducer.dto';
import { storeType } from '../store/store';
import {
  ADD_CHAT_IN_CHATBOX,
  CHANGE_CHAT_DIALOG,
  CHANGE_CHAT_ROUTE,
  GET_CHAT_DATA,
  SELECT_CHAT,
  TOGGLE_FRIEND_ONLINE
} from '../types/chat.reducer.type';
import {
  DATA_ERROR_OCCURED,
  DATA_ISFETCHING,
  DATA_SUCCEED
} from '../types/reducer.default';

const userdata = (type: string, subType: string, payload?: any) => ({
  type,
  subType,
  payload
});

export const fetchUserData = () => {
  const type = GET_CHAT_DATA;
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(userdata(type, DATA_ISFETCHING));
    try {
      const { getUserDetails } = await import(
        'src/services/User/user.services'
      );
      const user = await getUserDetails();
      dispatch(userdata(type, DATA_SUCCEED, user));
    } catch (error) {
      dispatch(userdata(type, DATA_ERROR_OCCURED, 'Something Went Wrong'));
    }
  };
};

export const toogleModal = (payload: boolean) => ({
  type: CHANGE_CHAT_DIALOG,
  payload
});

export const addUserinChatBox = (username: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const { addUserInChat } = await import('src/services/User/user.services');
      const user = await addUserInChat(username);
      dispatch({ type: ADD_CHAT_IN_CHATBOX, payload: user });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const selectChatContact = (payload: any) => ({
  type: SELECT_CHAT,
  payload
});

export const toggleFriendOnline = (payload: boolean) => {
  return (
    dispatch: ThunkDispatch<any, any, any>,
    getState: () => storeType
  ) => {
    const { isFriendOnline } = getState().chatReducer;
    if (isFriendOnline !== payload) {
      dispatch({ type: TOGGLE_FRIEND_ONLINE, payload });
    }
  };
};

export const changeChatRoute = (route: ChatRoutes | null) => ({
  type: CHANGE_CHAT_ROUTE,
  payload: route
});

import { authReducerDto } from './auth.reducer.dto';
import { chatReducerDto } from './chat.reducer.dto';
import { notificationReducerDto } from './notifications.dto';

export type rootStateDto = {
  authReducer: authReducerDto;
  chatReducer: chatReducerDto;
  notificationReducer: notificationReducerDto;
};

import { authReducerDto } from './auth.reducer.dto';
import { chatReducerDto } from './chat.reducer.dto';

export type rootStateDto = {
  authReducer: authReducerDto;
  chatReducer: chatReducerDto;
};

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer/auth.reducer';
import chatReducer from '../reducers/chatReducer/chatReducer.reducer';
import notificationReducer from '../reducers/notificationReducer/notificationReducer.reducer';

export const rootReducer = combineReducers({
  authReducer,
  chatReducer,
  notificationReducer
});

export type rootReducerType = ReturnType<typeof rootReducer>;

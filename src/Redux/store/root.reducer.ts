import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer/auth.reducer';
import chatReducer from '../reducers/chatReducer/chatReducer.reducer';

export const rootReducer = combineReducers({
  authReducer,
  chatReducer
});

export type rootReducerType = ReturnType<typeof rootReducer>;

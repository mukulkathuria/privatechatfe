import { GET_USER_DATA, LOGOUT_USER } from '../types/auth.reducer.type';

export const loadUserData = (payload: unknown) => ({
  type: GET_USER_DATA,
  payload
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

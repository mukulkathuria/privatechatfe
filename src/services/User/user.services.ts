import { AxiosResponse } from 'axios';
import { updateUserQuery } from '../dto/user.dto';

export const getUserDetails = async (): Promise<AxiosResponse> => {
  const {
    default: { post }
  } = await import('../interface/interceptor');
  const { BASEURL } = await import('src/Data/baseUrl');
  const url = BASEURL + 'api/user';
  const {
    data: { user }
  } = await post(url);
  return user;
};

export const addUserInChat = async (
  username: string
): Promise<AxiosResponse> => {
  const values = {
    username
  };
  const {
    default: { post }
  } = await import('../interface/interceptor');
  const { BASEURL } = await import('src/Data/baseUrl');
  const url = BASEURL + 'api/user/chat';
  const {
    data: { user }
  } = await post(url, values);
  return user;
};

export const updateUser = async (
  query: updateUserQuery,
  file?: File
): Promise<AxiosResponse> => {
  const {
    default: { post }
  } = await import('../interface/interceptor');
  const { BASEURL } = await import('src/Data/baseUrl');
  const url = BASEURL + 'api/user/updateuser';
  let value = null;
  if (file) {
    value = new FormData();
    value.append('profile', file);
  }
  const {
    data: { user }
  } = await post(url, value, { params: query });
  return user;
};

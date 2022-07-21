import { AxiosResponse } from 'axios';

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

import ioclient from 'socket.io-client';
import { BASEURL } from 'src/Data/baseUrl';

export const socket = ioclient(BASEURL);

export const socketInit = async () => {
  const { default: io } = await import('socket.io-client');
  const { ACCESS_TOKEN_LOC } = await import('src/Constants/common.constants');
  const {
    default: { get }
  } = await import('js-cookie');
  const token = get(ACCESS_TOKEN_LOC);

  const socketio = io(BASEURL, {
    extraHeaders: {
      Authorization: 'Bearer ' + token
    }
  });

  return socketio;
};

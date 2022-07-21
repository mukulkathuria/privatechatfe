/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
import axios from 'axios';
import cookie from 'js-cookie';
import {
  ACCESS_TOKEN_LOC,
  REFRESH_TOKEN_LOC
} from 'src/Constants/common.constants';
import { decodeAccessToken } from 'src/utils/common.utils';
import { removeUserData } from 'src/utils/removeUserData';
import { BASEURL } from '../../Data/baseUrl';
import ignoretokenpaths from '../../Data/ignoretokenpaths';
import { ProcessQueDto } from '../dto/interface.ques.dto';

let isRefreshing = false;
let failedQueue: ProcessQueDto[] | any[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.request.use(async (config) => {
  const token = cookie.get(ACCESS_TOKEN_LOC);
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axios.interceptors.response.use(undefined, async (err) => {
  const onrequest = err.config;
  const token = cookie.get(ACCESS_TOKEN_LOC);
  if (!err.response?.config?.url?.includes(ignoretokenpaths) && !token) {
    return Promise.reject(err);
  }
  if (
    (err?.response?.config?.url === BASEURL + 'auth/refreshtoken' &&
      err?.response?.status === 403) ||
    err?.response?.status === 403 ||
    !token
  ) {
    await removeUserData();
    window.location = '/login' as unknown as Location;
  }
  const refreshToken = cookie.get(REFRESH_TOKEN_LOC);
  let exp: number | null = null;
  if (token) {
    const { decodedToken } = decodeAccessToken(token);
    if (decodedToken) {
      exp = decodedToken.exp;
    }
  }
  if (
    token &&
    refreshToken &&
    exp &&
    exp < Date.now() / 1000 &&
    // eslint-disable-next-line no-underscore-dangle
    !onrequest._retry
  ) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((tokens) => {
          if (onrequest.headers) {
            onrequest.headers.Authorization = 'Bearer ' + tokens;
          }
          return axios(onrequest);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
    // eslint-disable-next-line no-underscore-dangle
    onrequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      const setRefUrl = BASEURL + 'auth/refreshtoken';
      axios
        .post(setRefUrl, {
          token: refreshToken
        })
        .then(({ data: { access_token, refresh_token } }) => {
          axios.defaults.headers.common.Authorization =
            'Bearer ' + access_token;
          cookie.set(ACCESS_TOKEN_LOC, access_token);
          cookie.set(REFRESH_TOKEN_LOC, refresh_token);
          processQueue(null, access_token);
          resolve(axios(onrequest));
        })
        .catch(async (error) => {
          await removeUserData();
          window.location = '/login' as unknown as Location;
          processQueue(error, null);
          reject(error);
        })
        .then(() => {
          isRefreshing = false;
        });
    });
  }
  return Promise.reject(err);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  del: axios.delete
};

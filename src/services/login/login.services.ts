import { AxiosResponse } from 'axios';
import { loginDto, logoutParamsDto } from '../dto/login.dto';

export const getLogin = async (params: loginDto): Promise<AxiosResponse> => {
  const { BASEURL } = await import('src/Data/baseUrl');
  const { ACCESS_TOKEN_LOC, REFRESH_TOKEN_LOC } = await import(
    'src/Constants/common.constants'
  );
  const LoginUrl = BASEURL + 'auth/login';
  const {
    default: { post }
  } = await import('../interface/interceptor');
  const {
    data: { access_token, refresh_token }
  } = await post(LoginUrl, params);

  if (access_token && refresh_token) {
    const {
      default: { set }
    } = await import('js-cookie');
    set(ACCESS_TOKEN_LOC, access_token);
    set(REFRESH_TOKEN_LOC, refresh_token);
  }
  return access_token;
};

export const getLogout = async (
  params: logoutParamsDto
): Promise<AxiosResponse> => {
  const { BASEURL } = await import('src/Data/baseUrl');
  const LogoutUrl = BASEURL + 'auth/logout';
  const {
    default: { post }
  } = await import('../interface/interceptor');
  const { data } = await post(LogoutUrl, params);
  return data;
};

export type loginDto = {
  username: string;
  password: string;
};

export type loginReturnDto = {
  access_token: string;
  refresh_token: string;
};

export type logoutParamsDto = {
  refresh_token: string;
};

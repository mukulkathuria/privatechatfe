import { BASEURL } from 'src/Data/baseUrl';

export const getProfile = (profile: string) => {
  if (!profile) {
    return '';
  }
  return BASEURL + profile;
};

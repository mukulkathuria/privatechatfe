import { decodedTokenDto } from './dto/decodedToken.dto';

export const uuid = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const decodeAccessToken = (token: string) => {
  if (!token || !token.trim().length) {
    return { error: 'Invalid Token' };
  }
  const splittedToken = token.split('.');
  if (splittedToken.length < 3) {
    return { error: 'inValid token' };
  }
  try {
    const atobToken = atob(splittedToken[1]);
    const decodedToken: decodedTokenDto = JSON.parse(atobToken);
    return { decodedToken };
  } catch (error) {
    return { error: 'Invalid token' };
  }
};

export const isMobileDevice = (userAgent: string): Boolean => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  const matched = toMatch.some((tomatchItem) => userAgent.match(tomatchItem));
  return matched;
};

export const addDays = (days: number): Date => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};

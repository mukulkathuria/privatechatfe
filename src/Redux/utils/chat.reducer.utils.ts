import { ChatRoutes } from '../dtos/chat.reducer.dto';

export const checkchatRoute = (payload: any) => {
  if (!payload) {
    return null;
  }
  const route = payload as string;
  if (route in ChatRoutes) {
    const key = route as keyof typeof ChatRoutes;
    return ChatRoutes[key];
  }
  return null;
};

import { actionDto } from '../../dtos/common.filter.dto';
import { GET_USER_DATA, LOGOUT_USER } from '../../types/auth.reducer.type';
import { authReducerState } from './auth.reducer.initialValue';

const authReducer = (state = authReducerState, action: actionDto) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          data: payload
        }
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          data: null
        }
      };
    default:
      return state;
  }
};

export default authReducer;

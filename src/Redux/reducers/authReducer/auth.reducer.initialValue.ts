import { authReducerDto } from '../../dtos/auth.reducer.dto';
import { getInitialData } from '../../utils/default.data';

export const authReducerState: authReducerDto = {
  user: getInitialData()
};

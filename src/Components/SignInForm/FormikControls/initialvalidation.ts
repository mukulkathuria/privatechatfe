export type initialValuesDto = {
  username: string;
  password: string;
};

export const initialValues = {
  username: '',
  password: ''
};

type errorType = {
  username?: string;
  password?: string;
};

export const validationSchema = (values: initialValuesDto): errorType => {
  const error: errorType = {};
  if (!values.username) {
    error.username = 'Please specify valid email';
  }
  if (!values.password) {
    error.password = 'Password field cant be empty';
  } else if (values.password.length <= 3) {
    error.password = 'Password length cant be less than 3 char';
  }
  return error;
};

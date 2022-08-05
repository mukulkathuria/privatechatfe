export const getErrorMsg = (err: any) => {
  if (!err.response) {
    return 'Something Went Wrong';
  }
  if (err.response) {
    if (err.response.status === 500) {
      return 'Server Error';
    }
    if (err.response.status > 400) {
      return err.response.data.message as string;
    }
  }
  return err.message as string || 'Error occured';
};

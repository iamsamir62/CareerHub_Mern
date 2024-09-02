export const successResponse = (message, data) => {
  return {
    status: 'success',
    message: message,
    data: data,
  };
};

export const failedResponse = (message) => {
  return {
    status: 'failed',
    message: message,
  };
};
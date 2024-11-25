export const responseMessage = {
  success: (message = '', payload) => ({
    message,
    success: true,
    payload,
  }),
  fail: (message = '', payload) => ({
    message,
    success: false,
    payload,
  }),
}

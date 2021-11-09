const getErrorMessage = (err) => {
  let message = "";

  for (const error in err.response.data) {
    message += `${err.response.data[error]}.`;
  }

  return message;
};

export default getErrorMessage;

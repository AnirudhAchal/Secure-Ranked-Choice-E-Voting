const getCurrentUserId = () => {
  const parseJwt = (token) => {
    if (!token) {
      return null;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  const parsedJwt = parseJwt(localStorage.getItem("access_token"));

  if (parsedJwt) {
    return parsedJwt.user_id;
  }

  return null;
};

export default getCurrentUserId;

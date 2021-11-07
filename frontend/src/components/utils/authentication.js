import axiosInstance from "../../axios";

const isAuthenticated = () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (refreshToken) {
    const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

    // exp date in token is expressed in seconds, while now() returns milliseconds:
    const now = Math.ceil(Date.now() / 1000);

    if (tokenParts.exp > now) {
      axiosInstance
        .post("/token/refresh/", { refresh: refreshToken })
        .then((response) => {
          if (response.data.access) {
            localStorage.setItem("access_token", response.data.access);
            axiosInstance.defaults.headers["Authorization"] =
              "JWT " + response.data.access;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return true;
    }
  }

  // Clear Existing tokens
  localStorage.clear("access_token");
  localStorage.clear("refresh_token");

  return false;
};

export default isAuthenticated;

export const getToken = () => {
    return localStorage.getItem("accessToken");
};

export const setToken = (token) => {
    localStorage.setItem("accessToken", token);
};

export const removeToken = () => {
    localStorage.removeItem("accessToken");
};

export const getUser = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

export const setUserStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
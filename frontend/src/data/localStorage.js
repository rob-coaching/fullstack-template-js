const KEY_USER = "APP_USER"

export const setUserInLs = (userObj) => {
  localStorage.setItem(KEY_USER, JSON.stringify(userObj));
}

export const clearUserInLs = () => {
  localStorage.removeItem(KEY_USER);
}
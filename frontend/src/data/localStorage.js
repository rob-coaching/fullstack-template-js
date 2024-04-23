const KEY_USER = "APP_USER"

export const loadUserFromLs = () => {
  const userStr = localStorage.getItem(KEY_USER)
  if(!userStr) return undefined;

  return JSON.parse(userStr)
}

export const setUserInLs = (userObj) => {
  localStorage.setItem(KEY_USER, JSON.stringify(userObj));
}

export const clearUserInLs = () => {
  localStorage.removeItem(KEY_USER);
}
const getLoggedInUserNickname = (): string | null => {
  const userStr = localStorage.getItem('nickname');
  if (userStr) {
    return userStr;
  }
  return null;
};

export default getLoggedInUserNickname;

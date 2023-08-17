export const useAuth = (): boolean => {
  const accessToken = localStorage.getItem('accessToken');

  return !!accessToken; // 인증 여부를 boolean 값으로 반환
};

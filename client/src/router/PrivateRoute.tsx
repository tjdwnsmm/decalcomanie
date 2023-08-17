import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute() {
  // 이곳에 인증을 검증할 방법을 적으면 된다
  const isLogin = useAuth();
  console.log(isLogin);
  if (isLogin) {
    // 인증이 반드시 필요한 페이지
    return <Outlet />;
  }
  // 미로그인 유저가 이동할 곳
  return <Navigate replace to="/login" />;
}

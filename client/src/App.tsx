import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './router/Router';
import { setScreenSize } from './style';

function App() {
  useEffect(() => {
    setScreenSize();

    // resize 이벤트가 발생하면 다시 계산하도록 아래 코드 추가
    window.addEventListener('resize', setScreenSize);
    return () => window.removeEventListener('resize', setScreenSize);
  }, []);
  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;

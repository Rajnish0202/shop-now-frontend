import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = ({ setCategory }) => {
  return (
    <>
      <Header setCategory={setCategory} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

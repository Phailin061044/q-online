import React, { Fragment } from 'react';
import SideBar from './SideBar';
import Header from './Header';
import Footer from './Footer';
import '../../style/private.css';

function PrivateLayout(props) {
  return (
    <Fragment>
      <SideBar />
      <div className="main-private-layout">
        <Header />
        <div className="main-content-private-layout w-full p-4">{props.children}</div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default PrivateLayout;

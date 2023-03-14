import React, { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../style/public.css';

function PublicLayout(props) {
  return (
    <Fragment>
      <Header />
      <div className="main-public-layout p-4">{props.children}</div>
      <Footer />
    </Fragment>
  );
}

export default PublicLayout;

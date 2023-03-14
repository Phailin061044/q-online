import React, { useState, useEffect, Fragment } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from './menu/Menu';
import { checkActive } from '../../helper/Check';
import Login from '../../view/authentication/login/Login';
import { connect } from 'react-redux';
import { AUTHEN, USERINFO } from '../../actions/Authen';

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (location.pathname === '/login') {
      setShow(true);
    }
  }, [location.pathname]);

  return (
    <header id="public">
      <Navbar collapseOnSelect expand="md" className="navbar px-4">
        <Link to="/" className="logo-title">
          Q Online
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {Menu.filter(a => (localStorage.getItem("id") ? true : a.type === 1)).map((item) => (
              <Link to={item.pathname} className={`nav-link ${checkActive(location, item.pathname) ? 'nav-active' : ''}`} key={item.id}>
                {item.title}
              </Link>
            ))}

            {!props.auth.id ? (
              <Fragment>
                <Link to="/register" className={`nav-link ${checkActive(location, '/register') ? 'nav-active' : ''}`}>
                  ลงทะเบียน
                </Link>
                <Link
                  to="#"
                  className={`nav-link ${checkActive(location, '/login') ? 'nav-active' : ''}`}
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  เข้าสู่ระบบ
                </Link>
              </Fragment>
            ) : (
              <NavDropdown title={`คุณ ${props.auth.fullname}`} id="collasible-nav-dropdown">
                <div className="px-2">
                  <Link
                    to="#"
                    className="nav-link text-black"
                    onClick={() => {
                      localStorage.clear();
                      props.USERINFO();
                      navigate('/');
                    }}
                  >
                    ออกจากระบบ
                  </Link>
                </div>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Login show={show} setShow={setShow} />
    </header>
  );
}

const mapStateToProps = (state) => ({
  auth: state.Authentication,
});

const mapDispatchToProps = (dispatch) => {
  return {
    AUTHEN: (id, idCard, fullname, role) => dispatch(AUTHEN(id, idCard, fullname, role)),
    USERINFO: () => dispatch(USERINFO()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

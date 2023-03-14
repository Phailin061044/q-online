import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AUTHEN, USERINFO } from '../actions/Authen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../layout/public/PublicLayout';
import PrivateLayout from '../layout/private/PrivateLayout';
import Redirect from '../view/error/Redirect';

// private
import MainTreatmentType from '../view/private/setting/treatmentType/MainTreatmentType';
import MainDoctor from '../view/private/setting/doctor/MainDoctor';
import FormDoctor from '../view/private/setting/doctor/form/FormDoctor';
import MainOpenSchedule from '../view/private/openSchedule/MainOpenSchedule';
import FormOpenSchedule from '../view/private/openSchedule/form/FormOpenSchedule';
import MainUser from '../view/private/setting/user/MainUser';
import FormUser from '../view/private/setting/user/form/FormUser';

// public
import FormRegister from '../view/authentication/register/FormRegister';
import MainBook from '../view/public/book/MainBook';
import MainHistory from '../view/public/history/MainHistory';
import MainBookAppointment from '../layout/private/bookAppointment/MainBookAppointment'

function Router(props) {
  const role = props.auth.role ? parseInt(props.auth.role) : 0; // 1 = admin, 0 = user

  return (
    <Fragment>
      <BrowserRouter>
        {role === 0 ? (
          <PublicLayout>
            <Routes>
              <Route path="/" element={<h1>หน้าแรก</h1>} />
              <Route path="/home" element={<h1>หน้าแรก</h1>} />
              <Route path="/book-an-appointment" element={<MainBook />} />
              {props.auth.role ?<Route path="/check-book-an-appointment" element={<MainHistory />} /> : null}
              <Route path="/register" element={<FormRegister />} />
              <Route path="*" element={<Redirect />} />
            </Routes>
          </PublicLayout>
        ) : (
          <PrivateLayout>
            <Routes>
              <Route path="/" element={<h1>หลังบ้าน</h1>} />
              <Route path="/admin/book-an-appointment" element={<MainBookAppointment />} />
              <Route path="/admin/open-schedule" element={<MainOpenSchedule />} />
              <Route path="/admin/open-schedule/form" element={<FormOpenSchedule />} />
              <Route path="/admin/treatment-type" element={<MainTreatmentType />} />
              <Route path="/admin/doctor" element={<MainDoctor />} />
              <Route path="/admin/doctor/form" element={<FormDoctor />} />
              <Route path="/admin/user" element={<MainUser />} />
              <Route path="/admin/user/form" element={<FormUser />} />
              <Route path="*" element={<Redirect />} />
            </Routes>
          </PrivateLayout>
        )}
      </BrowserRouter>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Router);

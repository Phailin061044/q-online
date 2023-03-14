import React, { Fragment, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { TextSelect } from '../../../components/TextSelect';
import { getTreatmentTypeAll } from '../../../service/TreatmentType.Service';
import { getBookAppointment } from '../../../service/BookAppointment.Service';
// import { getUserAll } from '../../../service/User.Service';
import ShowData from './ShowData';
import StatusBook from '../../../data/statusBook.json';
import ModalUpdateStatus from './form/ModalUpdateStatus';
import { getUserAll } from '../../../service/User.Service';


function MainBookAppointment() {
  const [show, setShow] = useState(false);
  const [dataBook, setDataBook] = useState(null);
  const [dataTreatment, setDataTreatment] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [data, setData] = useState([]);
  const [pagin, setPagin] = useState({
    totalRow: 1,
    pageSize: 10,
    currentPage: 1,
    totalPage: 1,
  });
  const [dataSubmit, setDataSubmit] = useState({
    userId: '',
    search: '',
    treatment: '',
    status: '',
    startDate: '',
    endDate: '',
    openStartDate: '',
    openEndDate: '',
  });

  useEffect(() => {
    fetchData(10, 1, '', '', '', '', '', '', '', '');
    getTreatmentAll();
    getUser();
  }, []);

  useEffect(() => {
    if (dataBook) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [dataBook]);

  // ฟังก์ชันดึงข้อมูลประเภทการรักษาทั้งหมด
  async function getTreatmentAll() {
    let res = await getTreatmentTypeAll();
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        res.data.unshift({ id: '', name: 'ทั้งหมด' });
        setDataTreatment(res.data);
      }
    }
  }


  

  // ฟังก์ชันดึงข้อมูลผู้ป่วย
  async function getUser() {
    let res = await getUserAll();
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        res.data.unshift({ id: '', id_card: '', name: 'ทั้งหมด' });
        setDataUser(res.data);
      }
    }
  }

  // ฟังก์ชันดึงข้อมูลแบบแบ่งหน้า
  async function fetchData(pageSize, currentPage, userId, search, treatment, status, startDate, endDate, openStartDate, openEndDate) {
    let res = await getBookAppointment(pageSize, currentPage, userId, search, treatment, status, startDate, endDate, openStartDate, openEndDate);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                ข้อมูลการจองคิว
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">ตรวจสอบคิว</h2>
        </div>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={{
            userId: '',
            search: '',
            treatment: '',
            status: '',
            startDate: '',
            endDate: '',
            openStartDate: '',
            openEndDate: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            setDataSubmit(value);
            fetchData(pagin.pageSize, 1, value.userId, value.search, value.treatment, value.status, value.startDate, value.endDate, value.openStartDate, value.openEndDate);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-3 mt-1">
                  <label>ค้นหา</label>
                  <input
                    value={values.search}
                    type="text"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('search', e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-1">
                  <label>รายชื่อผู้ป่วย</label>
                  <TextSelect
                    id="userId"
                    name="userId"
                    options={dataUser}
                    value={dataUser.filter((a) => a.id === values.userId)}
                    onChange={(item) => {
                      setFieldValue('userId', item.id);
                    }}
                    getOptionLabel={(z) => (z.id !== '' ? `${z.id_card} : ${z.name}  ${z.lastname}` : z.name)}
                    getOptionValue={(x) => x.id}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-1">
                  <label>ประเภทการรักษา</label>
                  <TextSelect
                    id="treatment"
                    name="treatment"
                    options={dataTreatment}
                    value={dataTreatment.filter((a) => a.id === values.treatment)}
                    onChange={(item) => {
                      setFieldValue('treatment', item.id);
                    }}
                    getOptionLabel={(z) => z.name}
                    getOptionValue={(x) => x.id}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-1">
                  <label>สถานะ</label>
                  <TextSelect
                    id="status"
                    name="status"
                    options={StatusBook}
                    value={StatusBook.filter((a) => a.value === values.status)}
                    onChange={(item) => {
                      setFieldValue('status', item.value);
                    }}
                    getOptionLabel={(z) => z.label}
                    getOptionValue={(x) => x.value}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-1">
                  <label>วันที่จองคิว</label>
                  <input
                    value={values.startDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('startDate', e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-1">
                  <label>ถึงวันที่</label>
                  <input
                    value={values.endDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('endDate', e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-1">
                  <label>วันที่เข้ารับการรักษา</label>
                  <input
                    value={values.openStartDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('openStartDate', e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-1">
                  <label>ถึงวันที่</label>
                  <input
                    value={values.openStartDate}
                    type="date"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('openStartDate', e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-success mx-1">
                  <i className="fa-solid fa-magnifying-glass mx-1"></i>
                  ค้นหา
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary mx-1"
                  onClick={() => {
                    fetchData(10, 1, '', '', '', '', '', '', '', '');
                  }}
                >
                  <i className="fa-solid fa-rotate-left mx-1"></i>
                  ล้างค่า
                </button>
              </div>
              <div className="w-full mt-5">
                <ShowData
                  data={data}
                  pagin={pagin}
                  setDataBook={setDataBook}
                  changePage={(page) => {
                    fetchData(pagin.pageSize, page, values.userId, values.search, values.treatment, values.status, values.startDate, values.endDate, values.openStartDate, values.openEndDate);
                  }}
                  changePageSize={(pagesize) => {
                    fetchData(pagesize, 1, values.userId, values.search, values.treatment, values.status, values.startDate, values.endDate, values.openStartDate, values.openEndDate);
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <ModalUpdateStatus
        show={show}
        setShow={setShow}
        dataBook={dataBook}
        setDataBook={setDataBook}
        reload={() => {
          fetchData(pagin.pageSize, pagin.currentPage, dataSubmit.userId, dataSubmit.search, dataSubmit.treatment, dataSubmit.status, dataSubmit.startDate, dataSubmit.endDate, dataSubmit.openStartDate, dataSubmit.openEndDate);
        }}
      />
    </Fragment>
  );
}

export default MainBookAppointment;

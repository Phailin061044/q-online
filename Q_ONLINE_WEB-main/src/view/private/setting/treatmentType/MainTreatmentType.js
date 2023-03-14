import React, { Fragment, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { getTreatmentType, updateStstusTreatmentType, deleteTreatmentType } from '../../../../service/TreatmentType.Service';
import ShowData from './ShowData';
import ModalForm from './form/ModalForm';
import Swal from 'sweetalert2';
import { TextSelect } from '../../../../components/TextSelect';
import Status from '../../../../data/status.json';

function MainTreatmentType() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [pagin, setPagin] = useState({
    totalRow: 1,
    pageSize: 10,
    currentPage: 1,
    totalPage: 1,
  });

  useEffect(() => {
    fetchData(10, 1, '', '');
  }, []);

  // ฟังก์ชันดึงข้อมูลแบบแบ่งหน้า
  async function fetchData(pageSize, currentPage, search, status) {
    let res = await getTreatmentType(pageSize, currentPage, search, status);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  // ฟังก์ชันอัพเดทสถานะการใช้งาน
  function updateStatus(id, data) {
    Swal.fire({
      title: 'คุณต้องการอัพเดทสถานะรายการนี้ใช่หรือไม่ !',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await updateStstusTreatmentType(id, data);
        if (res) {
          if (res.statusCode === 200 && res.taskStatus) {
            Swal.fire({
              icon: 'success',
              title: 'อัพเดทข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData(10, 1, '', '');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'อัพเดทข้อมูลไม่สำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    });
  }

  // ฟังก์ชันลบ
  function deleteData(id) {
    Swal.fire({
      title: 'คุณต้องการลบรายการนี้ใช่หรือไม่ !',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deleteTreatmentType(id);
        if (res) {
          if (res.statusCode === 200 && res.taskStatus) {
            Swal.fire({
              icon: 'success',
              title: 'ลบข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData(10, 1, '', '');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'ลบข้อมูลไม่สำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    });
  }

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {/* <li className="breadcrumb-item">
                <Link to="#" className="nav-breadcrumb">
                  Library
                </Link>
              </li> */}
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                ข้อมูลประเภทการรักษา
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">ข้อมูลประเภทการรักษา</h2>
        </div>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={{
            search: '',
            status: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            fetchData(pagin.pageSize, 1, value.search, value.status);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
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
                <div className="col-12 col-md-6 col-lg-4">
                  <label>สถานะการใช้งาน</label>
                  <TextSelect
                    id="pagesize"
                    name="pagesize"
                    options={Status}
                    value={Status.filter((a) => a.value === values.status)}
                    onChange={(item) => {
                      setFieldValue('status', item.value);
                    }}
                    getOptionLabel={(z) => z.label}
                    getOptionValue={(x) => x.value}
                  />
                </div>
                <div className="col-12 col-lg-4 pt-4">
                  <button type="submit" className="btn btn-success mx-1">
                    <i className="fa-solid fa-magnifying-glass mx-1"></i>
                    ค้นหา
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary mx-1"
                    onClick={() => {
                      fetchData(10, 1, '', '');
                    }}
                  >
                    <i className="fa-solid fa-rotate-left mx-1"></i>
                    ล้างค่า
                  </button>
                </div>
              </div>
              <div className="w-full mt-5">
                <ShowData
                  data={data}
                  pagin={pagin}
                  setShow={setShow}
                  setId={setId}
                  updateStatus={updateStatus}
                  deleteData={deleteData}
                  changePage={(page) => {
                    fetchData(pagin.pageSize, page, values.search, values.status);
                  }}
                  changePageSize={(pagesize) => {
                    fetchData(pagesize, 1, values.search, values.status);
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/*-- Modal form insert and update --*/}
      <ModalForm
        id={id}
        show={show}
        setShow={setShow}
        reload={() => {
          setId(0);
          setShow(false);
          fetchData(10, 1, '', '');
        }}
      />
    </Fragment>
  );
}

export default MainTreatmentType;

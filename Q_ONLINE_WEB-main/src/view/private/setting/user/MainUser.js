import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextSelect } from '../../../../components/TextSelect';
import { getUsers, updateStatusUser, deleteUser } from '../../../../service/User.Service';
import Status from '../../../../data/status.json';
import Swal from 'sweetalert2';
import ShowData from './ShowData';

function MainUser() {
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
    let res = await getUsers(pageSize, currentPage, search, status);
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
        let res = await updateStatusUser(id, data);
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
        let res = await deleteUser(id);
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
                  ข้อมูลแพทย์
                </Link>
              </li> */}
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                ข้อมูลรายชื่อผู้ป่วย
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">ข้อมูลรายชื่อผู้ป่วย</h2>
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
                    id="status"
                    name="status"
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
                  deleteData={deleteData}
                  updateStatus={updateStatus}
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
    </Fragment>
  );
}

export default MainUser;

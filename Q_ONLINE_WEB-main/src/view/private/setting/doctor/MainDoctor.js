import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextSelect } from '../../../../components/TextSelect';
import Status from '../../../../data/status.json';
import ShowData from './ShowData';
import { getTreatmentTypeAll } from '../../../../service/TreatmentType.Service';
import { getDoctor, updateStatusDoctor, deleteDoctor } from '../../../../service/Doctor.Service';
import Swal from 'sweetalert2';

function MainDoctor() {
  const [dataTreatment, setDataTreatment] = useState([]);
  const [data, setData] = useState([]);
  const [pagin, setPagin] = useState({
    totalRow: 1,
    pageSize: 10,
    currentPage: 1,
    totalPage: 1,
  });

  useEffect(() => {
    fetchData(10, 1, '', '', '');
    getTreatmentAll();
  }, []);

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

  // ฟังก์ชันดึงข้อมูลแบบแบ่งหน้า
  async function fetchData(pageSize, currentPage, search, treatment, status) {
    let res = await getDoctor(pageSize, currentPage, search, treatment, status);
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
        let res = await updateStatusDoctor(id, data);
        if (res) {
          if (res.statusCode === 200 && res.taskStatus) {
            Swal.fire({
              icon: 'success',
              title: 'อัพเดทข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData(10, 1, '', '', '');
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
        let res = await deleteDoctor(id);
        if (res) {
          if (res.statusCode === 200 && res.taskStatus) {
            Swal.fire({
              icon: 'success',
              title: 'ลบข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData(10, 1, '', '', '');
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
                ข้อมูลรายชื่อแพทย์
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">ข้อมูลรายชื่อแพทย์</h2>
        </div>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={{
            search: '',
            treatment: '',
            status: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            fetchData(pagin.pageSize, 1, value.search, value.treatment, value.status);
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
                    fetchData(10, 1, '', '', '');
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
                  updateStatus={updateStatus}
                  deleteData={deleteData}
                  changePage={(page) => {
                    fetchData(pagin.pageSize, page, values.search, values.treatment, values.status);
                  }}
                  changePageSize={(pagesize) => {
                    fetchData(pagesize, 1, values.search, values.treatment, values.status);
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

export default MainDoctor;

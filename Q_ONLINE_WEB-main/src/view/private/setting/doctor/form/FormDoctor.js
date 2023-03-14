import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import PrefixDoctor from '../../../../../data/prefixDoctor.json';
import { TextSelect } from '../../../../../components/TextSelect';
import { getTreatmentTypeAll } from '../../../../../service/TreatmentType.Service';
import { createDoctor, updateDoctor, getDetailDoctor } from '../../../../../service/Doctor.Service';
import { DropzoneImage } from '../../../../../components/DropzoneImage';
import Schema from './Validation';
import { baseURL } from '../../../../../helper/Axios';
import Swal from 'sweetalert2';

function FormDoctor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataTreatment, setDataTreatment] = useState([]);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    getTreatmentAll();
    if (location.state) {
      getDetail(location.state);
    }
  }, [location.state]);

  async function getDetail(id) {
    let res = await getDetailDoctor(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setDetail(res.data);
      }
    }
  }

  async function getTreatmentAll() {
    let res = await getTreatmentTypeAll();
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setDataTreatment(res.data);
      }
    }
  }

  async function save(data) {
    let formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('prefixId', data.prefixId);
    formData.append('name', data.name);
    formData.append('lastname', data.lastname);
    formData.append('treatment', data.treatment);

    let res = location.state ? await updateDoctor(location.state, formData) : await createDoctor(formData);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/admin/doctor');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'บันทึกข้อมูลไม่สำเร็จ !!',
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด !!',
        text: 'Server Error',
        showConfirmButton: true,
      });
    }
  }

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/doctor" className="nav-breadcrumb">
                  ข้อมูลรายชื่อแพทย์
                </Link>
              </li>
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                {location.state ? 'แก้ไข' : 'เพิ่ม'}ข้อมูลรายชื่อแพทย์
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">{location.state ? 'แก้ไข' : 'เพิ่ม'}ข้อมูลรายชื่อแพทย์</h2>
        </div>
        <Formik
          enableReinitialize={true}
          validationSchema={Schema}
          initialValues={{
            image: detail ? (detail.path_image ? [`${baseURL}${detail.path_image}`] : []) : [],
            prefixId: detail ? detail.prefix_id : '',
            name: detail ? detail.name : '',
            lastname: detail ? detail.lastname : '',
            treatment: detail ? detail.treatment_type_id : '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            save(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-8 col-lg-7 col-xl-5 px-1 mt-2">
                      <DropzoneImage
                        title="อัพโหลดรูป"
                        errors={errors.image}
                        touched={touched.image}
                        name="image"
                        value={values.image}
                        onChange={(e) => {
                          e.preventDefault();
                          let addimg = [];
                          addimg.push(...e.target.files);
                          setFieldValue('image', addimg);
                        }}
                      />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>คำนำหน้า</label>
                      <TextSelect
                        id="prefixId"
                        name="prefixId"
                        options={PrefixDoctor}
                        value={PrefixDoctor.filter((a) => a.id === values.prefixId)}
                        onChange={(item) => {
                          setFieldValue('prefixId', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>ชื่อ</label>
                      <input
                        name="name"
                        type="text"
                        value={values.name}
                        className={`form-input ${touched.name ? (errors.name ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('name', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="name" className="text-invalid" />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>นามสกุล</label>
                      <input
                        name="lastname"
                        type="text"
                        value={values.lastname}
                        className={`form-input ${touched.lastname ? (errors.lastname ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('lastname', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="lastname" className="text-invalid" />
                    </div>
                    <div className="col-12 px-1 mt-2">
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
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">
                      บันทึก
                    </button>
                    <button type="reset" className="btn btn-secondary mx-1">
                      ล้างค่า
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export default FormDoctor;

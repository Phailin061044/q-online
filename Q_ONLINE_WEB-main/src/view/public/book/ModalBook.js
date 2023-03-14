import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, ErrorMessage } from 'formik';
import DateTh from '../../../components/DateTh';
import Swal from 'sweetalert2';
import {  createBookAppointment } from '../../../service/BookAppointment.Service'

function ModalBook({ show, setShow, dataBook, setDataBook, reload }) {

    async function createBook(data) {
        let res = await createBookAppointment(data);
        if (res) {
          if (res.statusCode === 200 && res.taskStatus) {
            Swal.fire({
              icon: 'success',
              title: 'จองคิวสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
            setDataBook(null);
            setShow(false);
            reload(true);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'จองคิวไม่สำเร็จ',
              text: res.message,
              confirmButtonText: 'ตกลง',
              showConfirmButton: true,
              timer: false,
            });
          }
        }
      }

  return (
    <Modal
      show={show}
      onHide={() => {
        setDataBook(null);
        setShow(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>จองคิว</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={{
            openScheduleId: dataBook ? dataBook.id : 0,
            userId: localStorage.getItem('id'),
            remark: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);

            if (value.openScheduleId && value.userId) {
                createBook(value);
              } else {
                Swal.fire({
                  icon: 'warning',
                  title: 'จองคิวไม่สำเร็จ',
                  text: 'กรุณาลองใหม่อีกครั้ง',
                  confirmButtonText: 'ตกลง',
                  showConfirmButton: true,
                  timer: false,
                });
              }
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <h4>{dataBook ? dataBook.treatment_type_name : '-'}</h4>
                    <div>
                      <b>ชื่อแพทย์ :</b> {dataBook ? dataBook.fullname : '-'}
                    </div>
                    <div>
                      <b>วันที่ :</b> {dataBook ? <DateTh date={dataBook.open_date} /> : '-'}
                    </div>
                  </div>
                  <div className="form-group my-3">
                    <label>หมายเหตุ</label>
                    <textarea
                      value={values.remark}
                      type="remark"
                      name="remark"
                      className={`form-input textarea-h ${touched.remark ? (errors.remark ? 'invalid' : 'valid') : ''}`}
                      onChange={(e) => {
                        setFieldValue('remark', e.target.value);
                      }}
                    ></textarea>
                    <ErrorMessage component="div" name="remark" className="text-invalid" />
                  </div>
                  <div className="row mt-3">
                    <div className="col-6 px-2">
                      <button type="submit" className="w-full btn btn-success">
                        ยืนยันจองคิว
                      </button>
                    </div>
                    <div className="col-6 px-2">
                      <button type="reset" className="w-full btn btn-secondary">
                        ล้างค่า
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ModalBook;
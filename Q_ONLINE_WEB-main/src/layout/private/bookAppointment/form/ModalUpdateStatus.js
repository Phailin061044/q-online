import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from 'formik';
import DateTh from '../../../../components/DateTh';
import StatusBook from '../../../../data/statusBook.json';
import { TextSelect } from '../../../../components/TextSelect';
import Schema from './Validation';
import { updateStatusBook } from '../../../../service/BookAppointment.Service';
import Swal from 'sweetalert2';

function ModalUpdateStatus({ show, setShow, dataBook, setDataBook, reload }) {
        // อัพเดทสถานะ
  async function save(id, data) {
    let res = await updateStatusBook(id, data);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire({
          icon: 'success',
          title: 'อัพเดทสถานะสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        setDataBook(null);
        setShow(false);
        reload(true);
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
        <Modal.Title>อัพเดทสถานะ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          validationSchema={Schema}
          initialValues={{
            status: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            save(dataBook.id, value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <h4>รหัสคิว : {dataBook ? dataBook.code : '-'}</h4>
                    <div>
                      <div>{dataBook ? dataBook.fullname : '-'}</div>
                      <div>
                        <small className="fw-light">({dataBook ? dataBook.fullname_doctor : '-'})</small>
                      </div>
                    </div>
                    <div>
                      <b>ประเภทการรักษา :</b> {dataBook ? dataBook.treatment_type_name : '-'}
                    </div>
                    <div>
                      <b>วันที่เข้ารับการรักษา :</b> {dataBook ? <DateTh date={dataBook.open_date} /> : '-'}
                    </div>
                  </div>
                  <div className="form-group my-3">
                    <label>สถานะ</label>
                    <TextSelect
                      id="status"
                      name="status"
                      options={StatusBook.filter((a) => a.value !== '')}
                      value={StatusBook.filter((a) => a.value === values.status && a.value !== '')}
                      onChange={(item) => {
                        setFieldValue('status', item.value);
                      }}
                      getOptionLabel={(z) => z.label}
                      getOptionValue={(x) => x.value}
                    />
                  </div>
                  <div className="row mt-3">
                    <div className="col-6 px-2">
                      <button type="submit" className="w-full btn btn-success">
                        บันทึก
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

export default ModalUpdateStatus;

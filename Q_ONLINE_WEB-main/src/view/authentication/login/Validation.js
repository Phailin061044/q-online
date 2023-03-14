import * as Yup from 'yup';

const Schema = Yup.object().shape({
  username: Yup.string().required('กรุณากรอก เลขบัตรประจำตัวประชาชน'),
  password: Yup.string().min(6, 'กรุณากรอกให้ครบ 6 หลัก').required('กรุณากรอก รหัสผ่าน'),
});

export default Schema;

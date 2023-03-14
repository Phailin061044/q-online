import * as Yup from 'yup';

const Schema = Yup.object().shape({
  name: Yup.string().required('กรุณากรอก ประเภทการรักษา'),
});

export default Schema;

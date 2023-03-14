import * as Yup from 'yup';

const Schema = Yup.object().shape({
  status: Yup.string().required('กรุณาเลือกสถานะ'),
});

export default Schema;
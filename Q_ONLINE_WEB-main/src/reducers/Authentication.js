var initialState = {
  id: localStorage.getItem('id'),
  idCard: localStorage.getItem('idCard'),
  fullname: localStorage.getItem('fullname'),
  role: localStorage.getItem('role'),
};

export default function Authentication(state = initialState, action) {
  switch (action.type) {
    case 'AUTHEN':
      localStorage.setItem('id', action.id);
      localStorage.setItem('idCard', action.idCard);
      localStorage.setItem('fullname', action.fullname);
      localStorage.setItem('role', action.role);
      return {
        ...state,
        id: localStorage.getItem('id'),
        idCard: localStorage.getItem('idCard'),
        fullname: localStorage.getItem('fullname'),
        role: localStorage.getItem('role'),
      };
    case 'UAUTHEN':
      localStorage.removeItem('id');
      localStorage.removeItem('idCard');
      localStorage.removeItem('fullname');
      localStorage.removeItem('role');
      return {
        ...state,
        id: localStorage.getItem('id'),
        idCard: localStorage.getItem('idCard'),
        fullname: localStorage.getItem('fullname'),
        role: localStorage.getItem('role'),
      };
    case 'USERINFO':
      return {
        ...state,
        id: localStorage.getItem('id'),
        idCard: localStorage.getItem('idCard'),
        fullname: localStorage.getItem('fullname'),
        role: localStorage.getItem('role'),
      };
    default:
      return {
        ...state,
        id: localStorage.getItem('id'),
        idCard: localStorage.getItem('idCard'),
        fullname: localStorage.getItem('fullname'),
        role: localStorage.getItem('role'),
      };
  }
}

export const Menu = [
  {
    id: 1,
    title: 'การจองคิว',
    icon: 'fa-solid fa-q',
    pathname: '/admin/book-an-appointment',
    type: 1,
  },
  {
    id: 2,
    title: 'ตารางเปิดจองคิว',
    icon: 'fa-solid fa-calendar-days',
    pathname: '/admin/open-schedule',
    type: 1,
  },
  {
    id: 3,
    title: 'ตั้งค่า',
    icon: 'fa-solid fa-gears',
    pathname: '#',
    type: 2,
    subMenu: [
      {
        id: 31,
        title: 'รายชื่อผู้ป่วย',
        icon: 'fa-solid fa-minus',
        pathname: '/admin/user',
      },
      {
        id: 32,
        title: 'รายชื่อแพทย์',
        icon: 'fa-solid fa-minus',
        pathname: '/admin/doctor',
      },
      {
        id: 33,
        title: 'ประเภทการรักษา',
        icon: 'fa-solid fa-minus',
        pathname: '/admin/treatment-type',
      },
    ],
  },
];

export function parseWeekday(day) {
  let ret = ''
  if (day.weekday === 'MON') ret += '월'
  else if (day.weekday === 'TUE') ret += '화'
  else if (day.weekday === 'WED') ret += '수'
  else if (day.weekday === 'THU') ret += '목'
  else if (day.weekday === 'FRI') ret += '금'
  else if (day.weekday === 'SAT') ret += '토'
  else if (day.weekday === 'SUN') ret += '일'

  ret += day.period

  return ret
}

export const sharedTemplate = [
  {
    title: '수업명',
    dataIndex: 'lectureName',
    key: 'lectureName',
    width: '200px',
    align: 'center',
  },
  {
    title: '과목ID',
    dataIndex: 'lectureCode',
    key: 'lectureCode',
    width: '100px',
    align: 'center',
  },
  // {
  //   title: '교사명',
  //   dataIndex: 'teacherName',
  //   key: 'teacherName',
  //   width: '150px',
  //   align: 'center',
  // },

  {
    title: '학년',
    dataIndex: 'grade',
    key: 'grade',
    width: '87px',
    align: 'center',
  },

  {
    title: '반',
    dataIndex: 'classNumber',
    key: 'classNumber',
    width: '87px',
    align: 'center',
  },

  {
    title: '교시',
    dataIndex: 'times',
    key: 'times',
    width: '177px',
    align: 'center',
  },
]

export const shareLectures = [
  {
    id: '1',
    key: '1',
    lectureName: '적분과통계',
    lectureId: 12301,
    teacherId: 101,
    teacherName: '김교수',
    grade: 2,
    classNum: 1,
    times: '월3, 수5, 금3',
  },
  {
    id: '2',
    key: '2',
    lectureName: '기하와벡터',
    lectureId: 12501,
    teacherId: 102,
    teacherName: '이교수',
    grade: 2,
    classNum: 1,
    times: '화2, 목4',
  },

  {
    id: '3',
    key: '3',
    lectureName: '영어',
    lectureId: 31201,
    teacherId: 103,
    teacherName: '박교수',
    grade: 2,
    classNum: 1,
    times: '화3, 수6, 목3',
  },

  {
    id: '4',
    key: '4',
    lectureName: '생명과학1',
    lectureId: 45601,
    teacherId: 104,
    teacherName: '최교수',
    grade: 2,
    classNum: 1,
    times: '월1, 목2',
  },
  {
    id: '5',
    key: '5',
    lectureName: '물리1',
    lectureId: 45602,
    teacherId: 105,
    teacherName: '이교수',
    grade: 2,
    classNum: 1,
    times: '화3, 금6',
  },
]

export const shareStudents = [
  {
    id: 1,
    key: '1',
    uId: 10000,
    email: 'kcs@example.com',
    name: '김철수',
    type: 'S',
    phone: '01012345678',
    grade: 4,
    classNum: 2,
    studentNum: 1,
    attendanceState: null,
  },
  {
    id: 2,
    key: '2',
    uId: 10001,
    email: 'kcs@example.com',
    name: '김영희',
    type: 'S',
    phone: '01012345678',
    grade: 4,
    classNum: 2,
    studentNum: 2,
    attendanceState: 'ATTENDANCE',
  },
  {
    id: 3,
    key: '3',
    uId: 10002,
    email: 'kcs@example.com',
    name: '박철수',
    type: 'S',
    phone: '01012345678',
    grade: 4,
    classNum: 2,
    studentNum: 3,
    attendanceState: 'ABSENT',
  },
  {
    id: 4,
    key: '4',
    uId: 10003,
    email: 'kcs@example.com',
    name: '홍길동',
    type: 'S',
    phone: '01012345678',
    grade: 4,
    classNum: 2,
    studentNum: 4,
    attendanceState: 'ATTENDANCE',
  },
  {
    id: 5,
    key: '5',
    uId: 10004,
    email: 'kcs@example.com',
    name: '이철수',
    type: 'S',
    phone: '01012345678',
    grade: 4,
    classNum: 2,
    studentNum: 5,
    attendanceState: 'TARDY',
  },
  {
    id: 6,
    key: '6',
    uId: 10005,
    email: 'kcs@example.com',
    name: '이영희',
    type: 'S',
    phone: '01012345678',
    grade: 4,
    classNum: 2,
    studentNum: 6,
    attendanceState: 'ETC',
  },
]

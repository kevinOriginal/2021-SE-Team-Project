import React from 'react'
import LectureTemplate from './LectureTemplate'
import { sharedTemplate, shareLectures } from './constants'
import SelectClassNumberPopup from './SelectClassNumberPopup'

function TeacherHome({ userObj, lectures, setLectures }) {
  const columns = [
    ...sharedTemplate,
    {
      title: '출석체크',
      dataIndex: 'AtdCheck',
      key: 'AtdCheck',
      width: '177px',
      align: 'center',
      render: (text, record) => <SelectClassNumberPopup lectureData={record} />,
    },
  ]

  return (
    <LectureTemplate
      columns={columns}
      lectures={lectures}
      type={userObj.role}
      name={userObj.fullName}
      setLectures={setLectures}
    />
  )
}

export default TeacherHome

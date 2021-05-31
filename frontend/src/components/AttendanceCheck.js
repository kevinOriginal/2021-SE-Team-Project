import React, { useState } from 'react'
import { Button, Divider, Row, Table, Popconfirm, Input, Col } from 'antd'
import AttendanceCheckBtns from './AttendanceCheckBtns'
import AttendanceCheckHeader from './AttendanceCheckHeader'
import userProfileImage from './svg/profile-user.svg'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const AttendanceCheck = ({ studentsData, lectureData, lectureHour }) => {
  const [_studentsData, setStudentsData] = useState(studentsData)
  const [tableData, setTableData] = useState(studentsData)
  const location = useLocation()

  const onAttendanceStateChanges = ({ uId, newAttendanceState }) => {
    const url = '/api/auth/login'
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    }
    axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        let newStudentsData = [..._studentsData]
        newStudentsData[
          newStudentsData.findIndex((element) => element.uId === uId)
        ].attendanceState = newAttendanceState
        setStudentsData(newStudentsData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onExitAttendance = () => {
    console.log('Exit Attendance')
  }

  const columns = [
    {
      title: '사진',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: () => (
        <img
          src={userProfileImage}
          className="userProfileImage"
          alt="User Profile"
          width="100px"
        />
      ),
    },
    {
      title: '번호',
      dataIndex: 'studentNum',
      key: 'studentNum',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '출석 체크',
      dataIndex: 'attendanceCheckButtons',
      key: 'attendanceCheckButtons',
      align: 'center',
      render: (text, record) => (
        <AttendanceCheckBtns
          uId={record.uId}
          lectureCode={lectureData.lectureCode}
          lectureHour={lectureHour}
          attendanceState={record.attendanceState}
          onAttendanceStateChange={onAttendanceStateChanges}
        />
      ),
    },
  ]

  return (
    <div
      className="AttendanceCheck"
      style={{ paddingRight: '48px', paddingLeft: '48px' }}
    >
      <AttendanceCheckHeader
        studentsData={_studentsData}
        lectureData={lectureData}
        lectureHour={lectureHour}
      />
      <Row justify="end" style={{ justifyContent: 'space-between' }}>
        <Col span={8}>
          <Input.Search
            placeholder="Search Name"
            onSearch={(value) => {
              const filteredData = _studentsData.filter((entry) =>
                entry.name.includes(value),
              )
              setTableData(filteredData)
            }}
          />
        </Col>
        <Col>
          <Popconfirm
            title={'수업을 종료하시겠습니까?'}
            onConfirm={() => onExitAttendance()}
            okText="네"
            cancelText="아니요"
          >
            <Button danger type="primary">
              수업종료
            </Button>
          </Popconfirm>
        </Col>
      </Row>
      <Divider
        style={{ color: 'gray', marginTop: '12px', marginBottom: '12px' }}
      >
        STUDENT LIST
      </Divider>
      <Table columns={columns} dataSource={tableData} />
    </div>
  )
}

export default AttendanceCheck

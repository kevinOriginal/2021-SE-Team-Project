import React from 'react'
import { Button, Row, Col } from 'antd'
import './AttendanceCheckBtns.css'

const AttendanceCheckBtns = ({
  uId,
  lectureCode,
  lectureHour,
  attendanceState,
  onAttendanceStateChange,
}) => {
  const onClickAttendance = () => {
    onAttendanceStateChange({ uId: uId, newAttendanceState: 'ATTENDANCE' })
  }

  const onClickAbsent = () => {
    onAttendanceStateChange({ uId: uId, newAttendanceState: 'ABSENT' })
  }

  const onClickTardy = () => {
    onAttendanceStateChange({ uId: uId, newAttendanceState: 'TARDY' })
  }

  const onClickEtc = () => {
    onAttendanceStateChange({ uId: uId, newAttendanceState: 'ETC' })
  }

  return (
    <div className="AttendanceCheckBtns">
      <Row align="center">
        <Col>
          <Button
            className="attendanceBtn"
            htmlType="button"
            onClick={onClickAttendance}
            active={attendanceState === 'ATTENDANCE' ? 'active' : undefined}
          >
            출석
          </Button>
        </Col>
        <Col>
          <Button
            className="absentBtn"
            htmlType="button"
            onClick={onClickAbsent}
            active={attendanceState === 'ABSENT' ? 'active' : undefined}
          >
            결석
          </Button>
        </Col>
      </Row>
      <Row align="center">
        <Col>
          <Button
            className="tardyBtn"
            htmlType="button"
            onClick={onClickTardy}
            active={attendanceState === 'TARDY' ? 'active' : undefined}
          >
            지각
          </Button>
        </Col>
        <Col>
          <Button
            className="etcBtn"
            htmlType="button"
            onClick={onClickEtc}
            active={attendanceState === 'ETC' ? 'active' : undefined}
          >
            기타
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default AttendanceCheckBtns

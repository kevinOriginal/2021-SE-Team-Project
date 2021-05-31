import React from 'react'
import { Row, Col, Card } from 'antd'
import SchoolHatIcon from './svg/schoolHat.js'
import { ClockCircleOutlined, ReadOutlined } from '@ant-design/icons'
import peopleImage from './svg/multiple-users-silhouette.svg'
import attendanceImage from './svg/check.svg'

const AttendanceCheckHeader = ({ studentsData, lectureData, lectureHour }) => {
  return (
    <div className="AttendanceCheckHeader">
      <Row>
        <Col span={10} style={{ padding: '24px' }}>
          <Card bordered={true} style={{ height: '150px', maxWidth: '300px' }}>
            <Row align="middle">
              <Col span={8} style={{ textAlign: 'center' }}>
                <SchoolHatIcon />
              </Col>
              <Col style={{ marginLeft: '6px' }}>{lectureData.lectureName}</Col>
            </Row>
            <Row align="middle">
              <Col span={8} style={{ textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: '30px' }} />
              </Col>
              <Col style={{ marginLeft: '6px' }}>{lectureHour}차시</Col>
            </Row>
            <Row align="middle">
              <Col span={8} style={{ textAlign: 'center' }}>
                <ReadOutlined style={{ fontSize: '30px' }} />
              </Col>
              <Col style={{ marginLeft: '6px' }}>
                {lectureData.grade}학년 {lectureData.classNumber}반
              </Col>
            </Row>
          </Card>
        </Col>
        <Col offset={4} span={10} style={{ padding: '24px' }}>
          <Row>
            <Col span={12} align="right">
              <Card
                bordered={true}
                bodyStyle={{ padding: '0' }}
                style={{
                  height: '150px',
                  maxWidth: '150px',
                }}
                cover={
                  <img
                    src={peopleImage}
                    className="peopleImage"
                    alt="students"
                    width="50px"
                    height="50px"
                    style={{ marginTop: '12px', marginBottom: '12px' }}
                  />
                }
              >
                <p
                  style={{
                    textAlign: 'center',
                    marginBottom: '6px',
                    color: 'gray',
                    fontSize: '24px',
                  }}
                >
                  {studentsData.length}
                </p>
                <p style={{ textAlign: 'center', color: 'gray' }}>Students</p>
              </Card>
            </Col>
            <Col span={12} align="right">
              <Card
                bordered={true}
                bodyStyle={{ padding: '0' }}
                style={{
                  marginRight: '4px',
                  height: '150px',
                  maxWidth: '150px',
                }}
                cover={
                  <img
                    src={attendanceImage}
                    className="attendanceImage"
                    alt="attandance"
                    width="50px"
                    height="50px"
                    style={{ marginTop: '12px', marginBottom: '12px' }}
                  />
                }
              >
                <p
                  style={{
                    textAlign: 'center',
                    marginBottom: '6px',
                    color: 'gray',
                    fontSize: '24px',
                  }}
                >
                  {
                    studentsData.filter(
                      (data) => data.attendanceState === 'ATTENDANCE',
                    ).length
                  }
                </p>
                <p style={{ textAlign: 'center', color: 'gray' }}>Checked</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AttendanceCheckHeader

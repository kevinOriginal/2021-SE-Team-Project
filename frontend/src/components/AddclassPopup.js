import React, { useState } from 'react'
import {
  Form,
  Input,
  Modal,
  Button,
  Row,
  Col,
  InputNumber,
  Space,
  Select,
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import './AddclassPopup.css'
import axios from 'axios'

const { Option } = Select

const inputLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const validateMessages = {
  required: '${label}을(를) 입력하세요.',
  types: {
    email: '유효한 이메일이 아닙니다.',
    number: '숫자만 입력할 수 있습니다.',
  },
}

const checkNum = (_, value) => {
  if (!isNaN(value) && parseInt(value) >= 0) {
    if (String(value).length > 4)
      return Promise.reject(new Error('4자리의 이하의 숫자를 입력하세요.'))
    return Promise.resolve()
  }
  return Promise.reject(new Error('숫자만 입력 가능합니다.'))
}

const AddclassPopup = ({ lectures, setLectures }) => {
  const [visible, setVisible] = useState(false)

  const onFinish = (data) => {
    const url = '/api/lectures'
    const headers = {
      accept: '*/*',
      'Content-Type': 'application/json',
    }

    axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response)
        alert('수업이 추가되었습니다.')
        setVisible(false)
        setLectures([...lectures, response.data])
        // console.log(response)
      })
      .catch((error) => {
        if (error.response.status == 409)
          alert('동일한 과목코드의 수업이 존재합니다.')
        else alert(JSON.stringify(error.response.data))
      })
  }

  const onFinishFailed = (result) => {
    console.log('fail, result: ', result)
  }

  return (
    <div className="AddclassPopup">
      <Button type="primary" onClick={() => setVisible(true)}>
        수업 추가
      </Button>
      <Modal
        title="수업정보 입력"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button
            key="cancel"
            htmlType="button"
            onClick={() => setVisible(false)}
          >
            취소
          </Button>,
          <Button
            form="addclassForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            등록
          </Button>,
        ]}
      >
        <Form
          {...inputLayout}
          name="addclassForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                {...inputLayout}
                label="수업명"
                name="lectureName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...inputLayout}
                label="과목코드"
                name="lectureCode"
                rules={[{ required: true, validator: checkNum }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                {...inputLayout}
                label="학년"
                name="grade"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={10} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...inputLayout}
                label="반"
                name="classNumber"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={50} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label="교시">
                <Form.List name="lectureTime">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item
                            {...field}
                            style={{ marginBottom: '6px' }}
                            name={[field.name, 'weekday']}
                            key={[field.key, 'weekday']}
                            fieldKey={[field.fieldKey, 'weekday']}
                            rules={[
                              { required: true, message: '요일을 입력하세요.' },
                            ]}
                          >
                            <Select placeholder="요일">
                              <Option value="MON">월</Option>
                              <Option value="TUE">화</Option>
                              <Option value="WED">수</Option>
                              <Option value="THU">목</Option>
                              <Option value="FRI">금</Option>
                              <Option value="SAT">토</Option>
                              <Option value="SUN">일</Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            {...field}
                            style={{ marginBottom: '6px' }}
                            name={[field.name, 'period']}
                            key={[field.key, 'period']}
                            fieldKey={[field.fieldKey, 'period']}
                            rules={[
                              { required: true, message: '시간을 입력하세요.' },
                            ]}
                          >
                            <InputNumber min={1} max={15} placeholder="교시" />
                          </Form.Item>

                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Space>
                      ))}
                      <Form.Item style={{ marginBottom: '0' }}>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          시간추가
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default AddclassPopup

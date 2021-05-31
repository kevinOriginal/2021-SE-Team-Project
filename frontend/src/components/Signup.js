import React, { useState } from 'react'
import { Form, Input, Button, Row, InputNumber, Statistic } from 'antd'
import './Signup.css'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const { Countdown } = Statistic

const inputLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
}

const validateMessages = {
  required: '${label}을(를) 입력하세요.',
  types: {
    email: '유효한 이메일이 아닙니다.',
    number: '숫자만 입력할 수 있습니다.',
  },
}

const Signup = (props) => {
  const [signupForm] = Form.useForm()
  const [password, setPassword] = useState('')
  const [isCodeInputHidden, setIsCodeInputHidden] = useState(true)

  const checkEmail = () => {
    const email = signupForm.getFieldsValue().email
    const url = '/api/users/email-verification/' + email
    const headers = {
      accept: '*/*',
    }

    axios
      .post(url, '', {
        headers: headers,
      })
      .then((response) => {
        setIsCodeInputHidden(false)
      })
      .catch((error) => {
        if (error.response.status == 403)
          alert('이메일 주소는 "cau.ac.kr" 으로 끝나야 합니다.')
        else if (error.response.status == 400)
          alert('정확한 이메일 주소를 입력하세요.')
        else if (error.response.status == 409)
          alert('동일한 이메일 주소로 가입한 계정이 존재합니다.')
        else alert(JSON.stringify(error.response.data))
      })
  }

  const onFinish = (data) => {
    const url = '/api/users/email-validation'
    const params = {
      email: data.email,
      code: data.emailValidCode,
    }
    const headers = {
      accept: '*/*',
    }
    axios
      .get(url, {
        headers: headers,
        params: params,
      })
      .then((response) => {
        requestSignup(data)
      })
      .catch((error) => {
        alert(JSON.stringify(error.response.data))
      })
  }

  const onFinishFailed = (result) => {
    console.log('fail, result: ', result)
  }

  const requestSignup = (data) => {
    const url = '/api/auth/sign-up'
    const headers = {
      accept: '*/*',
      'Content-Type': 'application/json',
    }

    axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        alert('회원가입이 완료되었습니다.')
        console.log(data)
        console.log(response)
        props.history.push({
          pathname: '/',
          state: { userObj: response.data },
        })
      })
      .catch((error) => {
        alert(JSON.stringify(error.response.data))
      })
  }

  const checkPassword = (_, value) => {
    if (password === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'))
  }

  const checkPhone = (_, value) => {
    if (!isNaN(value) && parseInt(value) > 0) {
      if (String(value).length < 9 || String(value).length > 11)
        return Promise.reject(new Error('9~11자리의 숫자를 입력하세요.'))
      return Promise.resolve()
    }
    return Promise.reject(new Error('숫자만 입력 가능합니다.'))
  }

  return (
    <div className="Signup">
      <Row justify="center">
        <h1>회원가입</h1>
      </Row>

      <Form
        {...inputLayout}
        form={signupForm}
        name="signupForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="role"
          initialValue={props.isStudentScreen ? 'STUDENT' : 'TEACHER'}
          hidden
        >
          <Input />
        </Form.Item>

        <Form.Item label="이름" name="fullName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {props.isStudentScreen && (
          <Form.Item label="학년/반/번호">
            <Input.Group compact>
              <Form.Item
                name="grade"
                rules={[{ required: true, message: '학년을 입력하세요.' }]}
                style={{ width: '25%' }}
              >
                <InputNumber min={1} max={10} />
              </Form.Item>
              <Form.Item
                name="classNumber"
                rules={[{ required: true, message: '반을 입력하세요.' }]}
                style={{ width: '25%' }}
              >
                <InputNumber min={1} max={50} />
              </Form.Item>
              <Form.Item
                name="studentNumber"
                rules={[{ required: true, message: '번호를 입력하세요.' }]}
                style={{ width: '25%' }}
              >
                <InputNumber min={1} max={99999999} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        )}

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </Form.Item>

        <Form.Item
          label="비밀번호 확인"
          name="passwordCheck"
          rules={[{ required: true, validator: checkPassword }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="전화번호"
          name="phone"
          rules={[{ required: true, validator: checkPhone }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="이메일 주소">
          <Input.Group compact>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: '이메일을 입력하세요.',
                },
              ]}
              style={{ width: '100%' }}
            >
              <Input />
            </Form.Item>
            <Button htmlType="button" onClick={checkEmail}>
              인증번호 발송
            </Button>
            <Form.Item
              name="emailValidCode"
              rules={[
                { required: true, message: '이메일 인증 번호를 입력하세요.' },
              ]}
              hidden={isCodeInputHidden}
            >
              <Input placeholder={'인증번호 입력'} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Row justify="center">
          <Button
            htmlType="button"
            onClick={() => {
              props.history.goBack()
            }}
          >
            이전
          </Button>
          <Button type="primary" htmlType="submit">
            다음
          </Button>
        </Row>
      </Form>
    </div>
  )
}

export default withRouter(Signup)

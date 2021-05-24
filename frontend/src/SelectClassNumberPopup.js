import React, { useState } from 'react'
import { Form, Modal, Button, Select, Input } from 'antd';
import './SelectClassNumberPopup.css'

const { Option } = Select;

const SelectClassNumberPopup = (props) => {
  const [visible, setVisible] = useState(false)
  const [maxClassNumber, setMaxClassNumber] = useState(3)
  const [selectClassNumberForm] = Form.useForm();
  
  const onFinish = (result) => {
    console.log('finish, result:', result)
  }
  
  const onFinishFailed = (result) => {
    console.log('fail, result: ', result)
  }

  const addMaxClassNumber = () => {
    setMaxClassNumber(maxClassNumber + 1)
    selectClassNumberForm.setFieldsValue({classNumber: maxClassNumber + 1})
  }

  const subMaxClassNumber = () => {
    if (maxClassNumber > 1){
      setMaxClassNumber(maxClassNumber - 1)
      selectClassNumberForm.setFieldsValue({classNumber: maxClassNumber - 1})
    }
  }
  
  return (
    <div className='SelectClassNumberPopup'>
      <Button type='primary' onClick={() => setVisible(true)}>수업 추가</Button>
      <Modal title='차시 입력' centered visible={visible} onCancel={() => setVisible(false)}
        footer={[
          <Button key='cancel' htmlType='button' onClick={() => setVisible(false)}>취소</Button>,
          <Button form='selectClassNumberForm' key='submit' htmlType='submit' type='primary'>확인</Button>,
        ]}
      >
        <Form form={selectClassNumberForm} name='selectClassNumberForm' onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Input.Group compact>
            <Form.Item style={{width: '20%'}} name='classNumber' initialValue={maxClassNumber} rules={[{required: true, message: '수업차시를 입력하세요.'}]}>
              <Select>
                {[...Array(maxClassNumber)].map((n, index) => {
                  return (<Option key={index+1} value={index+1}>{index+1}차시</Option>)
                })}
              </Select>
            </Form.Item>
            <Button onClick={addMaxClassNumber} >차시 추가</Button>
            <Button danger onClick={subMaxClassNumber} >차시 삭제</Button>
          </Input.Group>
        </Form>
      </Modal>
    </div>
  )
}

export default SelectClassNumberPopup
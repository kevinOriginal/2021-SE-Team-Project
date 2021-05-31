import React from 'react'
import { Layout, PageHeader, Typography, Divider } from 'antd'
import { ExportOutlined, BellOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useHistory } from 'react-router'

const { Text } = Typography
const url = '/api/auth/logout'

function Header({ isLogin, name }) {
  const history = useHistory()
  const onLogout = () => {
    axios.post(url).then((response) => {
      if (response) {
        alert('정상적으로 로그아웃 되었습니다.')
        history.push('/')
      } else {
        alert('로그아웃에 실패하였습니다.')
      }
    })
  }
  
  const extraButton = [
    <Text key="helloMsg" strong>
      {name}님, 안녕하세요!
    </Text>,
    <Divider
      key="Divider"
      type="vertical"
      style={{
        height: '30px',
      }}
    />,
    <BellOutlined
      key="BellOutlined1"
      style={{
        fontSize: '25px',
        cursor: 'pointer',
      }}
    />,
    <ExportOutlined
      onClick={onLogout}
      key="BellOutlined2"
      style={{
        fontSize: '25px',
        cursor: 'pointer',
      }}
    ></ExportOutlined>,
  ]

  return (
    <Layout.Header style={{ background: '#fff', padding: 0 }}>
      <PageHeader
        extra={isLogin ? extraButton : []}
        title="중앙 고등학교 출결관리 시스템"
        style={{
          height: 80,
        }}
      ></PageHeader>
    </Layout.Header>
  )
}

export default Header

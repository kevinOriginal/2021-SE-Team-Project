import React from 'react'
import 'antd/dist/antd.css'
import Sider from './Sider'
import Header from './Header'
import { Layout } from 'antd'
const { Content } = Layout

function LayoutCtrl(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider isLogin={props.userObj.id} userObj={props.userObj} />{' '}
      {/*왼쪽 사이드메뉴*/}
      <Layout>
        <Header isLogin={props.userObj.id} name={props.userObj.fullName} />{' '}
        {/*헤더*/}
        <Content
          style={{
            marginTop: '15px',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutCtrl

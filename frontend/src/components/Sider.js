import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

function Sider({ isLogin, userObj }) {
  const disableMenus = (
    <>
      <Menu.Item key="3" disabled="true">
        <span>메세지함</span>
      </Menu.Item>
      <Menu.Item key="4" disabled="true">
        <span>내 정보 관리</span>
      </Menu.Item>
      <Menu.Item key="5" disabled="true">
        <span>설정</span>
      </Menu.Item>
    </>
  )

  return (
    <Layout.Sider width="300" style={{ background: '#373B53' }}>
      <div className="App-logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        style={{ textAlign: 'center', background: '#373B53' }}
      >
        {isLogin ? (
          <>
            <Menu.Item key="1">
              <span>나의 수업 조회</span>
              <Link
                to={{
                  pathname: '/',
                  state: { userObj: userObj },
                }}
              />
            </Menu.Item>
            {userObj.role === 'STUDENT' ? (
              <Menu.Item key="2">
                <span>수강신청</span>
                <Link
                  to={{
                    pathname: '/sugang',
                    state: { userObj: userObj },
                  }}
                />
              </Menu.Item>
            ) : (
              <Menu.Item key="2" disabled="true">
                <span>수강관리</span>
              </Menu.Item>
            )}
            {disableMenus}
          </>
        ) : (
          <>
            <Menu.Item key="1">
              <span>로그인</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>회원가입</span>
              <Link to="/signup" />
            </Menu.Item>
          </>
        )}
      </Menu>
    </Layout.Sider>
  )
}

export default Sider

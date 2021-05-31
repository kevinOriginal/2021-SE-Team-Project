import React, { useState, useEffect } from 'react'
import './App.css'
import LayoutCtrl from './components/LayoutCtrl'
import { Route, useLocation } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import SelectSignup from './components/SelectSignup'
import Sugang from './components/Sugang'
import AttendanceCheck from './components/AttendanceCheck'

// test data
import { shareLectures, shareStudents } from './components/constants'

function App() {
  const location = useLocation()

  const [userObj, setUserObj] = useState(
    location.state ? location.state.userObj : {},
  )
  console.log(location.state)

  useEffect(() => {
    setUserObj(location.state ? location.state.userObj : {})
  }, [location])

  return (
    <div className="App">
      <LayoutCtrl userObj={userObj}>
        <Route
          path="/"
          exact
          component={() => {
            if (userObj.id) {
              return <Home userObj={userObj} />
            }
            return <Login />
          }}
        />
        <Route path="/signup" exact component={SelectSignup} />
        <Route
          path="/signup/teacher"
          render={() => <Signup isStudentScreen={false} />}
        />
        <Route
          path="/signup/student"
          render={() => <Signup isStudentScreen={true} />}
        />
        <Route path="/sugang" component={Sugang} />
        <Route
          path="/attendance"
          render={() => (
            <AttendanceCheck
              studentsData={
                location.state.users
                  ? location.state.users.slice(1)
                  : shareStudents
              } // test data
              lectureData={location.state.lectureData}
              lectureHour={location.state.nth}
            />
          )}
        />
      </LayoutCtrl>
    </div>
  )
}

export default App

import React from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize';
import Customize2 from './pages/Customize2';
// import Logout from './pages/LogOut'
import {Routes,Route} from 'react-router-dom';
import { useContext } from 'react';
import { userDataContext } from './context/UserContext';
import Home from './pages/Home';
import { Navigate } from 'react-router-dom';


function App(){

  const{userData ,setUserData} = useContext(userDataContext)
  return (
    <Routes>

      <Route path='/' element={!userData?<SignUp/>:<Navigate to={"/home"}/>}/>
      <Route path='/home' element={(userData?.assistantImage && userData?.assistantName)?<Home/>:<Navigate to={"/customize"}/>}/>
      <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/home"}/>}/>
       <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/"}/>}/>
        <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={"/"}/>}/>
      {/* <Route path='/logout' element={<Logout/>}/> */}
    </Routes>
  )
}

export default App;
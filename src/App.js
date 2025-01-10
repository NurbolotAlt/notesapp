import React, {useState, useEffect} from 'react';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import EmailVerificationPage from './Components/EmailVerificationPage/EmailVerificationPage';
import EmailVerificationLogin from './Components/EmailVerificationLogin/EmailVerificationLogin';
import MainPage from './Components/MainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  //<LoginForm setUsername={setUsername} setPassword={setPassword} /> 
  
  return (
    <div className="Parent">
      <Router>
      <Routes>
        <Route path="/" element={<LoginForm />}>
        </Route>
        <Route path="/Login" element={<LoginForm />}>
        </Route>
        <Route path="/Register" element={<RegisterForm /> }>
        </Route>
        <Route path="/VerificationPage" element={<EmailVerificationPage /> }>
        </Route>
        <Route path="/VerificationLogin" element={<EmailVerificationLogin /> }>
        </Route>
        <Route path="/MainPage" element={<MainPage /> }>
        </Route>
      </Routes>
    </Router>
  </div>
  );
  
}

export default App
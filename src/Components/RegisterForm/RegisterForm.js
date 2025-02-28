import React, {useState,useEffect} from 'react'
import './RegisterForm.css'
import {FaUser, FaLock} from "react-icons/fa";
import axios from 'axios'
export default function RegisterForm() {


const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [passcheck, setPasscheck] = useState();
//const [key, setKey] = useState();

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

  const  userhandleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const  passhandleChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const  handlePasscheck = (e) => {
    e.preventDefault();
    setPasscheck(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(passcheck === password){
      axiosPostData();
    }
    else{
      alert("Password doesn't match")
    }
  };
  
    async function getsecret(diffie){
      const id = diffie.id
      const clientID = makeid(6)
      const keyID = id.concat(clientID)
      const dataToStore = { username: username, password: password, id:id, clientid:clientID, keyid:keyID};
      localStorage.setItem('myData', JSON.stringify(dataToStore));
    }

    const axiosPostData = async() => {
      const postData = {
        username : username
      }
      await axios.post('http://localhost:4000/reg', postData)
      .then(async function (res){
        if(res.data != "NO"){
          await getsecret(res.data)
          window.location.href = '/VerificationPage';
        }
        else{
          alert("Username already exists!")
        }
      })
    }

  //
  return (
    <div className='wrapper'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <input type="text" onChange={userhandleChange} placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type="password" onChange={passhandleChange} placeholder='Password' required />
                    <FaLock className='icon' />
                </div>
                <div className='input-box'>
                    <input type="password" onChange={handlePasscheck} placeholder='Password' required />
                    <FaLock className='icon' />
                </div>
                <div className='input-box'>
                <button type='submit'>Register</button>
                </div>
            </form>
            <div className="register-link">
                <p>Already have an account? <a href='/Login'>Login</a></p>
            </div>
    </div>
  )
}

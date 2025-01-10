import React, {useState} from 'react'
import './LoginForm.css'
import {FaUser, FaLock} from "react-icons/fa";
import axios from 'axios'
export default function LoginForm() {
  
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
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

  async function getsecret(diffie){
    const id = diffie.id
    const clientID = makeid(6)
    const keyID = id.concat(clientID)
    const dataToStore = { username: username, password: password, id:id, clientid:clientID, keyid:keyID};
    localStorage.setItem('myDataLog', JSON.stringify(dataToStore));
  }

  const axiosPostData = async() => {
    const postData = {
      username : username
    }
    await axios.post('http://localhost:4000/auth', postData)
    .then(async function (res){
      if(res.data != "NO"){
        await getsecret(res.data)
        window.location.href = '/VerificationLogin';
      }
      else{
        alert("Username does not exist!")
      }
    })
  }

  const  handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const  handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosPostData();
  };
  return (
    <div className='wrapper'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <input type="text" onChange={handleUsername} placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type="password" onChange={handlePassword} placeholder='Password' required />
                    <FaLock className='icon' />
                </div>
                <div className='input-box'>
                <button type='submit'>Login</button>
                </div>
                <div className="register-link">
                <p>Don't have an account? <a href='/Register'>Register</a></p>
                </div>
            </form>
    </div>
  )
}


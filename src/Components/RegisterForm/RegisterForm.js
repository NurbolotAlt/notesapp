import React, {useState} from 'react'
import {FaUser, FaLock} from "react-icons/fa";
import axios from 'axios'
export default function RegisterForm() {
  
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
    await axios.post('http://localhost:4000/reg', postData)
    .then(async function (res){
      await getsecret(res.data)
      if(res.data != 0){
        window.location.href = '/VerificationLogin';
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
            <h1>Registration</h1>
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
                <button type='submit'>Register</button>
                </div>
            </form>
    </div>
  )
}


import React, {useEffect} from 'react'
import './EmailVerificationLogin.css'
import axios from 'axios'

export default function EmailVerificationPage(){

    const storedData = localStorage.getItem('myDataLog');
    const parsedData = JSON.parse(storedData);  
    
    const cipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    
        return text => text.split('')
          .map(textToChars)
          .map(applySaltToChar)
          .map(byteHex)
          .join('');
    }

    const axiosCheckEmail = async() => {
        const username = {username: parsedData.username}
        await axios.post('http://localhost:4000/checkEmailLog', username)
        .then(function (res){
            console.log('res.data', res.data.id)
          if(res.data.id != 0){
            //alert(res.data)
            axiosSendPassword()
          }
        })
    }

    const axiosSendPassword = async() => {
        const myCipher = cipher(parsedData.keyid)
        const password = {password: myCipher(parsedData.password)}
        console.log('keyid', parsedData.keyid)
        console.log('ciphered password',password.password)
        await axios.post('http://localhost:4000/sendPasswordLog', password)
        .then(function (res){
          if (res.data === "OK"){
            window.location.href = '/MainPage';
          }
          else{
            alert('Wrong Password')
          }
        })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axiosCheckEmail();
    };
    
    return(
        <div className='wrapper'>
            <h1>Verification page</h1>
            <p>Please send email with subject {parsedData.username} and content {parsedData.clientid} to email theleere@gmail and press the button after it's done</p>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
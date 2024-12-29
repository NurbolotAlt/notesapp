import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import './MainPage.css'

export default function MainPage() {
    const [data, setData] = useState();
    const servdata = {data : ""};
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

    const decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
        return encoded => encoded.toString().match(/.{1,2}/g)
          .map(hex => parseInt(hex, 16))
          .map(applySaltToChar)
          .map(charCode => String.fromCharCode(charCode))
          .join('');
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosSubmitData();
    };

    const  dataHandleChange = (e) => {
        e.preventDefault();
        setData(e.target.value);
      };

      const axiosReceiveData = async() => {
        const SubmitData = {
          username : parsedData.username
        }
        await axios.post('http://localhost:4000/ReceiveData', SubmitData)
        .then(function (res){
          if(res.data === ""){
            console.log("No prev data")
          }
          else{
            console.log(res.data)
            const resdata = res.data
            console.log("key", parsedData.keyid)
            const myDecipher = decipher(parsedData.keyid)
            console.log("ayo", resdata)
            const resstring = myDecipher(resdata)
            console.log("ayo", resstring)
            servdata.data = resstring
            console.log('servdata', servdata.data)
            console.log('Finshed')
          }
        })
    }
    const axiosSubmitData = async() => {
        const myCipher = cipher(parsedData.keyid)
        const SubmitData = {
          data : myCipher(data)
        }
        const dataToStore = {data: data};
        localStorage.setItem('dynamicdata', JSON.stringify(dataToStore));
        await axios.post('http://localhost:4000/SubmitData', SubmitData)
        .then(function (res){
          alert(res.data)
        })
    }

  window.onload = async function(e) {
    e.preventDefault()
    await axiosReceiveData();
    const dataToStore = {data: servdata.data};
    localStorage.setItem('dynamicdata', JSON.stringify(dataToStore));
    console.log('serv', servdata.data)
    if(servdata.data = ""){
      window.location.reload(false)
    }
    console.log('onload success')
  };
  const storedData2 = localStorage.getItem('dynamicdata');
  const parsedData2 = JSON.parse(storedData2);  

    return (
      <div className='container'>
          <div className='input-square'>
          <textarea onChange={dataHandleChange} rows={15} cols={40} placeholder="Your text..." autofocus="">
            {parsedData2.data}
          </textarea>
          <form onSubmit={handleSubmit}>
          <button type='submit'>Save</button>
          </form>
          </div>       
      </div>
    )
}

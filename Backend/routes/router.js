const express = require('express')
const axios = require('axios');
const Math = require('math')
const router = express.Router()
const schemas = require('D:/react/notesapp/Backend/models/schemas')
const { createConfig } = require('D:/react/notesapp/Backend/utils');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv/config')

//router.get('/mail/user/:email', controllers.getUser);
//router.get('/mail/send', controllers.sendMail);
//router.get('/mail/read/:email/:messageId', controllers.readMail);
//router.get('/mail/drafts/:email', controllers.getDrafts);
//router.get('/mail/list/:email', controllers.getMails);

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

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function readMails(username) {
  try{
      const url = `https://gmail.googleapis.com/gmail/v1/users/theleere@gmail.com/threads?q=is:unread subject:${username}`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = createConfig(url, token);
      const response = await axios(config);
      if(response){
        let json = response.data.threads
        result.id = 1
        clientID.id = json[0].snippet
        console.log("clientid 1 ", clientID)
      //console.log(resint)
      //console.log(diffie.p,diffie.g,diffie.secret)
      //console.log(key)
      }
      else{
        console.log('No key')
        result.id = 0
      }
      //json.forEach(function(item) {
      //  console.log(item.snippet);
      //});
  }
  catch(error){
      console.log(error);
  }
  return;
}

const decipher = salt => {
  const textToChars = text => text.toString().split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}

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



//const getPrimes = (min, max) => {
//  const result = Array(max + 1)
//    .fill(0)
//    .map((_, i) => i);
//  for (let i = 2; i <= Math.sqrt(max + 1); i++) {
//    for (let j = i ** 2; j < max + 1; j += i) delete result[j];
//  }
//  return Object.values(result.slice(Math.max(min, 2)));
//};

//const getRandNum = (min, max) => {
//  return Math.floor(Math.random() * (max - min + 1) + min);
//};

//const getRandPrime = (min, max) => {
//  const primes = getPrimes(min, max);
//  return primes[getRandNum(0, primes.length - 1)];
//};

//const getPrem = (p,g,secret) => {
//  return Math.pow(g,secret) % p;
//}

const diffie = {
  id : makeid(6),
}

const diffielog = {
  id : makeid(6),
}

const keyid = {
  keyid:0
}

const clientID = {
  id:0
}

const client = {
  username:""
}

var result = {
  id : 0
}

router.post('/auth', async(req,res) => {
    const {username} = req.body
    client.username = username;
    console.log(client.username + '|')
    found = 0
    await schemas.Users.findOne({username:username}).then(function(data){
      console.log(data)
      found = data
    });
    console.log(found)
    if(found){
        console.log('Found')
        res.send(diffielog)
    }
    else{
      res.send('NO')
    }
    res.end()
})

 router.post('/checkEmail', async function (req,res){
    const {username} = req.body
    client.username = username
    console.log('We got:', client)
    await readMails(username)
    console.log("res", result)
    res.send(result)
    res.end()
})

router.post('/sendPassword', async (req,res) => {
  const {password} = req.body;
  const keyID = diffie.id.concat(clientID.id)
  console.log(keyID)
  const myDecipher = decipher(keyID)
  const decipheredPassword = myDecipher(password)
  console.log("KeyID ", keyID)
  console.log("clientID ", clientID.id)
  console.log('Predeciphered Password:',password)
  console.log('Password:',decipheredPassword)
  const dataform = {username:client.username, password:decipheredPassword}
  const userdata = await schemas.Users.create(dataform)
  if(userdata){
    res.send("OK")
  }
  else{
    res.send('Failed')
  }
  res.end()
})

router.post('/reg', async (req,res) => {
    const {username} = req.body
    console.log(username + '|')
    found = 0
    await schemas.Users.findOne({username:username}).then(function(data){
      console.log(data)
      found = data
    });
    console.log(found)
    if(found){
      console.log('username exists')
      res.send('NO')
    }
    else{
      res.send(diffie)
    }
    res.end()
})

router.post('/checkEmailLog', async function (req,res){
  const {username} = req.body
  client.username = username
  console.log('We got:', client)
  await readMails(username)
  console.log("res", result)
  res.send(result)
  res.end()
})

router.post('/sendPasswordLog', async (req,res) => {
  const {password} = req.body;
  const keyID = diffielog.id.concat(clientID.id)
  keyid.keyid = keyID
  const myDecipher = decipher(keyID)
  const decipheredPassword = myDecipher(password)
  console.log("KeyID ", keyID)
  console.log("KeyID ", keyid)
  console.log("diffielog ", diffielog)
  console.log("diffie ", diffie)
  console.log("clientID ", clientID.id)
  console.log('Predeciphered Password:',password)
  console.log('Password:', decipheredPassword)
  found = 0
    await schemas.Users.findOne({username:client.username, password:decipheredPassword}).then(function(data){
      console.log(data)
      found = data
    });
    console.log(found)
  if(found){
    console.log('User exists')
    res.send('OK')
  }
  else{
    res.send('Failed')
  }
  res.end()
})

router.post('/SubmitData', async function (req,res){
  const myDecipher = decipher(keyid.keyid)
  const data = myDecipher(req.body.data)
  console.log('Data', data)
  const found = await schemas.Data.findOneAndUpdate({username:client.username},{$set:{data:data}}, {upsert:true});
  if(found){
    res.send('Saved')
  }
  else{
    res.send('Failed')
  }
})

router.post('/ReceiveData', async function (req,res){
  const {username} = req.body
  client.username = username
  console.log("client username ", client.username)
  console.log("receive user", username)
    const found = await schemas.Data.findOne({username:username});
    if(found){
      const myCipher = cipher(keyid.keyid)
      const data = myCipher(found.data)
      console.log('send data', found)
      console.log('send data', data)
      res.send(data)
    }
    else{
      const dataform = {username: username, data:""}
      
      const userdata = await schemas.Data.create(dataform)
      if(userdata){
        console.log("new form created")
      }
      res.send("")
    }
    res.end()
})

module.exports = router
require('dotenv/config');

const auth = {
    type: 'OAuth2',
    user: 'theleere@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
};

const mailOptions = {    
    to: 'flaashdesire@gmail.com',
    from: 'theleere@gmail.com',
    subject: 'Gmail API using Node JS',
};

module.exports = {
    auth,
    mailOptions
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type:String},
    password: {type:String}
}
);

const dataSchema = new Schema({
    username: {type:String},
    data: {type:String}
}
);

const UserModel = mongoose.model("Users", userSchema, "users")
const DataModel = mongoose.model("Data", dataSchema, "datas")

const myschema = {'Users':UserModel, 'Data':DataModel}

module.exports = myschema
const mongoose = require('mongoose')
const uniqid = require('uniqid')

const userSchema = new mongoose.Schema({
    userID : {
      type: String,
      default: uniqid(),
      unique: [true, 'UserID must be unique']
    },

    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username is already taken']
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [8, 'Minimum Length Of Password Is 8 Characters']
    },

    fullname: {
      type: String,
      required: [true, 'Fullname Is Required']
    },

    biography: {
      type: String,
      max: [150, 'Maximum Length Of Bio Is 150 Characters'],
      default: 'Hello Everyone!'
    },

    contact: {
      type: String,
      default: '{}'
    },

    profilePicture: {
      type: String,
      default: 'default'
    },

    token: {
      type: String,
      required: true
    }
  })


const User = mongoose.model('user', userSchema, 'user')

let UserModel = { 
  
  'createUser' : 
    async function createUser(data){
      return await User.create({
          username:  data.username,
          password:  data.password,
          fullname:  data.fullname,
          biography: data.biography || undefined,
          token: data.token

      })
    },
    
  'updateUser' : 
    async function updateUser(where, updates){
      return await User.updateOne(where, updates)
    },

  'deleteUser' : 
   async function deleteUser(where){
    return await User.deleteOne(where)
   },

  'getUser' : 
   async function getUser(where, select=undefined){
     return await User.findOne(where, select)
   }
}

module.exports = UserModel
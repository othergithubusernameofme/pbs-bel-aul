const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dbUser = new Schema({
    telegram_id:String,
    name:String,
    notification:{type:Boolean,default:true}
},{timestamps:Date})

module.exports = mongoose.model('User',dbUser);
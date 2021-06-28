const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  sex: {type: String, required: true},
  name: {type: String, required: false},
  secName: { type: String, required: false }
})

module.exports = model('User', schema)

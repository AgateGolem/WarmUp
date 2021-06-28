const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  sex: {type: String, required: true}
})

module.exports = model('Link', schema)

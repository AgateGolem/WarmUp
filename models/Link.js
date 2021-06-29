const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  sex: {type: String, required: true},
  sourceWiki: { type: String, required: true},
  sourceYT: { type: String, required: true }
})

module.exports = model('Link', schema)

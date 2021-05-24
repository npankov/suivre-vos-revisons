const { Schema, model, Types } = require('mongoose');

const schema =  new Schema({
  email: { type:String, required: true, unique: false },
  password: { type: String, required: true },
  cars: [{ type: Types.ObjectId, ref: 'Car' }]
})

module.exports = model('User', schema);
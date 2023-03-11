const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const numberValidator = [{
  validator: (v) => {
    if(v.length >= 8)
      return true
    else
      return false
  },
  message: 'must be at least 8 digits'
},
{

  validator: (v) => {
    return /^\d{2,3}-\d+$/.test(v);
  },
  msg: 'invalid phone number',
}]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate:numberValidator,
    required: true,
  },
});


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
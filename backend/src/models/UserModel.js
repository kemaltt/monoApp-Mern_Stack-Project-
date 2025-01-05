const mongoose = require('mongoose');


const User = new mongoose.Schema({
  name: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  reset_password_key: {
    type: String
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  total_amount: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile_image: {
    type: String
  },
  // favorite: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Product'
  //   }
  // ]
},
  {
    timestamps: true
  });

module.exports = mongoose.model('User', User);


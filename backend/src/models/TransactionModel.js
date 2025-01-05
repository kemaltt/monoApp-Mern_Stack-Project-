const mongoose = require('mongoose');

const Transaction = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  transaction_type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transaction_image: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  
  createdAt: {
    type: Date,
    required: true
  },
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Transaction', Transaction);
const mongoose = require('mongoose');

const Transaction = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  income: {
    type: Boolean,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transaction_image: {
    type: Object
  },
  img: {
    type: Object
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
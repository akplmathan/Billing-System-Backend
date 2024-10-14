
const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  billNumber: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  customer:{
        type:Object
  },
  totalAmount: { type: Number, required: true }
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;

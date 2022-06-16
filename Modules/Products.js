const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  name: {
    type: String,
  },
  descrption: {
    type: String,
  },
  qyantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("testproducts", ProductsSchema);

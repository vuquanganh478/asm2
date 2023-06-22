var mongoose = require('mongoose')
var ToySchema = mongoose.Schema(
   {
      name: String,
      category: String,
      price: Number,
      age: Number,
      image: String 
   }
)
var ToyModel = mongoose.model("CUA HANG DO CHOI", ToySchema, "toystore");
module.exports = ToyModel;
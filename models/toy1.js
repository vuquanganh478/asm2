var mongoose = require('mongoose')
var Toy1Schema = mongoose.Schema(
   {
      name: String,
      category: String,
      price: Number,
      age: Number,
      image: String 
   }
)
var Toy1Model = mongoose.model("CUA HANG LEGO", Toy1Schema, "toy1");
module.exports = Toy1Model;
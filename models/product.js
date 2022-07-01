// user: tawatchai
// pass: 4IuB47ko9oSgDUyE
// use mongoose
const mongoose = require('mongoose');

// connect mongoos
const dbUrl = 'mongodb://localhost:27017/productDb'


mongoose.connect(dbUrl,{
    // useNewUrlParams: true,
    // useUnifiedTopology: true
}).catch(err =>{
    console.log(err)
});

// schema designed
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

// create model 
let productModel = mongoose.model('product',productSchema);

// export model
module.exports = productModel;

module.exports.createProduct=function(model,data){
   model.save(data);
}


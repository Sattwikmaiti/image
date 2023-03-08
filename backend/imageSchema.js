const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//making model (dabase)
const imageSchemaa = new Schema(

{
    image:String,
    
   
}


)
//exporting the model of image list
const imageSchema =mongoose.model("image",imageSchemaa)
module.exports=imageSchema



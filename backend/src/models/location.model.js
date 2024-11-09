import mongoose from "mongoose";

const locationschema=mongoose.Schema({
    name: String,
    title: String,
    image:String,
    
    
})

const Location=mongoose.model("Location",locationschema);

export default Location; 
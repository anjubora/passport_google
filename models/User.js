const mongoose =require('mongoose');
const Schema=mongoose.Schema;


//create Schema 
const UserSchema=new Schema({
    // googleID:{
    //     type:String,
    //     required:true
    // },
    // email:{
    //     type:String,
    //     required:true
    // },
    firstName:{
        type:String
    }
    // lastName:{
    //     type:String
    // },
    // image:{
    //     type:String
    // }
});
//create Collection and add Schema
//mongoose.model('User',UserSchema);
module.exports = User = mongoose.model("users", UserSchema);



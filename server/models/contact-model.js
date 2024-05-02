const {Schema,model} = require('mongoose')
const contactSchema = new Schema({
    username:{type : String , required:true},  //username of the user who is sending the message.
    email:{ type:String ,required:true},
    message:{type:String , required:true},
 });
                                   
 const Contact = new model('Contact',contactSchema);
 module.exports=Contact;
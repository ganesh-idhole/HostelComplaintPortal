const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
         name:String,
         userid:String,
         email:String,
         phone:String,
         hostel:String,
         room:String,
         date:String,
         complainttype:String,
         description:String,
         senderid:String,
         senderusername:String,
         status:String,
         electrician:String,
         plumber:String,
         carpenter:String,
         internet:String,
         deleteforstudent:String,
         deleteforadmin:String
     }
);

module.exports = mongoose.model("complaints",complaintSchema);

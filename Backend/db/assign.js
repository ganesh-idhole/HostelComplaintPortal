const mongoose = require("mongoose");

const assignSchema = new mongoose.Schema(
    {
         name:String,
         electrician:String,
         plumber:String,
         carpenter:String,
         internet:String,
         status:String,
         senderid:String,
         senderusername:String
    }
);
//fvfefevfevevev
module.exports = mongoose.model("assignworkers",assignSchema);
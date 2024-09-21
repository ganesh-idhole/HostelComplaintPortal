const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        username:String,
        email:String,
        password:String,
        role:String,
        collagename:String,
        hostel:String
    });
module.exports = mongoose.model("students",studentSchema);

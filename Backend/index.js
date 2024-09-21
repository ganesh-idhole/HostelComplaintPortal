const express = require("express");
const cors = require("cors");
require("./db/config");
const Student = require("./db/student");
const Complaint = require("./db/complaint");
const Assign = require("./db/assign");
const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());
app.post("/register", async (req,res)=>{
    let student = new Student(req.body);
    let result = await student.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/complaintform",async(req,res)=>{
    let complaint = new Complaint(req.body);
    let result = await complaint.save();
    res.send(result);
})

app.post("/login",async (req,res)=>{
    let student = await Student.findOne(req.body).select("-password");
    if(req.body.email && req.body.password){
        if(student){
            res.send(student);
        }else{
            res.send({result:"invalid user"});
        }
    }else{
        res.send({result:"invalid user"});
    }
})



app.post("/who",async(req,res)=>{
    let test = await Student.findOne(req.body).select("-password");
    if(req.body.password && req.body.username){
        if(test){
            res.send(test);
        }else{
            res.send({result:"invalid user"});
        }
    }else{
        res.send({result:"invalid user"});
    }
})

app.get("/view/:collagename/:hostel",async(req,res)=>{
    try{
        let result = await Complaint.find({
            deleteforadmin:"false",
            collagename:req.params.collagename,
            hostel:req.params.hostel
        });
        res.send(result);
    }catch (error) {
        // Handle errors
        res.status(500).json({ message: "An error occurred while fetching complaints.", error: error.message });
    }
})

app.get("/get/:id",async(req,res)=>{
    let result = await Complaint.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result: "student not available"})
    }
})

app.get("/getwho/:id",async(req,res)=>{
    let result = await Student.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result: "student not available"})
    }
})

app.post("/assign",async(req,res)=>{
    let assignment = new Assign(req.body);
    let result = await assignment.save();
    res.send(result);
})

app.put("/getcomplaint/:id",async(req,res)=>{
    let result = await Complaint.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    );
        res.send(result);
})

app.get("/getstatus/:id",async(req,res)=>{
    let result = await Complaint.find({senderid:req.params.id,deleteforstudent:"false"});
    if(result.length){
        res.send(result);
    }else{
        res.send({result: "not available"})
    }
})

app.put("/putstatus/:id",async(req,res)=>{
    let result = await Complaint.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    );
    res.send(result);
})

app.get("/getstatusvalue/:id",async(req,res)=>{
    let result = await Complaint.findOne({_id:req.params.id});
    res.send(result);
})

app.put("/update/:id",async(req,res)=>{
    let result = await Complaint.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    );
    res.send(result);
})

app.delete("/delete/:id",async(req,res)=>{
let result = await Complaint.deleteOne({_id:req.params.id});
res.send(result);
})

app.get("/search/:collagename/:hostel/:key",async(req,res)=>{
    let result = await Complaint.find({
            deleteforadmin:"false",
            collagename:req.params.collagename,
            hostel:req.params.hostel,
        "$or":[
            {name:{$regex:req.params.key, $options: "i" }},
            {userid:{$regex:req.params.key, $options: "i" }},
            {email:{$regex:req.params.key, $options: "i" }},
            {hostel:{$regex:req.params.key, $options: "i" }},
            {room:{$regex:req.params.key, $options: "i" }},
            {date:{$regex:req.params.key, $options: "i" }}
        ]
    })
    res.send(result);
})

 app.listen(port);
import React,{useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";

const Complaint = ()=>{
  const [name,setName]=useState();
  const [hostel,setHostel]=useState();
  const [userid,setUserid]=useState();
  const [phone,setPhone]=useState();
  const [date,setDate]=useState();
  const [email,setEmail]=useState();
  const [room,setRoom]=useState();
  const [complainttype,setComplainttype]=useState();
  const [description,setDescription]=useState();
  const [senderid,SetSenderid]=useState();
  const [senderusername,setSenderusername]=useState();
  const [status,setStatus]=useState("pending");
  const [electrician]=useState("Not-Assign");
  const [internet]=useState("Not-Assign");
  const [plumber]=useState("Not-Assign");
  const [carpenter]=useState("Not-Assign");
  const [deleteforstudent]=useState(false);
  const [deleteforadmin]=useState(false);
  const [error,setError]=useState(false);

  const navigate=useNavigate();
  const parameter = useParams();
  useEffect(()=>{
    // console.log("param-->",parameter.id);
    getStudent();

  },[])
   
  const getStudent = async() =>{
      let result = await fetch(`https://hostelcomplaintportalbackend1.onrender.com/getwho/${parameter.id}`);
        result = await result.json();
        //  console.log("getname-->",result._id);
       SetSenderid(result._id);
       setSenderusername(result.username);
       
  }

  function handleName(event){
    setName(event.target.value);
  }
  function handlePhone(event){
    setPhone(event.target.value);
  }
  function handleDate(event){
    setDate(event.target.value);
  }
  function handleHostel(event){
    setHostel(event.target.value);
  }
  function handleUserid(event){
    setUserid(event.target.value);
  }
  function handleEmail(event){
    setEmail(event.target.value);
  }
  function handleRoom(event){
    setRoom(event.target.value);
  }
  function handleComplainttype(event){
    setComplainttype(event.target.value);
  }
  function handleDescription(event){
    setDescription(event.target.value);
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    // console.log(!name);
    // return false;
    if(!name || !userid || !phone || !email || !date || !hostel || !room || !complainttype ){
      setError(true);
      return true;
    }
    
    setStatus("pending");                                   
    //complaint collection
    if(userid===senderusername){
      let result = await fetch("https://hostelcomplaintportalbackend1.onrender.com/complaintform", {
        method: "post",
        body: JSON.stringify({ name,userid,phone,email,date,hostel,room,complainttype,description,
          senderid,senderusername,status,electrician,plumber,carpenter,internet,
        deleteforadmin,deleteforstudent }),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    result = await result.json();
    console.log(result);
     navigate("/");
    }else{
      alert("invalid Userid");
    }

    
  }
  
    return(
      <div className="form">
        <h1>Complaint Form</h1>
      <div className="complaintmainform">
      <div className="ComplaintForm">
      <form onSubmit={handleSubmit} >
        <div className="formpart1">
       <input type="text"  placeholder="name" value={name} onChange={handleName} id="formName"/>
       {error && !name &&<span >invalid name</span>}<br/>
       <input type="text" placeholder="UserId" value={userid} onChange={handleUserid}/>
       {error && !userid &&<span >invalid userid</span>}<br/>
       <input type="email" placeholder="email" value={email} onChange={handleEmail}/>
       {error && !email &&<span >invalid email</span>}<br/>
       <input type="text" placeholder="phone" value={phone} onChange={handlePhone}/>
       {error && !phone &&<span >invalid phone</span>}<br/>
       <label>Date : </label>
       <input type="date" value={date} onChange={handleDate} id="date" />
       {error && !date &&<span >invalid date</span>}<br/>
       <label>Hostel : </label>
       <select value={hostel} onChange={handleHostel}>
        <option>select</option>
        <option value="MH-A">MH-A</option>
        <option value="MH-B">MH-B</option>
        <option value="MH-C">MH-C</option>
        <option value="MH-D">MH-D</option>
        <option value="MH-H">MH-H</option>
        <option value="LH-A">LH-A</option>
        <option value="LH-B">LH-B</option>
        <option value="LH-C">LH-C</option>
       </select>
       {error && !hostel &&<span >invalid hostel</span>}<br/>
       <label>Room No.: </label>
       <input type="number" min="101" max="500" value={room} onChange={handleRoom} id="Room"/>
       {error && !room &&<span >invalid room</span>}<br/>
       <label>Complaint Type : </label>
       <select value={complainttype} onChange={handleComplainttype}>
       <option>select</option>
        <option value="Electrical">Electrical</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Internet">Internet</option>
        <option value="Carpentry">Carpentry</option>
       </select>
       {error && !complainttype &&<span >invalid complaint</span>}<br/>
       </div>
       <div className="formpart2">
       <label>Problem Description : </label><br/>
       <textarea  placeholder="Write Your issue..." rows={10} cols={50} value={description} onChange={handleDescription}/><br/>
       <button type="submit">Submit</button>
       </div>
       </form>
       </div>
       </div>
       </div>
    )
}

export default Complaint;

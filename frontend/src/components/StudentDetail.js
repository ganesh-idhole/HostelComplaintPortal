import React, { useState,useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom";


const StudentDetail = () =>{
  const [name,setName]=useState();
  const [hostel,setHostel]=useState();
  const [userid,setUserid]=useState();
  const [ phone,setPhone]=useState();
  const [date,setDate]=useState();
  const [email,setEmail]=useState();
  const [room,setRoom]=useState();
  const [complainttype,setComplainttype]=useState();
  const [description,setDescription]=useState();
  const [senderid,SetSenderid]=useState();
  const [senderusername,setSenderusername]=useState();
  const [status,setStatus]=useState();
  const [electrician,setElectrician]=useState("Not-Assign");
  const [internet,setInternet]=useState("Not-Assign");
  const [plumber,setPlumber]=useState("Not-Assign");
  const [carpenter,setCarpenter]=useState("Not-Assign");

  const navigate=useNavigate();
  const parameter = useParams();

  function handleElectrician(event){
    setStatus("Assigned");
      setElectrician(event.target.value);
  }

  function handleInternet(event){
    setStatus("Assigned");
    setInternet(event.target.value);
  }

  function handlePlumber(event){
    setStatus("Assigned");
    setPlumber(event.target.value);
  }

  function handleCarpenter(event){
    setStatus("Assigned");
    setCarpenter(event.target.value);
  }

  useEffect(()=>{
    // console.log("param-->",parameter.id);
    getStudentDetail();
  },[])

  const getStudentDetail=async()=>{
  //complaint collection
    let result = await fetch(`http://localhost:5000/get/${parameter.id}`);
      result = await result.json();
      //  console.log("senderusername-->",result.senderusername);
    setName(result.name);
    setUserid(result.userid);
    setComplainttype(result.complainttype);
    setDate(result.date);
    setDescription(result.description);
    setEmail(result.email);
    setHostel(result.hostel);
    setPhone(result.phone);
    setRoom(result.room);
    SetSenderid(result.senderid);
    setSenderusername(result.senderusername);

  }

  const submit = async()=>{
    
     let test = await fetch(`http://localhost:5000/getstatusvalue/${parameter.id}`);
        test = await test.json();
        console.log("test-->"+test["status"]);

      const userData = localStorage.getItem('studentKey');
      const user = JSON.parse(userData);
      let collagename = user.collagename;
      let hostel = user.hostel;

     if(test["status"]!=="fulfilled"){
    let Result = await fetch(`http://localhost:5000/getcomplaint/${parameter.id}`,{
      method:"put",
      body: await JSON.stringify({status,electrician,plumber,carpenter,internet}),
      headers:{
        "Content-Type": 'application/json'
      }
    });
      Result = await Result.json();
      navigate(`/view_Complaint/${collagename}/${hostel}`);
      // console.log("rresult--=>"+Result);
  }else{
    alert("already fulfilled");
    navigate(`/view_Complaint/${collagename}/${hostel}`);
  }
  }

    return(
      <>
    <div>
      <h1>StudentDetail </h1>
      <label>Name : {name}</label><br/>
      <label>UserId : {userid}</label><br/>
      <label>Email : {email}</label><br/>
      <label>Phone : {phone}</label><br/>
      <label>Date : {date}</label><br/>
      <label>Hostel :{hostel} </label><br/>
      <label>Room No. :{room} </label><br/>
      <label>Complaint Type :{complainttype} </label><br/>
      <label>Problem Description :{description} </label><br/><br/>
      <label>senderid : {senderid}</label><br/>
      <label>senderusername : {senderusername}</label>
    </div>  <hr/>
    <div className="AssignContainer">
    <h1>Assign</h1>
    <div className="Assign">
      <div className="electrician">
      <label>Electrician  </label>
      <select value={electrician} onChange={handleElectrician} defaultValue="Not-Assign">
        <option value="Worker-E1">Worker-E1</option>
        <option value="Worker-E2">Worker-E2</option>
        <option value="Worker-E3">Worker-E3</option>
        <option value="Worker-E4">Worker-E4</option>
        <option value="Worker-E5">Worker-E5</option>
        <option value="Not-Assign">Not-Assign</option>
      </select>
      </div>
      <div className="plumber">
      <label>Plumber  </label>
      <select value={plumber} onChange={handlePlumber} defaultValue="Not-Assign">
        <option value="Worker-P1">Worker-P1</option>
        <option value="Worker-P2">Worker-P2</option>
        <option value="Worker-P3">Worker-P3</option>
        <option value="Worker-P4">Worker-P4</option>
        <option value="Worker-P5">Worker-P5</option>
        <option value="Not-Assign">Not-Assign</option>
      </select>
      </div>
      <div className="internet">
      <label>Internet  </label>
      <select value={internet} onChange={handleInternet} defaultValue="Not-Assign">
        <option value="Worker-I1">Worker-I1</option>
        <option value="Worker-I2">Worker-I2</option>
        <option value="Worker-I3">Worker-I3</option>
        <option value="Worker-I4">Worker-I4</option>
        <option value="Worker-I5">Worker-I5</option>
        <option value="Not-Assign">Not-Assign</option>
      </select>
      </div>
      <div className="carpenter">
      <label>Carpenter  </label>
      <select value={carpenter} onChange={handleCarpenter} defaultValue="Not-Assign">
        <option value="Worker-C1">Worker-C1</option>
        <option value="Worker-C2">Worker-C2</option>
        <option value="Worker-C3">Worker-C3</option>
        <option value="Worker-C4">Worker-C4</option>
        <option value="Worker-C5">Worker-C5</option>
        <option value="Not-Assign">Not-Assign</option>
      </select>
      </div>
      </div>
      <button onClick={submit}>submit</button>
    </div>
    </> 
    )
}

export default StudentDetail;
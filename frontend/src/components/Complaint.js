import React,{useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";

const Complaint = ()=>{
  const [name,setName]=useState();
  // const [hostel,setHostel]=useState();
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
      let result = await fetch(`http://localhost:5000/getwho/${parameter.id}`);
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
  // function handleHostel(event){
  //   setHostel(event.target.value);
  // }
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
    const userData = localStorage.getItem('studentKey');
    const user = JSON.parse(userData);
    let collagename = user.collagename;
    let hostel = user.hostel;
    console.log(collagename);

    if(!name || !userid || !phone || !email || !date || !hostel || !room || !complainttype ){
      setError(true);
      return true;
    }
  
    setStatus("pending");                                   
    //complaint collection
    if(userid===senderusername){
      let result = await fetch("http://localhost:5000/complaintform", {
        method: "post",
        body: JSON.stringify({ name,userid,phone,email,date,hostel,room,complainttype,description,
          senderid,senderusername,status,electrician,plumber,carpenter,internet,
        deleteforadmin,deleteforstudent ,collagename}),
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
      
      <div className="complaintmainform">
  <div className="ComplaintForm">
    <h1>Complaint Form</h1>
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      {error && !name && <span>Invalid name</span>}

      <label>User ID:</label>
      <input type="text" placeholder="User ID" value={userid} onChange={(e) => setUserid(e.target.value)} />
      {error && !userid && <span>Invalid UserID</span>}

      <label>Email:</label>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && !email && <span>Invalid email</span>}

      <label>Phone:</label>
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      {error && !phone && <span>Invalid phone</span>}

      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      {error && !date && <span>Invalid date</span>}


      <label>Room No.:</label>
      <input type="number" min="101" max="500" value={room} onChange={(e) => setRoom(e.target.value)} />
      {error && !room && <span>Invalid room</span>}

      <label>Complaint Type:</label>
      <select value={complainttype} onChange={(e) => setComplainttype(e.target.value)}>
        <option>select</option>
        <option value="Electrical">Electrical</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Internet">Internet</option>
        <option value="Carpentry">Carpentry</option>
      </select>
      {error && !complainttype && <span>Invalid complaint type</span>}

      <label>Problem Description:</label>
      <textarea placeholder="Write your issue..." rows={10} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

    )
}

export default Complaint;
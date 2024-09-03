import React,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewComplaint = ()=>{
    const [user,setUsers]=useState([]);
    let [deleteforadmin]=useState("true");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("studentKey");
        const item = JSON.parse(auth);
        // console.log("item"+item);
          if(item.role==="Student"){
            navigate("/");
          }
    })
    
    useEffect(()=>{
          viewusers();
    },[])
     
    const viewusers = async () =>{
        let result =  await fetch("http://localhost:5000/view");
        result = await result.json();
        setUsers(result);
    }

    const DeleteForAdmin = async(id,deleteforstudent)=>{
        if(deleteforstudent==="true"){
            let result = await fetch(`http://localhost:5000/delete/${id}`,{
              method:"delete"
            });
            result = await result.json();
          //   console.log(result);
          }else{
            let result = await fetch(`http://localhost:5000/update/${id}`,{
                method:"put",
                body:await JSON.stringify({deleteforadmin}),
                headers:{
                    "Content-Type": 'application/json'
                }
            });
            result = await result.json();
            // console.log(id);
          }
       
        viewusers();
    }
    const search = async(event)=>{
        let key = event.target.value;
        if(key){
            let result =await fetch(`http://localhost:5000/search/${key}`);
            result=await result.json();
            if(result){
                setUsers(result);
            }
        }else{
            viewusers();
        }
      
    }

    return(
        <div className="Userlist">
            <h1>View Complaint</h1>
            <input type="text" placeholder="search" onChange={search} id="searchinput"/>
            <div className="UserlistTable">
            <table>
            <thead>
            <tr>
                <th>Sr.no</th>
                <th>userid</th>
                <th>name</th>
                <th>Date[yy/mm/dd]</th>
                <th>email</th>
                <th>hostel</th>
                <th>room</th>
                <th>Status</th>
                <th>Operations</th>
            </tr>
            </thead>
            <tbody>
            { 
               user.length>0? user.map((item,index)=>
                    <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.userid}</td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{item.email}</td>
                        <td>{item.hostel}</td>
                        <td>{item.room}</td>
                        <td>{item.status}</td>
                        <td><Link to={"/student_detail/"+item._id}>View</Link>
                        <button onClick={()=>DeleteForAdmin(item._id,item.deleteforstudent)}>delete</button></td>
                    </tr>
                    ):
                    <h1>Complaint list is empty</h1>
            }
            </tbody>
            </table>
            </div>
        </div>
    )
}

export default ViewComplaint;
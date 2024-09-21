import React, { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Nav from "./Nav";
import student_image from "./student_image.webp";
import teacher_image from "./teacher_image.png";

const Who = ()=>{
    const [password1,setPassword1] = useState();
    const [password2,setPassword2] = useState();
    const [username1,setUsername1] = useState();
    const [username2,setUsername2] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("studentKey");
          if(auth){
            navigate("/");
          }
    })
    function handleUsername1(event){
        setUsername1(event.target.value);
    }
    function handleUsername2(event){
        setUsername2(event.target.value);
    }
    function handlePassword1(event){
        setPassword1(event.target.value);
    }
    function handlePassword2(event){
        setPassword2(event.target.value);
    }
    const submitStudent = async()=>{
        // console.log("student==>"+username1,password1);
        let username = username1;
        let password = password1;
        let result = await fetch("https://hostelcomplaintportalbackend1.onrender.com/who",{
            method:"post",
            body:JSON.stringify({username,password}),
            headers:{
                "Content-Type": 'application/json'
            }
        });
        result = await result.json();
        <Nav id={result._id}/>
        console.log("result==>"+result._id);
        if(result.role==="Student"){
            localStorage.setItem("studentKey",JSON.stringify(result));
            navigate("/");
        }else{
            alert("invalid");
        }
    }
    const submitAdmin = async()=>{
        // console.log("admin"+username2,password2);
        let username=username2;
        let password=password2;
        let result = await fetch("https://hostelcomplaintportalbackend1.onrender.com/who",{
            method:"post",
            body:JSON.stringify({username,password}),
            headers:{
                "Content-Type": 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.role==="Admin"){
            localStorage.setItem("studentKey",JSON.stringify(result));
            navigate("/");
        }else{
            alert("invalid");
        }
    }

    return(
        <>
        {/* <h1>Who are you ?</h1> */}
        <div className="who">
            <div className="whoStudent">
            <img src={student_image} alt="images"/><br/><br/>
            <input type="text" placeholder="username" value={username1} onChange={handleUsername1}/><br/>
           <input type="password" placeholder="password" value={password1} onChange={handlePassword1}/><br/><br/>
           <button onClick={submitStudent}>Student</button>
           </div>
           <div className="whoAdmin">
            <img src={teacher_image} alt="images"/><br/><br/>
           <input type="text" placeholder="username" value={username2} onChange={handleUsername2}/><br/>
           <input type="password" placeholder="password" value={password2} onChange={handlePassword2}/><br/><br/>
           <button onClick={submitAdmin}>Admin</button>
           </div>
        </div>
        </>
    )
}
export default Who;
<<<<<<< HEAD


=======
>>>>>>> 6f6063ed7290595463dd34d55ab72495c1e7b615

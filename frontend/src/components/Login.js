import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
const Login = () =>{
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("studentKey");
          if(auth){
            navigate("/who");
          }
    })

    function Password(event){
        setPassword(event.target.value);
    }
    function Email(event){
        setEmail(event.target.value);
    }
    const LogInButton = async()=>{
        // console.log(email,password);
        let result = await fetch("http://localhost:5000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type": 'application/json'
            }
        });
        result = await result.json();
        console.log(result.username);
        if(result.username){
            localStorage.setItem("studentKey",JSON.stringify(result));
            navigate("/who");
        }else{
            alert("invalid");
        }

    }

    return(
        <div className="login">
            <h1>LogIn Page</h1>
            <input type="text" placeholder="email" value={email} onChange={Email} />
            <input type="password" placeholder="Password" value={password} onChange={Password}/>
            <button onClick={LogInButton}>LogIn</button>
        </div>
    )
}

export default Login; 
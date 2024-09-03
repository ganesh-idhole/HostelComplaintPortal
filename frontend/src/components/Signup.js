import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("studentKey");
          if(auth){
            navigate("/");
          }
    })
    function Username(event) {
        setUsername(event.target.value);
    }

    function Email(event) {
        setEmail(event.target.value);
    }

    function Password(event) {
        setPassword(event.target.value);
    }

    const submit = async () => {
        console.log(username, email, password);
        let result = await fetch("http://localhost:5000/register", {
            method: "post",
            body: JSON.stringify({ username, email, password }),
            headers: {
                "Content-Type": 'application/json'
            }
        });
        result = await result.json();
        // console.log(result);
        localStorage.setItem("studentKey",JSON.stringify(result));
            navigate("/");
    }

    return (
        <div className="signup">
            <h1>SignUp Page</h1>
            <input type="text" placeholder="Username"  value={username} onChange={Username} />
            <input type="email" placeholder="Email" value={email} onChange={Email} />
            <input type="password" placeholder="Password" value={password} onChange={Password} />
            <button onClick={submit}>SignUp</button>
        </div>
    )
}
export default Signup;
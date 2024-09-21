import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [collagename, setCollagename] = useState();
    // const [role, setRole] = useState();
    const [hostel, setHostel] = useState();
    const [role, setRole] = useState('Student');
    const [code, setCode] = useState();
    const [error,setError]=useState(false);


    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem("studentKey");
        if (auth) {
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

    function CollageName(event) {
        setCollagename(event.target.value);
    }
    function Hostel(event) {
        setHostel(event.target.value);
    }

    // Handle radio button change
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    function handleCode(event) {
        setCode(event.target.value);
    }


    const submit = async () => {
        if(!username ||  !email ||  !hostel ||  !password || !collagename || !role  ){
            setError(true);
            return true;
          }

        if(role==="Student"){
            let result = await fetch("http://localhost:5000/register", {
                method: "post",
                body: JSON.stringify({ username, email, password, collagename, role, hostel }),
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            result = await result.json();
            // console.log(result);
            localStorage.setItem("studentKey", JSON.stringify(result));
            navigate("/");
        }else if(role==="Admin" && code==="22MCMC03"){
        let result = await fetch("http://localhost:5000/register", {
            method: "post",
            body: JSON.stringify({ username, email, password, collagename, role, hostel }),
            headers: {
                "Content-Type": 'application/json'
            }
        });
        result = await result.json();
        // console.log(result);
        localStorage.setItem("studentKey", JSON.stringify(result));
        navigate("/");
    }else{
        alert("invalid admin code");
    }
    }

    return (
        <div className="signup">
            <h1>SignUp Page</h1>
            <input type="text" placeholder="Username" value={username} onChange={Username} />
            {error && !username && <span>Invalid username</span>}
            <input type="email" placeholder="Email" value={email} onChange={Email} />
            {error && !email && <span>Invalid email</span>}
            <input type="password" placeholder="Password" value={password} onChange={Password} />
            {error && !password && <span>Invalid password</span>}
            <div>
                <label>Collage/University : </label>
                <select value={collagename} onChange={CollageName}>
                    <option>select</option>
                    <option value="University of Hyderabad">University of Hyderabad</option>
                    <option value="Jawaharlal Nehru University">Jawaharlal Nehru University</option>
                    <option value="IIT Bombay">IIT Bombay</option>
                    <option value="Savitribai Phule Pune University">Savitribai Phule Pune University</option>
                    <option value="Banaras Hindu University">Banaras Hindu University</option>
                    <option value="R.A.College">R.A.College</option>
                </select>
                {error && !collagename && <span>select collage</span>}
            </div>
            <div>
                <label>Hostel : </label>
                <select value={hostel} onChange={Hostel}>
                    <option>select</option>
                    <optgroup label="University of Hyderabad">
                        <option value="MH-A">MH-A</option>
                        <option value="MH-B">MH-B</option>
                        <option value="MH-C">MH-C</option>
                        <option value="MH-D">MH-D</option>
                        <option value="MH-H">MH-H</option>
                        <option value="LH-A">LH-A</option>
                        <option value="LH-B">LH-B</option>
                        <option value="LH-C">LH-C</option>
                    </optgroup>
                    <optgroup label="Jawaharlal Nehru University">
                        <option value="Hostel-A">Hostel-A</option>
                        <option value="Hostel-B">Hostel-B</option>
                        <option value="Hostel-C">Hostel-C</option>
                        <option value="Hostel-D">Hostel-D</option>
                    </optgroup>

                    <optgroup label="R.A.College">
                        <option value="Shiwaneri">Shiwaner</option>
                        <option value="Raygarh">Raygarh</option>
                        <option value="Torana">Torana</option>
                        <option value=" Janjira">Janjira</option>
                    </optgroup>
                </select>
                {error && !hostel && <span>select hostel</span>}
            </div>
           
            <label>Sign up as:</label><br />

            <input type="radio" id="Student" name="role" value="Student" checked={role === 'Student'}
                onChange={handleRoleChange} /> Student<br />

            <input type="radio" id="Admin" name="role" value="Admin" checked={role === 'Admin'}
                onChange={handleRoleChange} /> Admin<br /><br />

            {/* Admin code input field */}
            <div>
                <label htmlFor="AdminCode">Admin Code:</label>
                <input type="password" id="AdminCode" name="AdminCode" disabled={role !== 'Admin'} placeholder="Enter admin code" onChange={handleCode} />
            </div><br />

            <button onClick={submit}>SignUp</button>
        </div>
    )
}
export default Signup;






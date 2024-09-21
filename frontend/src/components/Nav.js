import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("studentKey");
  const item = auth ? JSON.parse(auth) : null;
  const collagename = auth ? JSON.parse(auth).collagename : null;
  const hostel = auth ? JSON.parse(auth).hostel : null;
  const navigate = useNavigate();
  //  console.log("auth-->"+item._id);
  const logout = () => {
    localStorage.clear();
    navigate("/who");
  };

  return (
    <>
    <div className="Navbar">
      <ul>
        {item ? (
          <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to={`/complaint/${item._id}`}>Complaint Form</Link></li>
            {item.role !== "Student" && (
              <li><Link to={`/view_Complaint/${collagename}/${hostel}`}>View Complaint</Link></li>
            )}
            {/* {item.role !== "Admin" && (
               <li><Link to={`/status/${item._id}`}>Status</Link></li>
             )} */}
              <li><Link to={`/status/${item._id}`}>Status</Link></li>
            <li><Link to='/who' onClick={logout}>LogOut</Link></li>
          </>
        ) : (
          <div>
            <li><Link to="/who">LogIn Page</Link></li>
             { <li><Link to='/signup'>SignUp</Link></li> }
             {/* {<li><Link to='/login'>LogIn</Link></li> } */}
          </div>
        )}
      </ul>
    </div>
    <div>
      <footer className="footer">Hostel Complaint Portal</footer>
    </div>
    </>
  );
};

export default Nav;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmPopup from './ConfirmPopup';
const Status = () => {
    const [data, setData] = useState([]);
    const [status] = useState("fulfilled");
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmId, setConfirmId] = useState(null);
    const [deleteforstudent] = useState("true");
    const parameter = useParams();
    useEffect(() => {
        // console.log("parameter=="+parameter);
        getStatus();
    }, [])
    const getStatus = async () => {
        let result = await fetch(`https://hostelcomplaintportalbackend1.onrender.com/getstatus/${parameter.id}`);
        result = await result.json();
        // console.log("re-->"+result[0].name);
        if (result) {
            setData(result)
        } else {

        }

    }


    const Workdone = async (id) => {
        let result = await fetch(`https://hostelcomplaintportalbackend1.onrender.com/putstatus/${id}`, {
            method: "put",
            body: await JSON.stringify({ status }),
            headers: {
                "Content-Type": 'application/json'
            }
        });
        result = await result.json();
        getStatus();
        // console.log("resultt"+result);
    }
    const handleConfirm = () => {
        Workdone(confirmId);
        setShowConfirm(false);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const showConfirmationPopup = (id) => {
        setConfirmId(id);
        setShowConfirm(true);
    };

    //  useEffect(()=>{
    //     DeleteForStudent();
    //  },[])
    const DeleteForStudent = async (id, deleteforadmin) => {
        if (deleteforadmin === "true") {
            let result = await fetch(`https://hostelcomplaintportalbackend1.onrender.com/delete/${id}`, {
                method: "delete"
            });
            result = await result.json();
            //   console.log(result);
        } else {
            let result = await fetch(`https://hostelcomplaintportalbackend1.onrender.com/update/${id}`, {
                method: "put",
                body: await JSON.stringify({ deleteforstudent }),
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            result = await result.json();
        }

        getStatus();
    }

    return (
        <div className="complaintlist">
            <h1 id="Status">Status</h1>
            <div className="complaintlistTable">
                <table>
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Username</th>
                            <th>Date [yy-mm-dd]</th>
                            <th>Electrician</th>
                            <th>Plumber</th>
                            <th>Carpenter</th>
                            <th>Internet</th>
                            <th>Status</th>
                            <th>Conform</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.userid}</td>
                                <td>{item.date}</td>
                                <td>{item.electrician}</td>
                                <td>{item.plumber}</td>
                                <td>{item.carpenter}</td>
                                <td>{item.internet}</td>
                                <td>
                                    {item.status === "pending" ? (
                                        <span style={{ color: "red", fontSize: "17px", fontWeight: "bold" }}>
                                            {item.status}</span>
                                    ) : item.status === "Assigned" ? (
                                        <span style={{ color: "orange", fontSize: "17px", fontWeight: "bold" }}>{item.status}</span>
                                    ) : (
                                        <span style={{ color: "green", fontSize: "17px", fontWeight: "bold" }}>{item.status}</span>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => showConfirmationPopup(item._id)}>Work-Done</button>
                                </td>
                                <td>
                                    <button onClick={() => DeleteForStudent(item._id, item.deleteforadmin)} id="delete_complaint">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="9"><h1>No Complaint</h1></td>
                            </tr>
                        )}
                    </tbody>
                </table>


                {showConfirm && (
                    <ConfirmPopup
                        message="Confirm if work is done?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default Status;

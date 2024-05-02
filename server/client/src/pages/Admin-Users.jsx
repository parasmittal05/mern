import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationtoken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
      // Handle error, e.g., display an error message
    }
  };


  const deleteUser = async(id) => {
    try {
    const response = await fetch(
        `http://localhost:3000/api/admin/users/delete/${id}`, 
    {
        method: "DELETE",
        headers: {
          Authorization: authorizationtoken,
        },
      }
    );
      const data = await response.json();
      console.log(`users after delete: ${data}`);
      if(response.ok){
        getAllUsersData();
      }
    }  catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Data</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map((curUser, index) => {
              return (
                <tr key={index}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>
                  <td>
                  <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                  </td>
                  <td><button onClick={()=>deleteUser(curUser._id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsers;
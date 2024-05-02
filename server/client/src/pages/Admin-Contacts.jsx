import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";



const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const { authorizationtoken } = useAuth();
  const getContactsData = async()=>{
    try {
        const response  = await fetch('http://localhost:3000/api/admin/contacts',{
            method:'GET',
            headers:{
            Authorization: authorizationtoken,
            }
        });
        const data = await response.json();
        console.log("data",data);
        if(response.ok){
          setContactData(data)
        }
         
    } catch (error) {
        console.log(error)
    }

  }


  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationtoken,
          },
        }
      );
      if (response.ok) {
        getContactsData();
        toast.success("deleted successfully");
      } else {
        toast.error("Not Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };




    useEffect(()=>{
        getContactsData();
      },  []);
    
      return (
        <>
          <section className="admin-contacts-section">
            <h1>Admin Contact Data </h1>
    
            <div className="container  admin-users">
              {contactData.map((curContactData, index) => {
                const { username, email, message} = curContactData;
    
                return (
                  <div key={index}>
                    <p>{username}</p>
                    <p>{email}</p>
                    <p>{message}</p>
                    <button className="btn" onClick={() => deleteContactById(curContactData._id)}>
  delete
</button>

                  </div>
                );
              })}
            </div>
          </section>
        </>
      );
    };
  
  export default AdminContacts;
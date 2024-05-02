import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

 const defaultContactFormData ={
 
    username: "",
    email: "",
    message: "",
  };



function Contact() {
  const [contact, setContact] = useState(defaultContactFormData);
  const [userdata , setuserdata]=useState(true);
  const {user} = useAuth();
 
  if(userdata && user){
    setContact({
      username: user.username,
      email: user.email,
      message:"",
    })
    setuserdata(false)
  }

  const handleInput = (e) =>
   {
    const { name, value } = e.target;


    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
   const response = await fetch("http://localhost:3000/api/form/contact" ,{
    method : 'POST',
    headers:{
        "Content-Type":"application/json"
    },
     body: JSON.stringify(contact),
     })
     if(response.ok){
      setContact(defaultContactFormData);
      const data = await response.json();
      console.log(data)
      toast.success('Message Sent Successfully')
     }
    }catch(error)
     {
      alert('message not sent')
      console.log(error);
     }
     };
      
 
    


  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>
        <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27838.80991622054!2d77.45228261314834!3d29.286696150658614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c3eaa023f0ff1%3A0x7435f8cd8613d1d2!2sBudhana%2C%20Uttar%20Pradesh%20251309!5e0!3m2!1sen!2sin!4v1714219077891!5m2!1sen!2sin" 
          width="100% "
           height="450"
          allowFullScreen="" 
          loading="lazy"  
         referrerPolicy="no-referrer-when-downgrade">

         </iframe>
        </section>
      </section>
    </>
  );
}

export default Contact;

import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Login() { 
  const  [user , setUser] = useState({
  
    email:"",
    password: "",
  })
  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth()
  const handleInput= (e) =>{
    console.log(e);
    let name =  e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
    [name]:value,
    });
  };
  const handleSubmit =  async (e)=>{
    e.preventDefault();
    console.log(user);
    try{
      const  response =  await fetch("http://localhost:3000/api/auth/login" ,{
        method: 'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body : JSON.stringify(user),  
      })

      const res_data = await  response.json();

      if(response.ok){
        
      
       // console.log("res from server",res_data);
       storeTokenInLS(res_data.token);
   
   
        setUser({   email:"",  password: "",})
        toast.success('Login successful!')
        
        navigate("/")
     
        
      }
      else{
        toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);

      console.log("invalid Email or Password");
  
}}
  
catch(error){
  console.log('register',error);
}
};


  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt=" let's fill the login form "
                  width="500"
                  height="500"
                />
              </div>

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    LogIn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;

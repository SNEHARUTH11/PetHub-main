import React, { useState } from "react";
import "./CSS/Signup.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import signuImage from "./images/pets3.png";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [FirstName, setFirstname] = useState("");
  const [LastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState(false)
  const [err1,setErr1]=useState(false)
  const navigate=useNavigate()
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  
  const handleSignup = (e) => {
    e.preventDefault();
    const user = { FirstName, LastName, email, password };
    
   
    
    fetch("https://pethub-u60q.onrender.com/users/register", {
      method: "POST" ,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res)=>{
        // if(res){
        //   navigate("/login")
        // }
        if(res.error){
          console.log("hjy",res);
          if(user.password.length<=6 ){
            // alert("Password should be above 6 characters") 
            setErr(true)
        }
        else {
          // Check if password contains at least one special character
          const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
          if (!specialCharRegex.test(password)) {
            //alert("Password should contain at least one special character");
            setErr1(true)
          }
        
        }
    
      }
      else{
        navigate("/login")
      }
        
      })
      .catch((err) => console.log(err));
    // console.log(user);
    setFirstname("")
    setLastname("")
    setEmail("")
    setPassword("")
  };

  return (
    <div className="main-container">
      <div className="signup-main">
        <div className="signp-image">
          <img src={signuImage} alt="" />
        </div>
        <div className="signup-container">
          <div className="signup-header">
            <div>
              <h2>Sign Up</h2>
            </div>
          </div>
          {/* <div className="signup-social">
            <span className="google">
              <FcGoogle />
              <span>Google</span>
            </span>
            or
            <span className="facebook">
              <BsFacebook />
              <span>Facebook</span>
            </span>
          </div> */}
           <p style={{position:"relative",fontSize:"14px",color:"red"}}>{err && "Password should be above 6 characters"}</p>
           <p style={{position:"relative",fontSize:"14px",color:"red"}}>{err1 && "Password should contain at least one special character"}</p>
          <br />
          
          <form id="signup-form" onSubmit={handleSignup}>
            <div className="input-group user-input-wrp">
              <br />
              <input
                className="inputText"
                type="text"
                id="firstname"
                name="firstname"
                value={FirstName}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <span className="floating-label">First Name</span>
            </div>
            <br />
            <div className="input-group user-input-wrp">
              <br />
              <input
                className="inputText"
                type="text"
                id="lastname"
                name="lastname"
                value={LastName}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
              <span className="floating-label">Last Name</span>
            </div>
            <br />
            <div className="input-group user-input-wrp">
              <br />
              <input
                className="inputText"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="floating-label">Email</span>
            </div>
            <br />
            <div className="input-group user-input-wrp password-container">
              <br />
              <div>
                <input
                  className="inputText"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="floating-label">Password</span>
                <div className="password-toggle" onClick={handleTogglePassword}>
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
              <br />
            </div>
            {/* <div className="input-group user-input-wrp">
              <br />
              <input
                className="inputText"
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="floating-label">Confirm Password</span>
            </div> */}
            <br />
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <p className="login-text">
            Already have an Account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

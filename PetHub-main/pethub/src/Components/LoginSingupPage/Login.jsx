import React, { useState } from "react";
import "./CSS/Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import signuImage from "./images/pets4.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { LoginSuccess } from "../../Redux/Pets/action";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState(false)
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  let dispatch=useDispatch()

  

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    fetch("https://pethub-u60q.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res)=>{
        console.log(res.status);
          if(res.status==200){
            return res.json()
          }
          else{
            alert("Wrong email or password")
          }
      })
      .then((res) => {
        if(res.token==undefined){
          
          setErr(true)
        }
        else{
          localStorage.setItem("token", JSON.stringify(res.token));
          localStorage.setItem("user", JSON.stringify(user.email));
        }
        
        
        // navigate("/");
        console.log(res.token);
        dispatch(LoginSuccess())
        if(res.token){
          navigate("/")
        }
      })
      .catch((err) => console.log(err));
    // console.log(user);
    setEmail("")
    setPassword("")
  };

  return (
    <div className="main-container">
      <div className="login-main">
        <div className="login-image">
          <img src={signuImage} alt="" />
        </div>
        <div className="login-container">
          <div className="login-header">
            <div>
              <h2>Login</h2>
            </div>
          </div>
          {/* <div className="login-social">
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
          <p style={{position:"relative",fontSize:"14px",color:"red"}}>{err && "Wrong email or password"}</p>
          <form id="login-form" onSubmit={handleLogin}>
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
            <br />
            <button type="submit" className="signup-button">
              Login
            </button>
          </form>
          <p className="login-text">
            Dont have an Account? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

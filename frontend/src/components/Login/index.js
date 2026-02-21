import { useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate } from 'react-router-dom'
import "./index.css"


const Login = () =>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSubmitErr, setShowErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    
    const navigate = useNavigate();

    const submitForm = async (event)=>{
        event.preventDefault()
        const url = 'https://backendapi-yv7s.onrender.com/login'
        const userDetails = {email, password}
        console.log(userDetails)
        const options = {
            method : 'POST',
            headers : {
            "Content-Type" : "application/json"
        },
            body : JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        
        if (response.ok){
           Cookies.set('jwt_token', data.jwt_token, {expires : 30})
            navigate("/", {replace : true})
            console.log(data)
        }else{
            console.log(data.error_msg)
            setShowErr(true)
            setErrMsg(data.error_msg)
        }
        
        
    }

    const onChangeEmail = e => {
        setEmail(e.target.value)
        
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }


  return (
    <div className="login-container">
              <div className="login-img-container">
                <img
                  src="https://res.cloudinary.com/dsqphsoxb/image/upload/v1759258958/loginpic_g9ztnp.jpg"
                  className="login-image"
                  alt="website login"
                />
              </div>
              <form className="login-form-container" onSubmit={submitForm}>
                
                  <h1 className="login-heading">Login form</h1>
                
                <div className="input-container">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    className="login-input"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    className="login-input"
                    onChange={onChangePassword}
                  />
                  {showSubmitErr && <p className="error-msg">{errMsg}</p>}
                </div>

                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
  )
}

export default Login

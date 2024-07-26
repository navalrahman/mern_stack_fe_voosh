import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Login.css'
import axios from 'axios';
import { baseurl } from '../../../url';


function Login() {

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const [ formErrors, setFormErrors] = useState({})

    const errors = {}    

    const navigate = useNavigate()

    const runValidation = () => {
        if (user.email.trim().length === 0) {
            errors.email = 'email cant be empty'
        } if (user.password.trim().length === 0) {
            errors.password = 'Password can\'t be empty'
        } else if(user.password.trim().length <= 8){
            errors.password = 'Password must contain at least 8 characters'
        }
    }

    const inputHandler = (e) => {
        const {name, value} = e.target
        setUser({...user,[name]:value})
    }

    const handleSubmit =async (e) => {
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
        await axios.post(`${baseurl}/api/user/login`, user)
        .then((response) => {
            console.log(response);
            if(response.data.token){
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('email',response.data.email)
                navigate('/dashboard')
            } 
            window.location.reload()
        })
        .catch((err) => {
            console.log(err);
        })
    }else {
        setFormErrors(errors)
        setTimeout(() => {
            setFormErrors({})
        },1200)
    }   
    }

    const handleSuccess = (response) => {
        console.log('Login Success:', response);
    };

    const handleFailure = (error) => {
        console.error('Login Failed:', error);
    };
  return (
    <>
     <GoogleOAuthProvider clientId="815839571008-l9m7i48v5fn5v8qsvlbvha948rdd6gim.apps.googleusercontent.com">
        <div className='login' >
            <h3>Login</h3>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='login-form-division' >
                    <input className='login-form-input' value={user.email} name="email" onChange={inputHandler} type="text" placeholder='Email' />
                    { formErrors.email && <div><span style={{color:'red'}}> { formErrors.email }</span><br/></div>}

                </div>
                <div className='login-form-division'>
                    <input  className='login-form-input' value={user.password} type="password" name="password" onChange={inputHandler} placeholder='Password' />
                    { formErrors.password && <div><span style={{color:'red'}}> { formErrors.password }</span><br/></div>}

                </div>

                <div className='login-form-division'>
                    <input className='login-form-button' type="submit" value={'Login'} />
                </div>

                <div>
                    <p style={{textAlign:'center'}}>Don't have account? <Link to={'/signup'}>Signup</Link></p>
                </div>
                <div >
                    <GoogleLogin
                            
                            onSuccess={handleSuccess}
                            onFailure={handleFailure}
                            cookiePolicy={'single_host_origin'}
                    />
                </div>
            </form>
            
        </div>
        </GoogleOAuthProvider>
       
    </>
  )
}

export default Login
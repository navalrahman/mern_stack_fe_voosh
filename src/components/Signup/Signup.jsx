import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import './Signup.css'
import { baseurl } from '../../../url';



function Signup() {

    const [user, setUser] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        confirmpassword:''
    })

    const [ formErrors, setFormErrors] = useState({})

    const errors = {}    
    
    const navigate = useNavigate()

    const runValidation = () => {
        if(user.firstname.trim().length === 0) {
            errors.firstname = 'firstname cant be empty'
        }if(user.lastname.trim().length === 0) {
            errors.lastname = 'firstname cant be empty'
        } if (user.email.trim().length === 0) {
            errors.email = 'email cant be empty'
        } if (user.password.trim().length === 0) {
            errors.password = 'Password can\'t be empty'
        } else if(user.password.trim().length <= 8){
            errors.password = 'Password must contain at least 8 characters'
        }if (user.confirmpassword.trim().length === 0) {
            errors.confirmpassword = 'Confirm password can\'t be empty';
        } else if (user.confirmpassword !== user.password) {
            errors.confirmpassword = 'Password does not match';
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
        await axios.post(`${baseurl}/api/user/signup`, user)
        .then((response) => {
            // console.log(response);
            // toast.success(response.data.message, {position:"top-right"})
            navigate('/')
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
        if(response) {
            navigate('/dashboard')
        }
    };

    const handleFailure = (error) => {
        console.error('Login Failed:', error);
    };
  return (
    <>
        <GoogleOAuthProvider clientId="815839571008-l9m7i48v5fn5v8qsvlbvha948rdd6gim.apps.googleusercontent.com">
        <div className='signup' >
            <h3>Signup</h3>
            <form className='signup-form' onSubmit={handleSubmit} >
                <div className='signup-form-division'>
                    <input type="text" placeholder='First Name' name="firstname" value={user.firstname} onChange={inputHandler} className='signup-from-input'/>
                    { formErrors.firstname && <div><span style={{color:'red'}}> { formErrors.firstname }</span><br/></div>}
                </div>
                <div className='signup-form-division'>
                    <input type="text" placeholder='Last Name' name="lastname" value={user.lastname} onChange={inputHandler} className='signup-from-input' />
                    { formErrors.lastname && <div><span style={{color:'red'}}> { formErrors.lastname }</span><br/></div>}
                </div>
                <div className='signup-form-division'>
                    <input type="email" placeholder='Email' name="email" value={user.email}  onChange={inputHandler} className='signup-from-input' />
                    { formErrors.email && <div><span style={{color:'red'}}> { formErrors.email }</span><br/></div>}
                </div>
                <div className='signup-form-division'>
                    <input type="password" placeholder='Password' name="password" value={user.password} onChange={inputHandler} className='signup-from-input' />
                    { formErrors.password && <div><span style={{color:'red'}}> { formErrors.password }</span><br/></div>}
                </div>
                <div className='signup-form-division' >
                    <input type="password" placeholder='Confirm Password' name="confirmpassword" onChange={inputHandler} className='signup-from-input'/>
                    { formErrors.confirmpassword && <div><span style={{color:'red'}}> { formErrors.confirmpassword }</span><br/></div>}
                </div>

                <div className='signup-form-division'>
                    <input type="submit" value={'Signup'} className='signup-form-button'/>
                </div>

                <div>
                    <p style={{textAlign:'center'}}>Already have account? <Link to={'/'}>Login</Link></p>
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

export default Signup
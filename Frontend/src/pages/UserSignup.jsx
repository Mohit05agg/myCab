import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios' // used to make api calls to the server side i.e that integrating frontend with backend
import { UserDataContext } from '../context/userContext'

const UserSignup = () => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const [userData,setUserData] = useState({})
    
    const navigate = useNavigate() // useNavigate hooke -used to navigate to different pages
    const {user,setUser} = React.useContext(UserDataContext)

    const submitHandler = async(e) => {
        e.preventDefault();
        const newUser = {
          fullname:{
              firstname: firstName,
              lastname: lastName

          },
            email: email,
           password: password,
          
        };
        console.log(`${import.meta.env.VITE_BASE_URL}/users/register`);


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

    if(response.status === 201){// if the status is 201 then the user is created successfully
        const data = response.data
        
        setUser(data.user) // set the user data in the context
        localStorage.setItem('token',data.token) // set the token in the local storage
        navigate('/home') // navigate to login page
    }


       setemail('')
       setpassword('')
       setfirstName('')
       setlastName('')
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between' >
    <div>
    <img className ="w-16 mb-10" src="http://surl.li/vtpgva" alt="uber-logo" />
     <form onSubmit={(e)=>{
        
         submitHandler(e)
     }}>
         <h3 className='text-lg font-medium mb-2'>what's your Name</h3>
         <div className='flex gap-4 mb-5' >
         <input
          required
          className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-base placeholder:text-base'
          type="text"
          placeholder='First Name'
          value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
           />
         <input
          required
          className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-base placeholder:text-base'
          type="text"
          placeholder='Last Name'
            value={lastName}
                onChange={(e) => setlastName(e.target.value)}
           />

         </div>
         <h3 className='text-lg font-medium mb-2'>what's your email</h3>
         <input
          required
            value={email}
            onChange={(e) => setemail(e.target.value)}

          className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base'
          type="email"
          placeholder='email@example.com' />

         <h3 className='text-lg font-medium mb-2'>Enter your Password</h3>
         <input
           
           className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base'
              value={password}
                onChange={(e) => setpassword(e.target.value)}
           required 
           type="password" 
           placeholder='password' />
     <button
       className='bg-[#111] text-white font-semibold -mb-7 rounded px-4 py-2  w-full text-base placeholder:text-base'
       >Create account</button>
       <Link to='/login' className='text-center block mt-5 text-blue-600'>Already have an account? Login here</Link>
     </form>

    </div>
    <div>
     <p className='text-[10px] leading-tight'>MyCab values your privacy. We collect and use your data, like name and location,
         only to provide taxi services. Your information is securely stored and not shared without consent.
          By using MyCab, you agree to our privacy practices.</p>
    </div>

 </div>
  )
}

export default UserSignup
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [userData,setUserData] = useState({})

    const {user,setUser} = useContext(UserDataContext)
    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault();

        const userData ={
            email: email,
            password: password
        }
        
        const response = axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
        if (response.status === 200){
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token',data.token)
            navigate('/home')
        }
   
        
        setemail('')
        setpassword('')
       
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between' >
       <div>
       <img className ="w-16 mb-10" src="http://surl.li/vtpgva" alt="uber-logo" />
        <form onSubmit={(e)=>{
           
            submitHandler(e)
        }}>
            <h3 className='text-lg font-medium mb-2'>what's your email</h3>
            <input
             required
             value={email}
            onChange={(e) => setemail(e.target.value)}
             className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
             type="email"
             placeholder='email@example.com' />

            <h3 className='text-lg font-medium mb-2'>Enter your Password</h3>
            <input
              required 
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
              type="password" 
              placeholder='password' />
        <button
          className='bg-[#111] text-white font-semibold -mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm'
          >Login</button>
          <Link to='/signup' className='text-center block mt-5 text-blue-600'>Don't have an account? Sign up</Link>
        </form>

       </div>
       <div>
        <Link
        to='/captain-login'
         className='bg-[#10b461] flex items-center justify-center text-white font-semibold -mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-sm'
        >Sign in as Captain</Link>
       </div>

    </div>
  )
}

export default UserLogin
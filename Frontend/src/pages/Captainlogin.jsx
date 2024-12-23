import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [captainData,setCaptainData] = useState({})


    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({
            email:email,
            password:password
        })
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
          <Link to='/captain-signup' className='text-center block mt-5 text-blue-600'>Join a fleet? Register as a Captain</Link>
        </form>

       </div>
       <div>
        <Link
        to='/login'
         className='bg-[#d5622d] flex items-center justify-center text-white font-semibold -mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-sm'
        >Sign in as User</Link>
       </div>

    </div>
  )
}

export default Captainlogin
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Captainsignup = () => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const [userData,setUserData] = useState({})
    
    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            fullName:{
                firstName:firstName,
                lastName:lastName
            },
            email:email,
            password:password,
    
        })
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
       >Login</button>
       <Link to='/captain-login' className='text-center block mt-5 text-blue-600'>Already have an account? Login here</Link>
     </form>

    </div>
    <div>
     <p className='text-[10px] leading-tight'>MyCab values your privacy. We collect and use your data, like name and location,
         only to provide taxi services. Your information is securely stored and not shared without consent.
          By using MyCab, you agree to our privacy practices.</p>
    </div>

 </div>  )
}

export default Captainsignup
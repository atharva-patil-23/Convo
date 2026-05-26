import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext.js'

const LoginPage = () => {

  const [currState,setCurrState] = useState('Sign up')
  const [fullName,setFullName] = useState("")
  const [bio,setBio] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isDataSubmitted , setIsDataSubmitted] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const { login } = useContext(AuthContext)

  const isSignup = currState === 'Sign up'
  const onStep2 = isSignup && isDataSubmitted

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (isSignup && !agreedToTerms) {
      toast.error("Please agree to the terms of use & privacy policy.")
      return
    }

    if(isSignup && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }

    login(isSignup ? "signup" : "login",
      {
        fullName,
        email,
        password,
        bio
      }
    )
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl relative'>
      {/* left */}
        <img src="/chat.svg" alt="" className='w-[min(30vw,250px)]'/>

      {/* right */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <div className='flex flex-col gap-1'>
          <h2 className='font-medium text-2xl flex justify-between items-center'>
            {currState}
            {onStep2 && <img onClick={() => setIsDataSubmitted(false)} src="/arrow.svg" alt="Back to previous step"  className='w-5 cursor-pointer'/>}
          </h2>
          {isSignup && (
            <p className='text-xs text-gray-400'>Step {onStep2 ? 2 : 1} of 2</p>
          )}
        </div>

        {isSignup && !isDataSubmitted &&(
          <input onChange={(e) => setFullName(e.target.value)} value={fullName}
          type="text" className='p-2 border bg-transparent border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' aria-label='Full Name' required />

        )}

        {!isDataSubmitted &&(
          <>
          <input onChange={(e) => setEmail(e.target.value)} value={email}
          type="email" className='p-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter your email address' aria-label='Email address' required />

          <input onChange={(e) => setPassword(e.target.value)} value={password}
          type="password" className='p-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Password' aria-label='Password' required />
          </>

        )}

        {onStep2 && (
            <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4}
            className="p-2 border border-gray-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder='Provide a short bio....' aria-label='Short bio' required></textarea>
         )
        }

        <button
          type='submit'
          disabled={isSignup && !agreedToTerms}
          className={`py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md ${isSignup && !agreedToTerms ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isSignup ? (onStep2 ? "Create Account" : "Next") : "Login now"}
        </button>

        {isSignup && (
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <input
              id='terms'
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor='terms'>Agree to the terms of use & privacy policy.</label>
          </div>
        )}

        <div className='flex flex-col gap-2 items-center'>
            {currState === 'Sign up' ? (
              <p className='text-sm text-gray-600'>Already have an account ? 
                <span 
                  onClick={() => {setCurrState("Login"); 
                  setIsDataSubmitted(false)}} 
                  className='font-medium text-violet-500 cursor-pointer'>
                  Login here
                  </span>
              </p>
            ):(
              <p 
              className='text-sm text-gray-600'>
                Create an account. 
                <span  
                  onClick={() => {setCurrState("Sign up")}} 
                  className='font-medium text-violet-500 cursor-pointer'>
                    Click here
                </span>
              </p>
            )}
        </div>

      </form>
      {/* Bottom left logo */}
      <img 
        src="/logo-corner.png" 
        alt="corner logo" 
        className="fixed left-3 bottom-3 w-12 h-12 sm:w-16 sm:h-16 object-contain z-10 opacity-80 select-none pointer-events-none"
        style={{maxWidth: '15vw', maxHeight: '15vw'}}
      />
    </div>
  )
}

export default LoginPage
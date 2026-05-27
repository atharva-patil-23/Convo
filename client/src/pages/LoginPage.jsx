import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext.js'

const LoginPage = () => {

  const [currState, setCurrState] = useState('Sign up')
  const [fullName, setFullName] = useState("")
  const [bio, setBio] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)
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

    if (isSignup && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }

    login(isSignup ? "signup" : "login", { fullName, email, password, bio })
  }

  const submitDisabled = isSignup && !agreedToTerms

  return (
    <div className='min-h-screen bg-bg flex items-center justify-center p-6'>
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-sm flex flex-col gap-5'
      >
        <div className='flex items-center gap-2.5 mb-2'>
          <div className='w-7 h-7 rounded-lg bg-accent grid place-items-center text-bg font-bold text-base'>C</div>
          <div className='text-lg font-semibold tracking-tight text-text'>Convo</div>
        </div>

        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight text-text flex justify-between items-center'>
            <span>{isSignup ? (onStep2 ? "Tell us about you" : "Create your account") : "Sign in"}</span>
            {onStep2 && (
              <button
                type='button'
                onClick={() => setIsDataSubmitted(false)}
                aria-label='Back to previous step'
                className='text-text-muted hover:text-text transition-colors duration-micro ease-ease cursor-pointer'
              >
                ←
              </button>
            )}
          </h1>
          {isSignup && (
            <p className='text-xs text-text-faint font-mono tracking-wider uppercase'>Step {onStep2 ? 2 : 1} of 2</p>
          )}
        </div>

        {isSignup && !isDataSubmitted && (
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs text-text-muted font-medium' htmlFor='fullname'>Name</label>
            <input
              id='fullname'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder='Your name'
              aria-label='Full Name'
              required
              className='px-3.5 py-2.5 bg-surface-1 border border-border rounded-lg text-sm text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors duration-micro ease-ease'
            />
          </div>
        )}

        {!isDataSubmitted && (
          <>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs text-text-muted font-medium' htmlFor='email'>Email</label>
              <input
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder='you@example.com'
                aria-label='Email address'
                required
                className='px-3.5 py-2.5 bg-surface-1 border border-border rounded-lg text-sm text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors duration-micro ease-ease'
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs text-text-muted font-medium' htmlFor='password'>Password</label>
              <input
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='••••••••'
                aria-label='Password'
                required
                className='px-3.5 py-2.5 bg-surface-1 border border-border rounded-lg text-sm text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors duration-micro ease-ease'
              />
            </div>
          </>
        )}

        {onStep2 && (
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs text-text-muted font-medium' htmlFor='bio'>Short bio</label>
            <textarea
              id='bio'
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              placeholder='A line or two about yourself'
              aria-label='Short bio'
              required
              className='px-3.5 py-2.5 bg-surface-1 border border-border rounded-lg text-sm text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors duration-micro ease-ease resize-none'
            />
          </div>
        )}

        <button
          type='submit'
          disabled={submitDisabled}
          className={`py-3 rounded-lg text-sm font-semibold transition-[filter,opacity] duration-micro ease-ease ${
            submitDisabled
              ? 'bg-accent text-bg opacity-40 cursor-not-allowed'
              : 'bg-accent text-bg hover:brightness-110 cursor-pointer'
          }`}
        >
          {isSignup ? (onStep2 ? "Create account" : "Continue") : "Sign in"}
        </button>

        {isSignup && (
          <div className='flex items-start gap-2 text-xs text-text-muted'>
            <input
              id='terms'
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className='mt-0.5 accent-accent cursor-pointer'
            />
            <label htmlFor='terms' className='cursor-pointer leading-snug'>
              Agree to the terms of use &amp; privacy policy.
            </label>
          </div>
        )}

        <div className='text-center text-sm text-text-muted pt-2'>
          {isSignup ? (
            <>
              Have an account?{' '}
              <button
                type='button'
                onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}
                className='text-accent font-medium hover:underline cursor-pointer'
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              No account?{' '}
              <button
                type='button'
                onClick={() => setCurrState("Sign up")}
                className='text-accent font-medium hover:underline cursor-pointer'
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage

'use client';
import React from 'react'
import { useFormState } from 'react-dom'
import { login } from '../services/actions/login';

const initialState = {
    message: null,
}
const LoginForm = () => {
    //const [state, formAction] = useFormState(login, initialState);
  return (
    <form onSubmit={login} className="flex flex-col">
    <input type="text" placeholder="Your Email" required name="email" />
    <input type="password" placeholder="Your Password" required name="password" />
    <button type="submit" className="border text-black">Login</button>
  </form>
  )
}

export default LoginForm
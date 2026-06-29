"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

const Button = () => {
  return (
    <div onClick={()=>signIn("google")}>Button</div>
  )
}

export default Button
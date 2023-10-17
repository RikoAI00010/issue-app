'use client'
import React from 'react'
import { useSession, signOut, signIn  } from 'next-auth/react'
import { Button } from '@radix-ui/themes'

const SigninPage = () => {
  return (
    <div>
      <input type="text" />
      <input type="text" />
      <Button onClick={() => signIn('credentials', {email: "jsmith@example.com",password: "password", callbackUrl: `${window.location.origin}` })}>LOGIN</Button>
    </div>
  )
}

export default SigninPage


// const res = 

'use client'
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { signIn  } from 'next-auth/react'
import { Button, Card, Inset, Text, Strong, TextField, Callout } from '@radix-ui/themes'
import Image from 'next/image'
import loginBG from '@/public/images/loginBG.jpg'
import { MdEmail, MdLock } from 'react-icons/md'
import {z} from 'zod'
import LangControl from '@/app/[locale]/[components]/langController'
import { useTranslations } from 'next-intl'


const SigninPage =  () => {
  const lf = useTranslations('LoginForm');
  const v = useTranslations('Validations');
  const router = useRouter()
  const [loginForm, setLoginForm] = useState({
    email: '',
    pass: ''
  })
  const [errors, setErrors] = useState<Array<any> | null>()

  const createIssueSchema = z.object({
    email: z.string().min(6).max(50).email("This is not a valid email."),
    pass: z.string().min(7).max(50),
})

const loginHandle = async () =>{
  const validation = createIssueSchema.safeParse(loginForm)
  if (!validation.success) {
    setErrors([v('form_fields_error')])    
    return
  } 
  const res = await signIn('credentials', {username: loginForm.email ,password: loginForm.pass, redirect: false })

  if (res?.ok) {
    setErrors(null)   
    router.refresh()
  } else {
    setErrors(['Brak konta'])   
  }
}


  return (
    <div className='flex w-[100vw] h-[100vh] flex-col justify-center items-center'>
      <div className='absolute top-0 right-2'>
        <LangControl/>
      </div>
     <div className='w-96'>
        <div className='h-20'>
          {errors &&       
          <Callout.Root className='w-full mb-4'>
            {errors.map(error =>{
              return <Callout.Text  key={error.code}>{error}</Callout.Text>
            })}
          </Callout.Root>}
        </div>
        <Card size="2" style={{height: 380 }}>
          <Inset clip="padding-box" side="top" pb="current">
            <Image
              src={loginBG}
              alt="Bold typography"
              width={380}
              height={380}
              style={{
                display: 'block',
                objectFit: 'cover',
                width: '100%',
                height: 140,
              }}
            />
          </Inset>
            <div className='flex flex-col justify-center mt-4'>
              <span className=' text-xl font-bold'>{lf('title')}</span>        
              <div className='flex flex-col gap-2 justify-center mt-4'>
              <TextField.Root>
                <TextField.Slot>
                <MdEmail height="16" width="16" />
                </TextField.Slot>
                <TextField.Input placeholder={`${lf('email')}...`}  onChange={e => setLoginForm({...loginForm, email: e.target.value})}/>
              </TextField.Root>

              <TextField.Root className='mb-3'>
                <TextField.Slot>
                <MdLock height="16" width="16" />
                </TextField.Slot>
                <TextField.Input placeholder={`${lf('pass')}...`}   type='password' onChange={e => setLoginForm({...loginForm, pass: e.target.value})}/>
              </TextField.Root>
                <Button size="3" onClick={loginHandle}>{lf('login_btn')}</Button>
              </div>
            </div>
        </Card>
     </div>
    </div>
  )
}

export default SigninPage


// const res = 

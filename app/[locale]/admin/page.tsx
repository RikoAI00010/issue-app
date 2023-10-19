
import React, { useRef, useState } from 'react'
import CreateAccountForm from './createAccountForm'
import CreateCompanyForm from './createCompanyForm'
import prisma from '@/prisma/client'


const AdministratorPage = async () => {
  const companies = await prisma.company.findMany()
  return (
    <div className='flex gap-4 flex-col w-full mt-20 items-center'>
      <div className='flex gap-4 flex-col p-4 '>
        <CreateAccountForm companies={companies}/>
        <CreateCompanyForm/>
      </div>
    </div>
  )
}

export default AdministratorPage

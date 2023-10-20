
import React, { useRef, useState } from 'react'
import CreateAccountForm from './createAccountForm'
import CreateCompanyForm from './createCompanyForm'
import prisma from '@/prisma/client'
import { useTranslations } from 'next-intl'

async function Profile() {
  const roles = await prisma.accountRole.findMany()
  const companies = await prisma.company.findMany()
  return <CreateAccountForm companies={companies} roles={roles}/>;
}

const AdministratorPage = () => {  
  return (
    <div className='flex gap-4 flex-col w-full mt-20 items-center'>
      <div className='flex gap-4 flex-col p-4 '>
        <Profile/>
        <CreateCompanyForm/>
      </div>
    </div>
  )
}

export default AdministratorPage

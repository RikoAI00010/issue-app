
import React, { useRef, useState } from 'react'
import CreateAccountForm from './createAccountForm'
import CreateCompanyForm from './createCompanyForm'
import prisma from '@/prisma/client'
import DataViewSelector from './dataViewSelector'

const AdministratorPage = async () => {  
  const roles = await prisma.accountRole.findMany()
  const users = await prisma.user.findMany({
    select:{
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      emailVerified: true,
      lastLogin: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      role: {
        select:{
          name: true
        }
      },
      company:{
        select:{
          name: true
        }
      }
    }
  })
  const companies = await prisma.company.findMany({
    select:{
      id: true,
      name: true,
      email: true,
      contact: true,
      contactPerson: true,
      isInternal: true,
      image: true,
      password: false
    }
  })
  const companiesFullData = await prisma.company.findMany()

  return (
    <div className='flex gap-4 flex-col w-full mt-20 items-center'>
      <div className='flex gap-4 flex-col p-4 items-start'>
        <CreateAccountForm companies={companies} roles={roles}/>
        <CreateCompanyForm/>
      </div>
        <DataViewSelector companies={companiesFullData} users={users}/>
    </div>
  )
}

export default AdministratorPage

'use client'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'

const AdministratorPage = () => {
    const postToEmployee = async () =>{
       const res = await axios.get('/api/administration/employee')
    }
  return (
    <div>
      admin
      <Button onClick={() => postToEmployee()}>GET EMLPOYEES</Button>
    </div>
  )
}

export default AdministratorPage

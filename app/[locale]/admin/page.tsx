'use client'
import { Avatar, Button, Dialog, DropdownMenu, TextField } from '@radix-ui/themes'
import React, { useRef, useState } from 'react'

import { MdDriveFileRenameOutline, MdEmail, MdLock } from 'react-icons/md'
import {AiFillCaretDown} from 'react-icons/ai'

const AdministratorPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const onButtonClick = () => {
    inputFile.current!.click();
  };

  const [myForm, setMyForm] = useState({
    prems: '',
    company: ''
  })


  const setPerms = (e: Event) =>{
    const target = e.target as HTMLDivElement
    setMyForm({...myForm, prems: target.textContent ?? 'unknown' })
  }
  const setComapny = (e: Event) =>{
    const target = e.target as HTMLDivElement
    setMyForm({...myForm, company: target.textContent ?? 'unknown' })
  }

  const companies = [
    {
      id: 1,
      name: 'Comp 1'
    },
    {
      id: 2,
      name: 'Comp 2'
    },
    {
      id: 3,
      name: 'Comp 3'
    },
    {
      id: 4,
      name: 'Comp 4'
    },
  ]

  const rolesForCompanyDropDown = [
    'Client', 'Employee'
  ]

  return (
    <div className='flex gap-4 flex-col w-full mt-20 items-center'>
      <div className='flex gap-4 flex-col p-4 '>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button>Account Creator</Button>
          </Dialog.Trigger>
          <Dialog.Content className='fixed w-fit'>
          <div className='flex flex-col gap-3 relative'>

          <Dialog.Title>Create an account</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Lorem ipsum dolor sit amet.
          </Dialog.Description>

            <TextField.Root>
              <TextField.Slot>
                <MdDriveFileRenameOutline height="16" width="16" />
              </TextField.Slot>
              <TextField.Input placeholder="First name..." />
            </TextField.Root>
            
            <TextField.Root>
              <TextField.Slot>
                <MdDriveFileRenameOutline height="16" width="16" />
              </TextField.Slot>
              <TextField.Input placeholder="Last name..." />
            </TextField.Root>

            <TextField.Root>
              <TextField.Slot>
                <MdEmail height="16" width="16" />
              </TextField.Slot>
              <TextField.Input placeholder="Email..."/>
            </TextField.Root>

            <TextField.Root>
              <TextField.Slot>
                <MdLock height="16" width="16" />
              </TextField.Slot>
              <TextField.Input placeholder="Password..." type='password' />
            </TextField.Root>
            
            <TextField.Root>
              <TextField.Slot>
                <MdLock height="16" width="16" />
              </TextField.Slot>
              <TextField.Input placeholder="Password repeat..." type='password' />
            </TextField.Root>

            <div className='absolute right-0'>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger >
                  <Button variant="soft" className=' w-40'>
                    {myForm.prems}
                    <AiFillCaretDown />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className=' w-40' onChange={(e) => console.log(e.target)}>
                  <DropdownMenu.Item onSelect={setPerms}>Administrator</DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={setPerms}>Client</DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={setPerms}>Employee</DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={setPerms}>Company</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>

            {rolesForCompanyDropDown.includes(myForm.prems)  && <DropdownMenu.Root>
                <DropdownMenu.Trigger >
                  <Button variant="soft" className=' w-40'>
                    {myForm.company}
                    <AiFillCaretDown />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className=' w-40' onChange={(e) => console.log(e.target)}>
                {companies.map(company =>{
                    return <DropdownMenu.Item key={company.id} onSelect={setComapny}>{company.name}</DropdownMenu.Item>
                  })}
                </DropdownMenu.Content>
              </DropdownMenu.Root>}

            <div className='flex justify-between mt-6'>
              <label>
                <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                <Button onClick={onButtonClick}>Add Avatar</Button>
              </label>
              <div className='flex gap-4'>
                <Button color='gray'>Cancel</Button>
                <Button >Save</Button>
              </div>
            </div>


          </div>
          </Dialog.Content>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger>
            <Button>Assing Manager</Button>
          </Dialog.Trigger>
          <Dialog.Content>
              ASSIGN EMPLOYEE
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  )
}

export default AdministratorPage

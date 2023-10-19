'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Avatar, Button, Dialog, DropdownMenu, TextField } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdEmail, MdLock } from 'react-icons/md'
import {AiFillCaretDown} from 'react-icons/ai'

const CreateCompanyForm = () => {
    const [myForm, setMyForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pass: '',
        prems: '',
        company: '',
        avatar: ''
    })

    const formSubbmit = () =>{

    }

    const inputFile = useRef<HTMLInputElement | null>(null);
    const onButtonClick = () => {
      inputFile.current!.click();
    };
      
    const setPerms = (e: Event) =>{
        const target = e.target as HTMLDivElement
        setMyForm({...myForm, prems: target.textContent ?? 'unknown' })
    }
    const setComapny = (e: Event) =>{
        const target = e.target as HTMLDivElement
        setMyForm({...myForm, company: target.textContent ?? 'unknown' })
    }

    const rolesForCompanyDropDown = [
        'Client', 'Employee'
    ]

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
  return (<>
    <Dialog.Root>
        <Dialog.Trigger>
        <Button>Company Creator</Button>
        </Dialog.Trigger>
        <Dialog.Content className='fixed w-fit'>
        <div className='flex flex-col gap-3 relative'>

        <Dialog.Title>Create company account</Dialog.Title>
        <Dialog.Description size="2" mb="4">
        Lorem ipsum dolor sit amet.
        </Dialog.Description>

        <TextField.Root>
            <TextField.Slot>
            <MdDriveFileRenameOutline height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Company name..." />
        </TextField.Root>
        
        <TextField.Root>
            <TextField.Slot>
            <MdDriveFileRenameOutline height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Contact email..." />
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdEmail height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Contact phone..."/>
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdEmail height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Contact person..."/>
        </TextField.Root>

            <div className='flex justify-between mt-6 relative'>
                <div className='absolute left-28 -top-1'>
                    <Avatar src={myForm.avatar} fallback='!'/>
                </div>
                <label>
                <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept='image/*' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e?.target?.files?.[0]) {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        reader.onloadend = () =>{
                            setMyForm({...myForm, avatar: reader.result as string})
                        }
                        reader.readAsDataURL(file)
                    }
                }}/>
                <Button onClick={onButtonClick}>Add Avatar</Button>
                </label>
                <div className='flex gap-4'>
                <Button color='gray'>Cancel</Button>
                <Button onClick={() => formSubbmit()}>Save</Button>
                </div>
            </div>
        </div>
        </Dialog.Content>
    </Dialog.Root>
    </>)
}

export default CreateCompanyForm

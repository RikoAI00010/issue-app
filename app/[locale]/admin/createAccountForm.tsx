'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Avatar, Button, Dialog, DropdownMenu, TextField } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdEmail, MdLock } from 'react-icons/md'
import {AiFillCaretDown} from 'react-icons/ai'
const CreateAccountForm = ({companies} : {companies: Array<any>}) => {

    const clientCompanies = companies.filter((el) => {
        return el.isInternal === false
    })
    const employeeCompanies = companies.filter((el) => {
        return el.isInternal === true
    })   
    
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
        switch (myForm.prems) {
            case 'Administrator':
                console.log(myForm);
                break;
            case 'Company':
                console.log('Company');
                break;
            case 'Client':
                console.log('Client');
                break;
            case 'Employee':
                console.log('Employee');
                break;
        
            default:
                break;
        }
    }

    const inputFile = useRef<HTMLInputElement | null>(null);
    const onButtonClick = () => {
      inputFile.current!.click();
    };
      
    const setPerms = (e: Event) =>{
        
        const target = e.target as HTMLDivElement
        setMyForm({...myForm, prems: target.textContent ?? 'unknown'  })
        if (target.textContent != myForm.prems) {
            setMyForm({...myForm, company: '', prems: target.textContent ?? 'unknown'  })
        }
    }
    const setComapny = (e: Event) =>{
        const target = e.target as HTMLDivElement
        setMyForm({...myForm, company: target.textContent ?? 'unknown' })
    }

    const rolesForCompanyDropDown = [
        'Client', 'Employee'
    ]

    const companiesList = myForm.prems == 'Client'? clientCompanies.map(company => { 
        return <DropdownMenu.Item key={company.id} onSelect={setComapny}>{company.name}</DropdownMenu.Item>}) : 
        employeeCompanies.map(company => { 
        return <DropdownMenu.Item key={company.id} onSelect={setComapny}>{company.name}</DropdownMenu.Item>})
        
  

  return (<>
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
                {myForm.prems ? myForm.prems : 'Role'}
                <AiFillCaretDown />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className=' w-40' >
                <DropdownMenu.Item onSelect={setPerms}>Administrator</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={setPerms}>Client</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={setPerms}>Employee</DropdownMenu.Item>
            </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>

        {rolesForCompanyDropDown.includes(myForm.prems)  && <DropdownMenu.Root>
            <DropdownMenu.Trigger >
                <Button variant="soft" className=' w-40'>
                {myForm.company ? myForm.company : 'Company'}
                <AiFillCaretDown />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className=' w-40' onChange={(e) => console.log(e.target)}>
                {companiesList}
            </DropdownMenu.Content>
            </DropdownMenu.Root>}
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

export default CreateAccountForm

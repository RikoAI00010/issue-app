'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Dialog, DropdownMenu, TextField } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdEmail, MdLock } from 'react-icons/md'
import {AiFillCaretDown} from 'react-icons/ai'
import axios from 'axios'


const CreateAccountForm = ({companies} : {companies: Array<any>}) => {

    const clientCompanies = companies.filter((el) => {
        return el.isInternal === false
    })
    const employeeCompanies = companies.filter((el) => {
        return el.isInternal === true
    })   

    const [uploadedImage, setUploadedImage] = useState<any>()
    const [formValid, setFormValid] = useState(false)
    
    const [myForm, setMyForm] = useState<AccountForm>({
        firstName: '',
        lastName: '',
        email: '',
        pass: '',
        role: '',
        company: '',
        avatar: null
    })

    useEffect(()=>{
        console.log(myForm);
        
    },[myForm])

    const udateAvatarData = async (file:File) =>{
        const data = new FormData()
    }

    const formSubbmit = async () =>{
        const formData = new FormData()
        formData.append('firstName', myForm.firstName)
        formData.append('lastName', myForm.lastName)
        formData.append('email', myForm.email)
        formData.append('pass', myForm.pass)
        formData.append('role', myForm.role)
        formData.append('company', myForm.company)        
        formData.append("myfile", myForm.avatar!)

        try {
            const res = await axios.post('/api/administration/user', formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }})

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        if (!Object.values(myForm).some(x => x === null || x === '')) {
            setFormValid(true)
        }
    }, [myForm])

    const inputFile = useRef<HTMLInputElement | null>(null);
    const onButtonClick = () => {
      inputFile.current!.click();
    };

    const roleSelector = (role:string) =>{
        switch (role) {
            case 'Admin':
                return 'ADMIN'
            case 'Client':
                return 'CLIENT'
            case 'Employee':
                return 'EMPLOYEE'       
            default:
                break;
        }
    }
      
    const setPerms = (e: Event) =>{
        const target = e.target as HTMLDivElement
        setMyForm({...myForm, role: roleSelector(target.textContent!) ?? 'unknown'  })
        if (target.textContent != myForm.role) {
            setMyForm({...myForm, company: '', role: roleSelector(target.textContent!) ?? 'unknown'  })
        }
        if (target.textContent == 'Admin') {
            setMyForm({...myForm, company: '1', role: roleSelector(target.textContent!) ?? 'unknown'  })
        }
    }
    const setComapny = (id: number) =>{
        setMyForm({...myForm, company: id.toString() ?? null })
    }

    const rolesForCompanyDropDown = [
        'Client', 'Employee'
    ]

    const companiesList = myForm.role == 'Client'? clientCompanies.map(company => { 
        return <DropdownMenu.Item key={company.id} onSelect={() =>setComapny(company.id)}>{company.name}</DropdownMenu.Item>}) : 
        employeeCompanies.map(company => { 
        return <DropdownMenu.Item key={company.id} onSelect={() =>setComapny(company.id)}>{company.name}</DropdownMenu.Item>})
        


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
            <TextField.Input placeholder="First name..." onChange={e => setMyForm({...myForm, firstName: e.target.value})}/>
        </TextField.Root>
        
        <TextField.Root>
            <TextField.Slot>
            <MdDriveFileRenameOutline height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Last name..." onChange={e => setMyForm({...myForm, lastName: e.target.value})}/>
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdEmail height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Email..." onChange={e => setMyForm({...myForm, email: e.target.value})}/>
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdLock height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Password..." type='password' onChange={e => setMyForm({...myForm, pass: e.target.value})}/>
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
                {myForm.role ? myForm.role : 'Role'}
                <AiFillCaretDown />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className=' w-40' >
                <DropdownMenu.Item onSelect={setPerms}>Admin</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={setPerms}>Client</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={setPerms}>Employee</DropdownMenu.Item>
            </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>

        {rolesForCompanyDropDown.includes(myForm.role)  && <DropdownMenu.Root>
            <DropdownMenu.Trigger >
                <Button variant="soft" className=' w-40'>
                {myForm.company ? myForm.company : 'Company'}
                <AiFillCaretDown />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className=' w-40'>
                {companiesList}
            </DropdownMenu.Content>
            </DropdownMenu.Root>}
            <div className='flex justify-between mt-6 relative'>
                <div className='absolute left-28 -top-1'>
                    <Avatar src={uploadedImage} fallback='!'/>
                </div>
                <label>
                <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept='image/*' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e?.target?.files?.[0]) {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        reader.onloadend = () =>{
                            udateAvatarData(e?.target?.files?.[0]!)
                            setUploadedImage(reader.result as string)
                            setMyForm({...myForm, avatar: e?.target?.files?.[0]!})
                        }
                        reader.readAsDataURL(file)
                    }
                }}/>
                <Button onClick={onButtonClick}>Add Avatar</Button>
                </label>
                <div className='flex gap-4'>
                <Button color='gray'>Cancel</Button>
                <Button onClick={() => formSubbmit()} >Save</Button>
                {/* disabled={!formValid} */}
                </div>
            </div>
        </div>
        </Dialog.Content>
    </Dialog.Root>
    </>)
}

export default CreateAccountForm

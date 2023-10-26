'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Dialog, DropdownMenu, TextField } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdEmail, MdLock } from 'react-icons/md'
import {AiFillCaretDown} from 'react-icons/ai'
import axios from 'axios'
import { Company, AccountRole, User } from '@prisma/client'
import {useTranslations} from 'next-intl';


const CreateAccountForm = ({companies, roles} : {companies: Array<any>, roles: Array<AccountRole>}) => {   
    const t = useTranslations('AccountForm');
    const r = useTranslations('Interface');
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
        roleName: '',
        roleId: 0,
        companyId: 0,
        companyName: '',
        avatar: null
    })

    const closeModal = useRef<HTMLButtonElement | null>(null);
    const formSubbmit = async () =>{
        const formData = new FormData()
        formData.append('firstName', myForm.firstName)
        formData.append('lastName', myForm.lastName)
        formData.append('email', myForm.email)
        formData.append('pass', myForm.pass)
        formData.append('roleId', myForm.roleId.toString()) 
        formData.append('companyId', myForm.companyId.toString())        
        formData.append("myfile", myForm.avatar!)
       
        try {           
            const res = await axios.post('/api/administration/user', formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })  
            if (res.status === 201) {
                closeModal.current!.click();
            }          
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
        if (!Object.values(myForm).some(x => x === null || x === '')) {
            myForm.companyId != 0? setFormValid(true) : setFormValid(false)
        }
    }, [myForm])

    const inputFile = useRef<HTMLInputElement | null>(null);
    const onButtonClick = () => {
      inputFile.current!.click();
    };

    const setPerms = (selectedRole: AccountRole) =>{
        setMyForm({...myForm, roleName: selectedRole.name, roleId: selectedRole.id})

        if (selectedRole.name != myForm.roleName) {
            setMyForm({...myForm, companyName: t('company'),  roleId: selectedRole.id, roleName: selectedRole.name, companyId: 0 })
        }

        if (selectedRole.name == 'Admin') {
            setMyForm({...myForm, companyName: '',  roleId: 1, roleName: selectedRole.name })
        }
    }
    const setComapny = (company: Company) =>{
        setMyForm({...myForm, companyId: company.id, companyName: company.name })
    }

    const rolesForcompanyIdDropDown = [
        'Client', 'Employee'
    ]


    const companiesList = myForm.roleName == 'Client'? clientCompanies.map(company => { 
        return <DropdownMenu.Item key={company.id} onSelect={() =>setComapny(company)} textValue={company.name}>{company.name}</DropdownMenu.Item>}) : 
        employeeCompanies.map(company => { 
        return <DropdownMenu.Item key={company.id} onSelect={() =>setComapny(company)} textValue={company.name}>{company.name}</DropdownMenu.Item>})
        
    const rolesList = roles.map(role =>{
        return <DropdownMenu.Item key={role.id} onSelect={() => setPerms(role)} textValue={role.name}>{role.name}</DropdownMenu.Item>
    })

  return (<>
    <Dialog.Root>
        <Dialog.Trigger>
        <Button>{t('title')}</Button>
        </Dialog.Trigger>
        <Dialog.Content className='fixed w-fit'>
        <div className='flex flex-col gap-3 relative'>

        <Dialog.Title>{t('title')}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
            {t('description')}
        </Dialog.Description>

        <TextField.Root>
            <TextField.Slot>
            <MdDriveFileRenameOutline height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('first_name')}...`} onChange={e => setMyForm({...myForm, firstName: e.target.value})}/>
        </TextField.Root>
        
        <TextField.Root>
            <TextField.Slot>
            <MdDriveFileRenameOutline height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('last_name')}...`} onChange={e => setMyForm({...myForm, lastName: e.target.value})}/>
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdEmail height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('email')}...`} onChange={e => setMyForm({...myForm, email: e.target.value})}/>
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdLock height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('pass')}...`} type='password' onChange={e => setMyForm({...myForm, pass: e.target.value})}/>
        </TextField.Root>
        
        <TextField.Root>
            <TextField.Slot>
            <MdLock height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('pass_rep')}...`} type='password' />
        </TextField.Root>

        <div className='absolute right-0'>
            <DropdownMenu.Root>
            <DropdownMenu.Trigger >
                <Button variant="soft" className=' w-40'>
                {myForm.roleName ? myForm.roleName : 'Role'}
                <AiFillCaretDown />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className=' w-40' >
                {rolesList}
            </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>

        {rolesForcompanyIdDropDown.includes(myForm.roleName)  && <DropdownMenu.Root>
            <DropdownMenu.Trigger >
                <Button variant="soft" className=' w-40'>
                {myForm.companyName ? myForm.companyName : t('company')}
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
                            setUploadedImage(reader.result as string)
                            setMyForm({...myForm, avatar: e?.target?.files?.[0]!})
                        }
                        reader.readAsDataURL(file)
                    }
                }}/>
                <Button onClick={onButtonClick}>{t('avatar_btn')}</Button>
                </label>
                <div className='flex gap-4'>
                <Button color='gray'>{r('cancel')}</Button>
                <Button onClick={() => formSubbmit()} disabled={!formValid}>{r('save')}</Button>
                </div>
            </div>
        </div>
        </Dialog.Content>
    </Dialog.Root>
    </>)
}

export default CreateAccountForm

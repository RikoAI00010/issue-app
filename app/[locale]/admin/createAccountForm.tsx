'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Dialog, DropdownMenu, TextField } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdEmail, MdLock } from 'react-icons/md'
import {AiFillCaretDown} from 'react-icons/ai'
import axios from 'axios'
import { Company, AccountRole, User } from '@prisma/client'
import {useTranslations} from 'next-intl';


const CreateAccountForm = ({companies, roles} : {companies: Array<Company>, roles: Array<AccountRole>}) => {
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
        roleId: '',
        companyId: '',
        companyName: '',
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
        formData.append('roleId', myForm.roleId) 
        formData.append('companyIdId', myForm.companyId)        
        formData.append("myfile", myForm.avatar!)
        console.log(myForm);
        

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
        console.log(myForm);
        
    }, [myForm])

    const inputFile = useRef<HTMLInputElement | null>(null);
    const onButtonClick = () => {
      inputFile.current!.click();
    };

    const roleSelector = (roleId:string) =>{
        const filteredRole = roles.filter(x => x.name == roleId)
        return filteredRole[0].id.toString()
    }
      
    const setPerms = (e: Event) =>{
        const target = e.target as HTMLDivElement
        setMyForm({...myForm, roleId: roleSelector(target.textContent!) ?? 'unknown'  })
        if (target.textContent != myForm.roleId) {
            setMyForm({...myForm, companyId: '',companyName: '',  roleId: roleSelector(target.textContent!) ?? 'unknown'  })
        }
        if (target.textContent == 'Admin') {
            setMyForm({...myForm, companyId: 'SERWIS', roleId: roleSelector(target.textContent!) ?? 'unknown'  })
        }
    }
    const setComapny = (id: number) =>{
        setMyForm({...myForm, companyId: id.toString() ?? null })
    }

    const rolesForcompanyIdDropDown = [
        'CLIENT', 'EMPLOYEE'
    ]

    const companiesList = clientCompanies.map(companyId => { 
        return <DropdownMenu.Item key={companyId.id} onSelect={() =>setComapny(companyId.id)}>{companyId.name}</DropdownMenu.Item>})
        
    const rolesList = roles.map(roleId =>{
        return <DropdownMenu.Item key={roleId.id} onSelect={setPerms}>{roleId.name}</DropdownMenu.Item>
    })

    // const companiesList = myForm.roleId == '1'? clientCompanies.map(companyId => { 
    //     return <DropdownMenu.Item key={companyId.id} onSelect={() =>setComapny(companyId.id)}>{companyId.name}</DropdownMenu.Item>}) : 
    //     employeeCompanies.map(companyId => { 
    //     return <DropdownMenu.Item key={companyId.id} onSelect={() =>setComapny(companyId.id)}>{companyId.name}</DropdownMenu.Item>})
        
    // const rolesList = roles.map(roleId =>{
    //     return <DropdownMenu.Item key={roleId.id} onSelect={setPerms}>{roleId.name}</DropdownMenu.Item>
    // })

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
                {myForm.roleId ? myForm.roleId : 'Role'}
                <AiFillCaretDown />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className=' w-40' >
                {rolesList}
            </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>

        {rolesForcompanyIdDropDown.includes(myForm.roleId)  && <DropdownMenu.Root>
            <DropdownMenu.Trigger >
                <Button variant="soft" className=' w-40'>
                {myForm.companyId ? myForm.companyId : t('companyId')}
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
                <Button onClick={onButtonClick}>{t('avatar_btn')}</Button>
                </label>
                <div className='flex gap-4'>
                <Button color='gray'>{r('cancel')}</Button>
                <Button onClick={() => formSubbmit()} >{r('save')}</Button>
                {/* disabled={!formValid} */}
                </div>
            </div>
        </div>
        </Dialog.Content>
    </Dialog.Root>
    </>)
}

export default CreateAccountForm

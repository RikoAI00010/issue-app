'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Dialog, DropdownMenu, TextField } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdEmail, MdLock, MdPhoneEnabled, MdPerson2 } from 'react-icons/md'
import { useTranslations } from 'next-intl'
import axios from 'axios'
import { Company } from '@prisma/client'

const CreateCompanyForm = () => {
    const t = useTranslations('CompanyForm');
    const r = useTranslations('Interface');

    const [uploadedImage, setUploadedImage] = useState<any>()
    const [formValid, setFormValid] = useState(false)
    
    const [myForm, setMyForm] = useState<any>({
        name: '',
        email: '',
        password: '',
        contact: '',
        contactPerson: '',
        isInternal: false,
        image: null
    })

    useEffect(()=>{
        console.log(myForm);
    },[myForm])


    const formSubbmit = async () =>{
        const formData = new FormData()
        formData.append('name', myForm.name)
        formData.append('email', myForm.email)
        formData.append('contact', myForm.contact)
        formData.append('contactPerson', myForm.contactPerson)     
        formData.append("password", myForm.password)
        formData.append("isInternal", myForm.isInternal) 
        formData.append("image", myForm.image!)
       
        try {           
            const res = await axios.post('/api/administration/company', formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })  
            console.log(res);
                      
        } catch (error) {
            console.log(error);
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
            <TextField.Input placeholder={`${t('company_name')}...`} onChange={e => setMyForm({...myForm, name: e.target.value})}/>
        </TextField.Root>
        
        <TextField.Root>
            <TextField.Slot>
            <MdDriveFileRenameOutline height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('company_email')}...`} onChange={e => setMyForm({...myForm, email: e.target.value})}/>
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdPhoneEnabled height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('company_phone')}...`} onChange={e => setMyForm({...myForm, contact: e.target.value})}/>
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdPerson2 height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('company_person')}...`} onChange={e => setMyForm({...myForm, contactPerson: e.target.value})}/>
        </TextField.Root>

        <TextField.Root>
            <TextField.Slot>
            <MdLock height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('pass')}...`} type='password' onChange={e => setMyForm({...myForm, password: e.target.value})}/>
        </TextField.Root>
        
        <TextField.Root>
            <TextField.Slot>
            <MdLock height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('pass_rep')}...`} type='password' />
        </TextField.Root>

        <div className='flex justify-between mt-6 relative'>
                <div className='absolute left-36 -top-1'>
                    <Avatar src={uploadedImage} fallback='!'/>
                </div>
                <label>
                <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept='image/*' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e?.target?.files?.[0]) {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        reader.onloadend = () =>{
                            setUploadedImage(reader.result as string)
                            setMyForm({...myForm, image: e?.target?.files?.[0]!})
                        }
                        reader.readAsDataURL(file)
                    }
                }}/>
                <Button onClick={onButtonClick}>{t('image_btn')}</Button>
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

export default CreateCompanyForm

'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { Avatar, Button, Dialog, Checkbox, Flex, Text, TextField } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdEmail, MdLock, MdPhoneEnabled, MdPerson2 } from 'react-icons/md'
import { createCompanySchema } from '@/app/validations/forms'
import { useForm } from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

type CreateCompanyForm = z.infer<typeof createCompanySchema>

const CreateCompanyForm = () => {
    const t = useTranslations('CompanyForm');
    const r = useTranslations('Interface');
    const v = useTranslations('Validations');

    const [uploadedImage, setUploadedImage] = useState<any>()

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<CreateCompanyForm>({
        resolver: zodResolver(createCompanySchema)
    })
    
    const onFormSubmit = async (data:any) =>{
        console.log(data);
        console.log(data.image[0]);
        try {           
            const res = await axios.post('/api/administration/company', data, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })  
           
            if (res.status === 201) {
                closeModal.current!.click();
            }     
        } catch (error) {
            console.log(error);
        }
    }

    const closeModal = useRef<HTMLButtonElement | null>(null);
    const onButtonClick = () => {
        document.getElementById('file')!.click()
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
            <TextField.Input placeholder={`${t('company_name')}...`} {...register('name')}/>
        </TextField.Root>
        {errors.name && <Text color='red'>{v(errors.name.message)}</Text>}
        
        <TextField.Root>
            <TextField.Slot>
            <MdDriveFileRenameOutline height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('company_email')}...`} {...register('email')}/>
        </TextField.Root>
        {errors.email && <Text color='red'>{v(errors.email.message)}</Text>}

        <TextField.Root>
            <TextField.Slot>
            <MdPhoneEnabled height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('company_phone')}...`} {...register('contact')}/>
        </TextField.Root>
        {errors.contact && <Text color='red'>{v(errors.contact.message)}</Text>}

        <TextField.Root>
            <TextField.Slot>
            <MdPerson2 height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('company_person')}...`} {...register('contactPerson')}/>
        </TextField.Root>
        {errors.contactPerson && <Text color='red'>{v(errors.contactPerson.message)}</Text>}

        <TextField.Root>
            <TextField.Slot>
            <MdLock height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('pass')}...`} type='password' {...register('password')}/>
        </TextField.Root>
        {errors.password && <Text color='red'>{v(errors.password.message)}</Text>}
        
        <TextField.Root>
            <TextField.Slot>
            <MdLock height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder={`${t('pass_rep')}...`} type='password' />
        </TextField.Root>
        {errors.password && <Text color='red'>{v(errors.password.message)}</Text>}

        <Text as="label" size="2">
        <Flex gap="2">
            <Checkbox defaultChecked {...register('isInternal')}/> {t('inner_company')}
        </Flex>
        </Text>

        <div className='flex justify-between mt-6 relative'>
                <div className='absolute left-36 -top-1'>
                    <Avatar src={uploadedImage} fallback='!'/>
                </div>
                <label>
                <input type='file' id='file' {...register('image')}  style={{display: 'none'}} accept='image/*' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e?.target?.files?.[0]) {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        reader.onloadend = () =>{
                            setUploadedImage(reader.result as string)
                        }
                        reader.readAsDataURL(file)
                    }
                }}/>
                <Button onClick={onButtonClick}>{t('image_btn')}</Button>
                </label>
                <div className='flex gap-4'>
                <Button color='gray'>{r('cancel')}</Button>
                <Button onClick={handleSubmit(onFormSubmit)} >{r('save')}</Button>
                <Dialog.Close ref={closeModal}>
                </Dialog.Close>
                </div>
            </div>
        </div>
        {errors.image && <Text color='red'>{v(errors.image.message)}</Text>}
        </Dialog.Content>
    </Dialog.Root>
    </>)
}

export default CreateCompanyForm




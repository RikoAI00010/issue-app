'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { Avatar, Button, Dialog, Checkbox, Flex, Text } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdLock, MdPhoneEnabled, MdPerson2, MdMail } from 'react-icons/md'
import { createCompanySchema } from '@/app/validations/forms'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import ErrorLabel from '../[components]/formElements/errorLabel'
import FormTextField from '../[components]/formElements/formTextField'

type CreateCompanyForm = z.infer<typeof createCompanySchema>

const CreateCompanyForm = () => {
    const [uploadedImage, setUploadedImage] = useState<any>()
    const [dialogOpen, setDialogOpen] = useState(false)

    const onInvalid = (errors:any) => console.error(errors)

    const t = useTranslations('CompanyForm');
    const r = useTranslations('Interface');

    const { register, handleSubmit, reset, control, formState: { errors, isValid } } = useForm<CreateCompanyForm>({
        resolver: zodResolver(createCompanySchema),
        defaultValues:{
            name: '',
            password: '',
            email: '',
            contact: '',
            contactPerson: '',
            isInternal: false,
            image: null
        }
    })

    const cancelForm = () =>{
        setDialogOpen(false)
        setUploadedImage([])
        reset()
    }

    const onFormSubmit = async (data:any) =>{        
        try {           
            const res = await axios.post('/api/administration/company', data, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })              
           
            if (res.status === 201) {
                setDialogOpen(false)
                setUploadedImage([])
                reset()
            }     
        } catch (error) {
            console.error(error);
        }
    }

    return (<>
        <Dialog.Root open={dialogOpen}>
            <Dialog.Trigger>
            <Button onClick={() => setDialogOpen(true)}>{t('title')}</Button>
            </Dialog.Trigger>
            <Dialog.Content className='fixed w-fit'>
            <div className='flex flex-col gap-3 relative'>

            <Dialog.Title>{t('title')}</Dialog.Title>
            <Dialog.Description size="2" mb="4">
            {t('description')}
            </Dialog.Description>

            <FormTextField
                icon={<MdDriveFileRenameOutline height="16" width="16" />}
                placeholder={`${t('company_name')}...`}
                regFunc={register('name')}
                error={<ErrorLabel error={errors.name}/>}
            />

            <FormTextField
                icon={<MdMail height="16" width="16" />}
                placeholder={`${t('company_email')}...`}
                regFunc={register('email')}
                error={<ErrorLabel error={errors.email}/>}
            />

            <FormTextField
                icon={<MdPhoneEnabled height="16" width="16" />}
                placeholder={`${t('company_phone')}...`}
                regFunc={register('contact')}
                error={<ErrorLabel error={errors.contact}/>}
            />

            <FormTextField
                icon={<MdPerson2 height="16" width="16" />}
                placeholder={`${t('company_person')}...`}
                regFunc={register('contactPerson')}
                error={<ErrorLabel error={errors.contactPerson}/>}
            />

            <FormTextField
                icon={<MdLock height="16" width="16" />}
                placeholder={`${t('pass')}...`}
                regFunc={register('password')}
                error={<ErrorLabel error={errors.password}/>}
                type='password'
            />

            <FormTextField
                icon = {<MdLock height="16" width="16" />}
                placeholder = {`${t('pass_rep')}...`}
                regFunc = {register('password')}
                error = {<ErrorLabel error={errors.password}/>}
                type = 'password'
            />

            <Text as="label" size="2">
                <Flex gap="2">
                <Controller
                    name="isInternal" 
                    control={control}
                    render={({ field }) => (
                        <Checkbox 
                            value={undefined}
                            onCheckedChange={field.onChange}
                        />
                    )}>
                </Controller>
                </Flex>
            </Text>

            <div className='flex justify-between mt-6 relative'>
                <div className='absolute left-36 -top-1'>
                    <Avatar src={uploadedImage} fallback='!'/>
                </div>
                <label>
                    <Button className='absolute left-0'>{t('image_btn')}</Button>
                    <input 
                        className='opacity-0  '
                        type='file' 
                        id='file' 
                        {...register('image')}                         
                        accept='image/*' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        
                        if (e?.target?.files?.[0]) {
                            const file = e.target.files[0]                       
                            const reader = new FileReader()
                            reader.onloadend = () =>{
                                setUploadedImage(reader.result)
                            }
                            reader.readAsDataURL(file)
                        }
                    }}/>
                    
                </label>
                <div className='flex gap-4'>
                    <Button onClick={cancelForm} color='gray'>{r('cancel')}</Button>
                    <Button onClick={handleSubmit(onFormSubmit,onInvalid)}>{r('save')}</Button>
                </div>
                </div>
            </div>
            <ErrorLabel error={errors.image}/>
            </Dialog.Content>
        </Dialog.Root>
    </>)
}

export default CreateCompanyForm




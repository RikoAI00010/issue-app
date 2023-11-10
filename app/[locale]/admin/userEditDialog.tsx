'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { Avatar, Button, Dialog, Checkbox, Flex, Text } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdLock, MdPhoneEnabled, MdPerson2, MdMail } from 'react-icons/md'
import { updateUserSchema } from '@/app/validations/forms'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import ErrorLabel from '../[components]/formElements/errorLabel'
import FormTextField from '../[components]/formElements/formTextField'

type UpdateUserForm = z.infer<typeof updateUserSchema>

const UserEditDialog = (
    {
        isOpen,
        modalData,
        closeModalHandler
    } : any
    ) => {
    const [uploadedImage, setUploadedImage] = useState<any>()
    const [userData, setUserData] = useState(modalData)

    useEffect(() =>{
        console.log(modalData);    

    }, [modalData])

    const onInvalid = (errors:any) => console.error(errors)

    const t = useTranslations('CompanyForm');
    const r = useTranslations('Interface');   

    const preloadValuse = {
        id: userData?.id,
        firstName: userData.firstname,
        lastName: userData.lastName,
        password: userData?.password,
        email: userData?.email,
        role: userData?.role?.name,
        company: userData?.company?.name,
        image: userData?.image
    }

    const { register, handleSubmit, reset, setValue, control, formState: { errors, isValid } } = useForm<UpdateUserForm>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: preloadValuse
    })

    const cancelForm = () =>{
        closeModalHandler('close')
        setUploadedImage([])
        reset()
    }

    const onFormSubmit = async (data:any) =>{     
        console.log(data);
           
        // try {           
        //     const res = await axios.patch('/api/administration/company', data, {
        //         headers: {
        //             "content-type": "multipart/form-data"
        //         }
        //     })              
           
        //     if (res.status === 201) {
        //         closeModalHandler('close')
        //         setUploadedImage([])
        //         reset()
        //     }     
        // } catch (error) {
        //     console.error(error);
        // }
    }

    return (<>
        <Dialog.Root open={isOpen}>
            <Dialog.Content className='fixed w-fit'>
            <div className='flex flex-col gap-3 relative'>

            <Dialog.Title>EDYCJA FIRMY</Dialog.Title>
            <Dialog.Description size="2" mb="4">
            {t('edit_description')}
            </Dialog.Description>

            <Text className='absolute right-2 font-semibold'>ID: {modalData.id}</Text>

            <FormTextField
                icon={<MdDriveFileRenameOutline height="16" width="16" />}
                placeholder='Firstname'
                regFunc={register('firstName')}
                error={<ErrorLabel error={errors.firstName}/>}
            />

            <FormTextField
                icon={<MdPhoneEnabled height="16" width="16" />}
                placeholder={modalData.lastName}
                regFunc={register('lastName')}
                error={<ErrorLabel error={errors.lastName}/>}
            />

            <FormTextField
                icon={<MdMail height="16" width="16" />}
                placeholder={modalData.email}
                regFunc={register('email')}
                error={<ErrorLabel error={errors.email}/>}
            />


            <FormTextField
                icon={<MdPerson2 height="16" width="16" />}
                placeholder={modalData.contactPerson}
                regFunc={register('company')}
                error={<ErrorLabel error={errors.company}/>}
            />

            <FormTextField
                icon={<MdLock height="16" width="16" />}
                placeholder={modalData.password}
                regFunc={register('password')}
                error={<ErrorLabel error={errors.password}/>}
                type='password'
            />

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

export default UserEditDialog




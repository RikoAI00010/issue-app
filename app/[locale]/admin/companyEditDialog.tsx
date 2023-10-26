'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { Avatar, Button, Dialog, Checkbox, Flex, Text } from '@radix-ui/themes'
import { MdDriveFileRenameOutline, MdLock, MdPhoneEnabled, MdPerson2, MdMail } from 'react-icons/md'
import { updateCompanySchema } from '@/app/validations/forms'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import ErrorLabel from '../[components]/formElements/errorLabel'
import FormTextField from '../[components]/formElements/formTextField'

type CreateCompanyForm = z.infer<typeof updateCompanySchema>

const CreateCompanyForm = (
    {
        isOpen,
        modalData,
        closeModalHandler
    } : any
    ) => {
    const [uploadedImage, setUploadedImage] = useState<any>()
    const [dialogOpen, setDialogOpen] = useState(isOpen)
    const [companyData, setCompanyData] = useState(modalData)

    useEffect(() =>{
        setDialogOpen(isOpen)
        reset({
            ...modalData
        });
        console.log(isOpen);    
    }, [isOpen])

    useEffect(() =>{
        console.log(modalData);    
    }, [modalData])

    const onInvalid = (errors:any) => console.error(errors)

    const t = useTranslations('CompanyForm');
    const r = useTranslations('Interface');

    const preloadValuse = {
        id: companyData.id,
        name: companyData.name,
        password: companyData.password,
        email: companyData.email ,
        contact: companyData.contact,
        contactPerson: companyData.contactPerson,
        isInternal: companyData.isInternal,
        image: companyData.image
    }

    const { register, handleSubmit, reset, setValue, control, formState: { errors, isValid } } = useForm<CreateCompanyForm>({
        resolver: zodResolver(updateCompanySchema),
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
        <Dialog.Root open={dialogOpen}>
            <Dialog.Content className='fixed w-fit'>
            <div className='flex flex-col gap-3 relative'>

            <Dialog.Title>EDYCJA FIRMY</Dialog.Title>
            <Dialog.Description size="2" mb="4">
            {t('edit_description')}
            </Dialog.Description>

            <FormTextField
                icon={<MdDriveFileRenameOutline height="16" width="16" />}
                placeholder={modalData.name}
                regFunc={register('name')}
                error={<ErrorLabel error={errors.name}/>}
            />

            <FormTextField
                icon={<MdMail height="16" width="16" />}
                placeholder={modalData.email}
                regFunc={register('email')}
                error={<ErrorLabel error={errors.email}/>}
            />

            <FormTextField
                icon={<MdPhoneEnabled height="16" width="16" />}
                placeholder={modalData.contact}
                regFunc={register('contact')}
                error={<ErrorLabel error={errors.contact}/>}
            />

            <FormTextField
                icon={<MdPerson2 height="16" width="16" />}
                placeholder={modalData.contactPerson}
                regFunc={register('contactPerson')}
                error={<ErrorLabel error={errors.contactPerson}/>}
            />

            <FormTextField
                icon={<MdLock height="16" width="16" />}
                placeholder={modalData.contactPerson}
                regFunc={register('password')}
                error={<ErrorLabel error={errors.password}/>}
                type='password'
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
                <Text>{t('inner_company')}</Text>
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




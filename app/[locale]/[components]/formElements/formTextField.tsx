import React, { ReactNode } from 'react'
import { TextField } from '@radix-ui/themes'

interface FormTextField {
    icon: ReactNode
    placeholder: string
    regFunc: any
    error: ReactNode,
    type?: string,
    textValue?: string,
    setValue?: any
}

const FormTextField = ({icon, placeholder, regFunc, error, type='text', setValue}: FormTextField) => {
  const disableField = (modalForm: string) =>{
    switch (modalForm) {
      case 'VIEW':
        return true
      default:
        return false
    }
  }



  return (
    <div>
    <TextField.Root>
        <TextField.Slot>
            {icon}
        </TextField.Slot>
        <TextField.Input type={type} placeholder={placeholder} {...regFunc} disabled={disableField} {...setValue}  />
    </TextField.Root>
    {error}
    </div>
  )
}

export default FormTextField

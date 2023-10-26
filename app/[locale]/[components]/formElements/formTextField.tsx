import React, { ReactNode } from 'react'
import { TextField } from '@radix-ui/themes'

interface FormTextField {
    icon: ReactNode
    placeholder: string
    regFunc: any
    error: ReactNode,
    type?: string
}

const FormTextField = ({icon, placeholder, regFunc, error, type='text'}: FormTextField) => {
  return (
    <div>
    <TextField.Root>
        <TextField.Slot>
            {icon}
        </TextField.Slot>
        <TextField.Input type={type} placeholder={placeholder} {...regFunc}/>
    </TextField.Root>
    {error}
    </div>
  )
}

export default FormTextField

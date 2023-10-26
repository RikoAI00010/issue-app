import React, { ReactNode, useState } from 'react'
import { Text, Checkbox, Flex } from '@radix-ui/themes'

interface FormCheckboxField {
    regFunc: any
    label?: string
}

const FormCheckboxField = ({regFunc, label}: FormCheckboxField) => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div>
        <Text as="label" size="2">
        <Flex gap="2">
            <Checkbox ref={regFunc}/> {label}
        </Flex>
        </Text>
    </div>
  )
}

export default FormCheckboxField

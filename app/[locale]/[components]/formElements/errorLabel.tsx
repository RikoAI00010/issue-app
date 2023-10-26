import React from 'react'
import { Text } from '@radix-ui/themes'
import { useTranslations } from 'next-intl';

const ErrorLabel = ({error} :any) => {
  const t = useTranslations('Validations');
  return (
    <Text>
      {error && <Text color='red' size={'2'}>{t(error.message)}</Text>}
    </Text>
  )
}

export default ErrorLabel

'use client'
import React from 'react'
import { Box, Tabs, Text } from '@radix-ui/themes'
import CompanyList from '../[components]/lists/companies'

const DataViewSelector = ({companies}:any) => {
  return (
    <div className='w-[90%]'>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
            <Tabs.Trigger value="users">Users</Tabs.Trigger>
            <Tabs.Trigger value="companies">Companies</Tabs.Trigger>
            <Tabs.Trigger value="inner_units">Inner unit</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
            <Tabs.Content value="users">
            <Text size="2">Users list.</Text>
            </Tabs.Content>

            <Tabs.Content value="companies">
                <CompanyList companies={companies}/>
            </Tabs.Content>

            <Tabs.Content value="inner_units">
            <Text size="2">Inner units list.</Text>
            </Tabs.Content>
        </Box>
        </Tabs.Root>
    </div>
  )
}

export default DataViewSelector

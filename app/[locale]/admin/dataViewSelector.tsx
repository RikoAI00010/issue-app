'use client'
import React from 'react'
import { Box, Tabs, Text } from '@radix-ui/themes'
import CompanyList from '../[components]/lists/companies'
import { Company } from '@prisma/client'
import UsersLlist from '../[components]/lists/users'

const DataViewSelector = ({companies, users}:any) => {
  const internalCompanies = companies.filter((x:Company) => x.isInternal === true)
  const externalcompanies = companies.filter((x:Company) => x.isInternal !== true)
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
              <UsersLlist users={users}/>
            </Tabs.Content>

            <Tabs.Content value="companies">
                <CompanyList companies={externalcompanies}/>
            </Tabs.Content>

            <Tabs.Content value="inner_units">
              <CompanyList companies={internalCompanies}/>
            </Tabs.Content>
        </Box>
        </Tabs.Root>
    </div>
  )
}

export default DataViewSelector

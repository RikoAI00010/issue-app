import { Table } from '@radix-ui/themes'
import React from 'react'
import NewTicket from './createNew'
import prisma from '@/prisma/client'

const TicketsPage = async () => {
  const issues = await prisma.issue.findMany()
  console.log(issues);
  
  const tickets = [
    {
      id: 28031,
      registerBy: 'Danilo Sousa',
      title: 'Creating new user',
      createdAt: '10.11.2023',
      status: 'NEW'
    },
    {
      id: 28032,
      registerBy: 'Zahra Ambessa',
      title: 'Creating new user',
      createdAt: '08.11.2023',
      status: 'NEW'
    },
    {
      id: 28033,
      registerBy: 'Jasper Eriksson',
      title: 'Creating new user',
      createdAt: '05.11.2023',
      status: 'NEW'
    },
  ]
  return (
    <div className='w-full p-9'>
      <div className='h-40'>
        <NewTicket/>
      </div>
      <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Ticket ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Sender</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Topic</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Register Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((ticket:any) =>{
          return (
            <Table.Row key={ticket.id}>
              <Table.Cell>{ticket.id}</Table.Cell>
              <Table.Cell>{ticket.registerBy}</Table.Cell>
              <Table.Cell>{ticket.title}</Table.Cell>
              <Table.Cell>{ticket.createdAt.toString().slice(0,15)}</Table.Cell>
              <Table.Cell>{ticket.status.toString()}</Table.Cell>
            </Table.Row>
          )
        })}
      
      </Table.Body>
    </Table.Root>
    </div>
  )
}

export default TicketsPage

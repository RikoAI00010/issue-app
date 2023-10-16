import { Table } from '@radix-ui/themes'
import React from 'react'
import NewTicket from './createNew'
import prisma from '@/prisma/client'

const TicketsPage = async () => {
  const issues = await prisma.issue.findMany({
    include:{
      registerBy:{
        
      }
    }
  })  

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
              <Table.Cell>{`${ticket.registerBy.firstName} ${ticket.registerBy.lastName}`}</Table.Cell>
              <Table.Cell>{ticket.title}</Table.Cell>
              <Table.Cell>{ticket.createdAt.toString().slice(0,25)}</Table.Cell>
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

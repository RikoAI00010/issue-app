'use client'
import React, {useEffect, useState } from 'react'
import {Table} from '@radix-ui/themes'
import CompanyEditDialog from '../../admin/companyEditDialog'

const CompanyList = ({companies}: any) => {

    const [companyList, setCompanyList] = useState(companies)
    const [modalCompany, setModalCompany] = useState({})
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openAndCloseModal = (action: string, id:number = 0) =>{
        action === 'open' ? setIsOpen(true):setIsOpen(false) 
        if (id !== 0) {
            setModalCompany(companyList.find((x:any) => x.id == id))              
        }     
    }

    return (
        <>
            <CompanyEditDialog isOpen={isOpen} closeModalHandler={openAndCloseModal} modalData={modalCompany}/>
            <Table.Root className='mb-3' variant='surface'>
                <Table.Header>
                    <Table.Row>
                    <Table.ColumnHeaderCell justify='center'>Company Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify='center'>Email</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify='center'>Contact number</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify='center'>Contact person</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                    <Table.Body>
                    {companyList.map((company:any) =>{
                        return <Table.Row key={company.id} onClick={() =>openAndCloseModal('open', company.id)} className='hover:bg-gray-500 hover:cursor-pointer transition-colors'>
                            <Table.Cell justify='center'>{company.name}</Table.Cell>
                            <Table.Cell justify='center'>{company.email}</Table.Cell>
                            <Table.Cell justify='center'>{company.contact}</Table.Cell>
                            <Table.Cell justify='center'>{company.contactPerson}</Table.Cell>
                        </Table.Row>
                    })}
                    </Table.Body>   
            </Table.Root>
        </>
    )
}

export default CompanyList

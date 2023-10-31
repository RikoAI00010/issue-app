'use client'
import React, {useEffect, useState } from 'react'
import CompanyEditDialog from '../../admin/companyEditDialog'
import {Avatar, Box, Table, Text, TextField, } from '@radix-ui/themes'
import { format } from 'date-fns'
import { AiFillCaretUp, AiFillCaretDown, AiTwotoneFilter } from 'react-icons/ai'

const CompanyList = ({companies}: any) => {

    const [companyList, setCompanyList] = useState(companies)
    const [modalCompany, setModalCompany] = useState({})
    const [isOpen, setIsOpen] = useState<boolean>(false)

    console.log(companies);
    
    const openAndCloseModal = (action: string, id:number = 0) =>{
        action === 'open' ? setIsOpen(true):setIsOpen(false) 
        if (id !== 0) {
            setModalCompany(companyList.find((x:any) => x.id == id))              
        }     
    }

    const [sortedCompanies, setSortedCompanies] = useState<Array<any>>(companies)

    const orderBy = (target: string) =>{
        let sorted: any
        let resorted: any
        console.log(target);
        

        switch (target) {
            case 'idUp':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.id - b.id)     
                setSortedCompanies(sorted)
            break
            case 'idDown':
                sorted = [...sortedCompanies].sort((a:any,b:any) => b.id - a.id)              
                setSortedCompanies(sorted)
            break

            case 'nameUp':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.name.localeCompare(b.name))     
                setSortedCompanies(sorted)
            break
            case 'nameDown':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.name.localeCompare(b.name))
                resorted = sorted.reverse()
                setSortedCompanies(resorted)
            break

            case 'emailUp':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.email.localeCompare(b.email))     
                setSortedCompanies(sorted)
            break
            case 'emailDown':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.email.localeCompare(b.email))
                resorted = sorted.reverse()
                setSortedCompanies(resorted)
            break

            case 'contactUp':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.contact.localeCompare(b.contact))     
                setSortedCompanies(sorted)
            break
            case 'contactDown':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.contact.localeCompare(b.contact))
                resorted = sorted.reverse()
                setSortedCompanies(resorted)
            break

            case 'contactPersonUp':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.contactPerson.localeCompare(b.contactPerson))     
                setSortedCompanies(sorted)
            break
            case 'contactPersonDown':
                sorted = [...sortedCompanies].sort((a:any,b:any) => a.contactPerson?.localeCompare(b.contactPerson))
                resorted = sorted.reverse()
                setSortedCompanies(resorted)
            break

            default:
            break;
        }         
    }


    const filterData = (key:string, data: string) =>{
        const companiesToFilter = [...companies]
        let filteredCompanies;

        if (key == 'id') {
            filteredCompanies = companiesToFilter.filter(x => x[key].toString().includes(data.toLowerCase()))
        } else {
            filteredCompanies = companiesToFilter.filter(x => x[key].toLowerCase().includes(data.toLowerCase()))
        }

        setSortedCompanies(filteredCompanies)
    }

    return (
        <>
            <CompanyEditDialog isOpen={isOpen} closeModalHandler={openAndCloseModal} modalData={modalCompany}/>
            <div className='w-16 h-12 flex gap-4'>
                <div>
                    <TextField.Root className='w-24'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('id', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-[430px]'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Company name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('name', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-64'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('email', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-60'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Contact number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('contact', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-96'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Contact person" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('contactPerson', e.target.value)}/>
                    </TextField.Root>
                </div>
                
            </div>
            <Table.Root className='mb-3' variant='surface'>
                <Table.Header>
                    <Table.Row>
                    <Table.ColumnHeaderCell justify='center' align='center' width='100px'>Avatar</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify='center'>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>ID</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('idUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('idDown')}/>
                        </div>
                    </div>
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify='center'>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>Company name</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('nameUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('nameDown')}/>
                        </div>
                    </div>
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify='center'>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>Email</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('emailUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('emailDown')}/>
                        </div>
                    </div>
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify='center'>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>Contact number</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('contactUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('contactDown')}/>
                        </div>
                    </div>
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify='center'>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>Contact person</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('contactPersonUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('contactPersonDown')}/>
                        </div>
                    </div>
                    </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                    <Table.Body>
                    {sortedCompanies.map((company:any) =>{
                        return <Table.Row key={company.id} onClick={() =>openAndCloseModal('open', company.id)} className='hover:bg-gray-500 hover:cursor-pointer transition-colors'>
                            <Table.Cell justify='center' align='center' width='100px'><Avatar src='' fallback='A'/></Table.Cell>
                            <Table.Cell justify='center'>{company.id}</Table.Cell>
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

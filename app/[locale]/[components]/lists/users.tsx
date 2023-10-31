
import React, { useEffect, useState } from 'react'
import {Avatar, Box, Table, Text, TextField, } from '@radix-ui/themes'
import UserEditDialog from '../../admin/userEditDialog'
import { format } from 'date-fns'
import { AiFillCaretUp, AiFillCaretDown, AiTwotoneFilter } from 'react-icons/ai'

const UsersLlist = ({users}: any) => {
    const [usersList, setUsersList] = useState(users)
    const [modalUsers, setModalUsers] = useState({})
    const [sortedUsersList, setSortUsersList] = useState<Array<any>>(users)
    const [filteredUsers, setFilteredUsers] = useState<Array<any>>()
    const [sortOrder, setSortOrder] = useState('asc')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    console.log(users);
    
    const openAndCloseModal = (action: string, id:number = 0) =>{
        action === 'open' ? setIsOpen(true):setIsOpen(false) 
        if (id !== 0) {
            setModalUsers(usersList.find((x:any) => x.id == id))              
        }     
    }

    const orderBy = (target: string) =>{
        let sorted: any
        let resorted: any
        console.log(target);
        

        switch (target) {
            case 'idUp':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.id - b.id)     
                setSortUsersList(sorted)
            break
            case 'idDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => b.id - a.id)              
                setSortUsersList(sorted)
            break

            case 'firstnameUp':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.firstName.localeCompare(b.firstName))     
                setSortUsersList(sorted)
            break
            case 'firstnameDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.firstName.localeCompare(b.firstName))
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            case 'lastnameUp':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.lastName.localeCompare(b.lastName))     
                setSortUsersList(sorted)
            break
            case 'lastnameDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.lastName.localeCompare(b.lastName))
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            case 'roleUp':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.role.name.localeCompare(b.role.name))     
                setSortUsersList(sorted)
            break
            case 'roleDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.role.name.localeCompare(b.role.name))
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            case 'companyUp':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.comapny?.name?.localeCompare(b.comapny?.name))     
                setSortUsersList(sorted)
            break
            case 'companyDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.comapny?.name?.localeCompare(b.comapny?.name))
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            case 'emailUp':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.email.localeCompare(b.email))     
                setSortUsersList(sorted)
            break
            case 'emailDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => a.email.localeCompare(b.email))
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            case 'emailVerUp':            
                sorted = [...sortedUsersList].sort((a:any,b:any) => Date.parse(a.emailVerified) - Date.parse(b.emailVerified) )     
                setSortUsersList(sorted)
            break
            case 'emailVerDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => Date.parse(a.emailVerified) - Date.parse(b.emailVerified) )  
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            case 'createdUp':                        
                sorted = [...sortedUsersList].sort((a:any,b:any) => Date.parse(a.createdAt) - Date.parse(b.createdAt) )     
                setSortUsersList(sorted)
            break
            case 'createdDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => Date.parse(a.createdAt) - Date.parse(b.createdAt) )  
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            case 'lastLoginUp':                        
                sorted = [...sortedUsersList].sort((a:any,b:any) => Date.parse(a.lastLogin) - Date.parse(b.lastLogin) )     
                setSortUsersList(sorted)
            break
            case 'lastLoginDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => Date.parse(a.lastLogin) - Date.parse(b.lastLogin) )  
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            case 'updateDateUp':                        
                sorted = [...sortedUsersList].sort((a:any,b:any) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt) )     
                setSortUsersList(sorted)
            break
            case 'updateDateDown':
                sorted = [...sortedUsersList].sort((a:any,b:any) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt) )  
                resorted = sorted.reverse()
                setSortUsersList(resorted)
            break

            default:
            break;
        }         
    }


    const filterData = (key:string, data: string) =>{
        const usersToFilter = [...users]
        let filteredUsers;
        if (key == 'role' || key == 'company') {
            console.log('role lub company');
            filteredUsers = usersToFilter.filter(x => x[key].name.toLowerCase().includes(data.toLowerCase()))
        } else {
            if (key == 'id') {
                filteredUsers = usersToFilter.filter(x => x[key].toString().includes(data.toLowerCase()))
            } else {
                filteredUsers = usersToFilter.filter(x => x[key].toLowerCase().includes(data.toLowerCase()))
            }
        }

        setSortUsersList(filteredUsers)
    }

  return (
    <div>
        <UserEditDialog isOpen={isOpen} closeModalHandler={openAndCloseModal} modalData={modalUsers}/>
        <div className='w-16 h-12 flex gap-4'>
                <div>
                    <TextField.Root className='w-20'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('id', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-36'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Firstname" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('firstName', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-36'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Lastname" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('lastName', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-20'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Role" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('role', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-56'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Company" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('company', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-60'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterData('email', e.target.value)}/>
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-28'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Email ver." />
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-28'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Create at" />
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-28'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Last seen" />
                    </TextField.Root>
                </div>
                <div>
                    <TextField.Root className='w-24'>
                        <TextField.Slot>
                            <AiTwotoneFilter height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="update" />
                    </TextField.Root>
                </div>
                <input type="date"/>
            </div>
        <Table.Root className='mb-3' variant='surface'>
            <Table.Header>
                <Table.Row>
                <Table.ColumnHeaderCell >Avatar</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell >
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>ID</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('idUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('idDown')}/>
                        </div>
                    </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hover:cursor-pointer' >
                <div className='flex items-center space-x-2 justify-center'>
                    <Text>Firstname</Text> 
                    <div>
                        <AiFillCaretUp onClick={() => orderBy('firstnameUp')}/>
                        <AiFillCaretDown onClick={() => orderBy('firstnameDown')}/>
                    </div>
                </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell  width={220}>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>Lastname</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('lastnameUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('lastnameDown')}/>
                        </div>
                    </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell >
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>Role</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('roleUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('roleDown')}/>
                        </div>
                    </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell width={300}>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>Company</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('companyUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('companyDown')}/>
                        </div>
                    </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell >
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text>Email</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('emailUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('emailDown')}/>
                        </div>
                    </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell  width={140}>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text align='center'>Email verification</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('emailVerUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('emailVerDown')}/>
                        </div>
                    </div>                    
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell width={140}>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text align='center'>Cration date</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('createdUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('createdDown')}/>
                        </div>
                    </div> 
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell width={140}>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text align='center'>Last login date</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('lastLoginUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('lastLoginDown')}/>
                        </div>
                    </div> 
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell width={140}>
                    <div className='flex items-center space-x-2 justify-center'>
                        <Text align='center'>Update date</Text> 
                        <div>
                            <AiFillCaretUp onClick={() => orderBy('updateDateUp')}/>
                            <AiFillCaretDown onClick={() => orderBy('updateDateDown')}/>
                        </div>
                    </div> 
                </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body className=''>
                {sortedUsersList.map((user:any) =>{
                    return <Table.Row key={user.id} onClick={() =>openAndCloseModal('open', user.id)} className='hover:bg-gray-500 hover:cursor-pointer transition-colors'>
                        <Table.Cell align='center'><Avatar src={user.image} fallback={user.firstName.slice(0,1)}/></Table.Cell>
                        <Table.Cell align='center'>{user.id}</Table.Cell>
                        <Table.Cell align='center'>{user.firstName}</Table.Cell>
                        <Table.Cell align='center'>{user.lastName}</Table.Cell>
                        <Table.Cell align='center'>{user.role.name}</Table.Cell>
                        <Table.Cell align='center'>{user.company?.name? user.company.name : ''}</Table.Cell>
                        <Table.Cell align='center'>{user.email}</Table.Cell>
                        <Table.Cell align='center'>{format(new Date(user.emailVerified), 'dd-MM-yyy  hh:mm:ss')}</Table.Cell>
                        <Table.Cell align='center'>{format(new Date(user.createdAt), 'dd-MM-yyy  hh:mm:ss')}</Table.Cell>
                        <Table.Cell align='center'>{format(new Date(user.lastLogin), 'dd-MM-yyy  hh:mm:ss')}</Table.Cell>
                        <Table.Cell align='center'>{format(new Date(user.updatedAt), 'dd-MM-yyy  hh:mm:ss')}</Table.Cell>
                    </Table.Row>
                })}
                </Table.Body>   
            </Table.Root>
    </div>
  )
}

export default UsersLlist

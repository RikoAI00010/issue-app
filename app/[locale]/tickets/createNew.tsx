'use client'
import { Button, Dialog, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const CreateNewTicket = () => {
    let [open, setOpen] = useState(false)
    const router = useRouter()    
    let [myForm, setMyForm] = useState({
        title: '',
        description: '',
        status: 'NEW',
        registerBy: 1, 
        asignedTo: 1
    })
    return (

            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger>
                    <Button>Add new issue</Button>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>New Issue</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                    lorem lorem lorem.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                        Title
                        </Text>
                        <TextField.Input
                            value={myForm.title}
                            onChange={(e) => setMyForm({...myForm, title: e.target.value})}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                        Description
                        </Text>
                        <TextArea 
                            value={myForm.description}
                            onChange={(e) => setMyForm({...myForm, description: e.target.value})}/>
                    </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray" onClick={() =>{
                            setMyForm({
                                title: '',
                                description: '',
                                status: 'NEW',
                                registerBy: 1, 
                                asignedTo: 1
                            })
                        }}>
                        Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={(async () => {
                            const res = await axios.post('/api/issues', {...myForm})
                            if (res.status == 201) {
                                setOpen(false)
                                setMyForm({
                                    title: '',
                                    description: '',
                                    status: 'NEW',
                                    registerBy: 1, 
                                    asignedTo: 1
                                })
                                router.refresh()
                            }

                        })}>Save</Button>
                    </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

    )
}

export default CreateNewTicket

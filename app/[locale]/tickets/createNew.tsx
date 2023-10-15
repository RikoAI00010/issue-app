'use client'
import { Button, Dialog, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IssueForm{
    title: String;
    description: String;
    status: String;
    registerBy: Number
    asignedTo: Number
}

const CreateNewTicket = () => {
    let [open, setOpen] = useState(false)
    const router = useRouter()
    const newIssue = {
        "title" : "Second issue",
        "description" : "Second issue desc",
        "registerBy" : 1,
        "status": "NEW",
        "asignedTo" : 1
    };
    
    const {register, handleSubmit} = useForm<IssueForm>({
        defaultValues:{
            registerBy: 1,
            asignedTo: 1,
            status: "OPEN",
        }
    })
    return (

            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger>
                    <Button>Edit profile</Button>
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
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                            {...register('title')}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                        Description
                        </Text>
                        <TextArea 
                            placeholder="Reply to comment…" 
                            {...register('description')}/>
                    </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                        Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleSubmit(async (data) => {

                            await axios.post('/api/issues', {...data})
                            setOpen(false)
                            router.refresh()
                        })}>Save</Button>
                    </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

    )
}

export default CreateNewTicket

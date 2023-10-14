'use client'
import { Avatar, Button, Dialog, ThemePanel } from '@radix-ui/themes'
import React from 'react'
import { MdLogout } from 'react-icons/md';
import LangControl from '@/app/[locale]/[components]/langController'

const UserPanel = () => {
  return (
    <div className='border border-gray-700 w-84 h-18 p-2 '>
        <div className='flex items-center gap-4' >
            <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
                radius='full'
            />
            <Dialog.Root>
                <Dialog.Trigger>
                    <span className='hover:cursor-pointer hover:text-gray-600 transition-colors'>ANONIMOWY ANONIM</span>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: '80vw'}}>
                    <div className='flex gap-4 items-center'>
                        <Avatar
                            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                            fallback="A"
                            radius='full'
                        />
                        <span className='hover:cursor-pointer hover:text-gray-600 transition-colors'>ANONIMOWY ANONIM</span>

                    </div>
                </Dialog.Content>
            </Dialog.Root>
            <div className='hover:cursor-pointer hover:text-gray-600 transition-colors'>
                <MdLogout size={30}/>
            </div>
            <LangControl/>
        </div>
    </div>
  )
}

export default UserPanel

'use client'
import { Avatar, Button, Dialog, ThemePanel } from '@radix-ui/themes'
import React from 'react'
import { MdLogout, MdLogin } from 'react-icons/md';
import LangControl from '@/app/[locale]/[components]/langController'
import { useSession, signOut, signIn  } from 'next-auth/react'
import Link from 'next/link';

const UserPanel = () => {
    const {status, data:session } = useSession()
    console.log(session);
    
  return (
    <div className='border border-gray-700 w-84 h-18 p-2 '>

        <div className='flex items-center gap-4' >
            {status === "authenticated"? 
            <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <div className='pr-8 pl-8'>
                        <Avatar
                            src={session.user!.image}
                            fallback="?"
                            radius='full'
                        />
                            <span className='hover:cursor-pointer hover:text-gray-600 transition-colors pl-4'>{session.user!.firstName} {session.user!.lastName}</span>
                    </div>
                        </Dialog.Trigger>
                <Dialog.Content>
                    <div className='flex gap-4 items-center'>

                        <span className='hover:cursor-pointer hover:text-gray-600 transition-colors'>{session.user!.firstName!} {session.user!.lastName!}</span>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
            <div className='hover:cursor-pointer hover:text-gray-600 transition-colors'>
                <MdLogout size={30} onClick={() => signOut()}/>
            </div></> : 
            <div className='hover:cursor-pointer hover:text-gray-600 transition-colors'>
                {status ==="unauthenticated" && <div className=' flex gap-4 pl-4 pr-8 items-center' onClick={() => signIn("google")}>Zaloguj z Google <MdLogin size={30} /></div>}    
            </div>}
            <LangControl/>
        </div>
    </div>
  )
}

export default UserPanel

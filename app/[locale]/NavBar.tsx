import Link from 'next/link'
import {useTranslations} from 'next-intl';
import React from 'react'
import { FaDumpsterFire } from 'react-icons/fa';
import NavItem from './NavItem'
const NavBar = () => {



  const t = useTranslations('Nav');
  const navLinks = [
    {
      label: 'administration',
      href:'/admin',
      role: ['admin']
    },
    {
      label: 'dashboard',
      href:'/dashboard',
      role: ['user','admin']
    },
    {
      label: 'myTicets',
      href:'/tickets',
      role: ['user','admin']
    },
    {
      label: 'contact',
      href:'/contact',
      role: ['user','admin']
    },
    {
      label: 'chat',
      href:'/chat',
      role: ['user','admin']
    },
    {
      label: 'createTicket',
      href:'/tickets/new',
      role: ['user','admin']
    },
  ]




  return (
    <div className='border-r border-gray-700 w-64 flex flex-col h-[100vh]'>
      <div className='flex justify-between items-center h-32 border-b border-gray-700 p-4 mb-5'>
      <Link  href='/'><FaDumpsterFire size={60}/></Link> 
        <span className='text-md'>DumpsterFire Team</span>
      </div>
      {navLinks.map(link =>{
        return (
          <NavItem key={link.label} link={link.href} label={t(link.label)} role={link.role}/> 
        )})}

    </div>
  )
}

export default NavBar

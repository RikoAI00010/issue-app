'use client'
import classNames from 'classnames'
import Link from 'next-intl/link'
import React from 'react'
import { useSession} from 'next-auth/react'

import { usePathname } from 'next/navigation';

const NavItem = ({link, label, role}: {link:any, label: string, role :Array<string>}) => {
  let currentPath = usePathname()
  if (currentPath.includes("/en")) {
    currentPath = currentPath.replace("/en", "");
  }
  const {status, data:session } = useSession()



  return (<>
  {role.includes(session?.user.role.name!)? <Link  href={link}>
    <div 
      key={link.label} 
      className={classNames({
        'font-bold bg-gray-900' : link === currentPath,
        'flex justify-center items-center h-10 hover:cursor-pointer hover:bg-gray-900 transition-colors hover:font-bold' : true
      })}>
        {label}
    </div>
  </Link> :
  <></>
  }</>
  )
}

export default NavItem

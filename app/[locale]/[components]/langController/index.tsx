import Link from 'next-intl/link';
import ReactCountryFlag from "react-country-flag"
import React from 'react'

const index = () => {
  return (
    <div className='flex flex-col'>
        <Link href="/" locale="pl">
            <ReactCountryFlag countryCode="PL" svg />
        </Link>
        <Link href="/" locale="en">
            <ReactCountryFlag countryCode="GB" svg />
        </Link>
    </div>
  )
}

export default index

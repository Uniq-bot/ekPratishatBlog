import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className="  p-4 fixed top-0 right-0   ">
        <Link className='underline' href="https://ekpratishat.com/" target="_blank">
            Go to home
        </Link>
    </div>
  )
}

export default NavBar
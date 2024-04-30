
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link className="text-2xl font-semibold h-12 w-12" href="/">
    <Image className="" src="/logo.png" width={50} height={50} alt="logo" />
</Link>
  )
}

export default Logo
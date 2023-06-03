import React from 'react'
import Link from 'next/link'

const GoBack = () => {
  return (
    <Link
      href='/'
      className='transition-color m-auto mt-5 flex w-fit items-center justify-center rounded-xl bg-slate-900 p-5 text-9xl text-white duration-150 ease-linear hover:cursor-pointer hover:bg-slate-600'
    >
      Volver
    </Link>
  )
}

export default GoBack

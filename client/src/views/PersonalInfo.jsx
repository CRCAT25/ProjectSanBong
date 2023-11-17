import React from 'react'
import FormInfoCaNhan from './FormInfoCaNhan'
import FormLichSu from './FormLichSu'
import Header from './Header'
import Footer from './Footer'

const PersonalInfo = () => {
  return (
    <div className='PersonalInfo bg-[#DFFFD3]'>
        <Header/>
        <FormInfoCaNhan/>
        <FormLichSu/>
        <Footer/>
    </div>
  )
}

export default PersonalInfo
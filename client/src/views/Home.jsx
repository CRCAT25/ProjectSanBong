import React from 'react'
import LichGiaoHuu from './LichGiaoHuu'
import { OrderField } from './OrderField'
import Header from './Header'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <OrderField/>
        <LichGiaoHuu/>
        <Footer/>
    </div>
  )
}

export default Home
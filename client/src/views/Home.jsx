import React, { useEffect } from 'react';
import LichGiaoHuu from './LichGiaoHuu';
import { OrderField } from './OrderField';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementsByClassName('orderField')[0];

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleScrollGH = () => {
      const elementThamGiaGiaoHU = document.getElementsByClassName('ThamGiaGiaoHU')[0];

      if (elementThamGiaGiaoHU) {
        elementThamGiaGiaoHU.scrollIntoView({ behavior: 'smooth' });
      }
    };

    var buttonDatSanNgay = document.getElementById('buttonDatSanNgay');
    var textDatSanNgay = document.getElementById('textDatSanNgay');
    var textLichGiaoHuu = document.getElementById('textLichGiaoHuu');
    if (buttonDatSanNgay || textDatSanNgay) {
      buttonDatSanNgay.addEventListener('click', handleScroll);
      textDatSanNgay.addEventListener('click', handleScroll);
    }
    if(textLichGiaoHuu){
      textLichGiaoHuu.addEventListener('click', handleScrollGH);
    }

    // Cleanup function
    return () => {
      if (buttonDatSanNgay || textDatSanNgay) {
        buttonDatSanNgay.removeEventListener('click', handleScroll);
        textDatSanNgay.removeEventListener('click', handleScroll);
      }
      if(textLichGiaoHuu){
        textDatSanNgay.removeEventListener('click', handleScrollGH);
      }
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div className='home'>
      <Header />
      <OrderField />
      <LichGiaoHuu />
      <Footer />
    </div>
  );
};

export default Home;

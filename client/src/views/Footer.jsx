import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPhoneVolume, faEnvelope} from "@fortawesome/free-solid-svg-icons"

const Icon24px = ({classIcon}) => {
    const iconSize = {
        width: "24px",
        height: "24px",
        color: "#379E13",
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}


const Footer = () => {
  return (
    <div className='w-full mt-[100px]'>
        <div className='grid grid-cols-9 px-5 py-2 bg-[#D9D9D9]'>
            <div className="col-span-2 px-5">
                <img src="../assets/logoFooter.png" alt="" />
            </div>
            <div className="col-span-4 relative px-5">
                <p className='absolute top-[50px] font-[600] text-[24px]'>Về chúng tôi:</p>
                <p className='absolute bottom-[50px] font-[400] text-[18px] text-justify pr-5'>Tìm kiếm địa điểm thi đấu, dịch vụ cho thuê sân vận động và cơ sở thể thao của chúng tôi để xác định địa điểm hoàn hảo cho sự kiện tiếp theo của bạn! Chúng tôi cung cấp nhiều đấu trường và địa điểm sân vận động gần vị trí của bạn cho các sự kiện xã hội độc đáo, các buổi biểu diễn hoành tráng trong ngành và hơn thế nữa</p>
            </div>
            <div className="col-span-3 flex flex-col justify-center px-5 relative pl-[180px]">
                <p className='absolute top-[50px] font-[600] text-[24px]'>Thông tin liên hệ:</p>
                <p className='absolute bottom-[100px] font-[400] text-[24px]'>
                    <Icon24px classIcon={faPhoneVolume}/>
                    <span className='ml-5'>01298371283</span>
                </p>
                <p className='absolute bottom-[50px] font-[400] text-[24px]'>
                    <Icon24px classIcon={faEnvelope}/>
                    <span className='ml-5'>DatSanBong@gmail.com</span>
                </p>
            </div>
        </div>

        <div className='border-t-2 border-[#c7c7c7] text-center h-[50px] flex flex-col justify-center bg-[#D9D9D9]'>
            © 2023 Stadium | Website
        </div>
    </div>
  )
}

export default Footer
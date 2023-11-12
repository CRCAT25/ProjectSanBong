import React from "react";
import  "../css/OrderField.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLocationDot, 
    faChevronDown, 
    faMagnifyingGlass,
    faCalendarDays,
    faCheck
} from "@fortawesome/free-solid-svg-icons"

const Icon24px = ({classIcon}) => {
    const iconSize = {
        width: "24px",
        height: "24px"
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}

const IconCheck = ({classIcon}) => {
    const iconSize = {
        width: "20px",
        height: "20px",
        color: "#fff"
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}

export const OrderField = () => {
  return (
    <div className="w-[80%] mx-auto mt-5">
        <div className="grid grid-cols-12">
            <div className="h-[3px] lineCustom col-span-5 rotate-180 mt-[59px]"></div>
            <div className="text-[48px] font-[600] my-6 text-center col-span-2 text-[#30691b]">ĐẶT SÂN</div>
            <div className="h-[3px] lineCustom col-span-5 mt-[59px]"></div>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 border-[#379E13] border-[3px] rounded-[10px] p-5">
                <div className="flex justify-between">
                    <div className="text-[24px] justify-center flex flex-col">Vị trí:</div>
                    <div className="border-2 border-[#000] py-2 px-4 rounded-[10px] cursor-pointer">
                        <Icon24px classIcon={faLocationDot}/>
                        <span className="text-[24px] mx-4">Hồ Chí Minh</span>
                        <Icon24px classIcon={faChevronDown}/>
                    </div>
                </div>

                <div className="flex justify-between mt-5 rounded-[15px] bg-[#E9E9E9] p-2 mb-10">
                    <div className="text-[18px] justify-center flex flex-col text-[#776F6F]">Tìm kiếm tên cơ sở...</div>
                    <div className="py-2 pr-[10px]">
                        <Icon24px classIcon={faMagnifyingGlass}/>
                    </div>
                </div>

                <div className="border-[#379E13] border-[3px] rounded-[15px] p-3 mt-4 flex">
                    <img className="w-[100px] h-[100px] rounded-[15px]" src="./assets/sanbong.jpg" alt="" />
                    <span className="justify-center flex flex-col ml-5 text-[#2B790F] text-[26px]">Cơ sở sân 1</span>
                </div>

                <div className="border-[#379E13] border-[3px] rounded-[15px] p-3 mt-4 flex">
                    <img className="w-[100px] h-[100px] rounded-[15px]" src="./assets/sanbong.jpg" alt="" />
                    <span className="justify-center flex flex-col ml-5 text-[#2B790F] text-[26px]">Cơ sở sân 1</span>
                </div>

                <div className="border-[#379E13] border-[3px] rounded-[15px] p-3 mt-4 flex">
                    <img className="w-[100px] h-[100px] rounded-[15px]" src="./assets/sanbong.jpg" alt="" />
                    <span className="justify-center flex flex-col ml-5 text-[#2B790F] text-[26px]">Cơ sở sân 1</span>
                </div>

                <div className="border-[#379E13] border-[3px] rounded-[15px] p-3 mt-4 flex">
                    <img className="w-[100px] h-[100px] rounded-[15px]" src="./assets/sanbong.jpg" alt="" />
                    <span className="justify-center flex flex-col ml-5 text-[#2B790F] text-[26px]">Cơ sở sân 1</span>
                </div>
            </div>



            <div className="col-span-8 border-[#379E13] border-[3px] rounded-[10px] p-5 relative">
                <div className="flex gap-6">
                    <img className="w-[240px] h-[240px] rounded-[15px]" src="./assets/sanbong.jpg" alt="" />
                    <div className="block w-full">
                        <div className="text-[32px] font-[600] mb-2">Sân Huy Hoàng</div>

                        <div className="text-[20px] mt-1">
                            <span className="font-[600]">Địa chỉ:</span>
                            <span className="font-[400] ml-3">32 Nguyễn xuân khoát, Bình Hưng Hòa, Bình Tân </span>
                        </div>

                        <div className="text-[20px] mt-1">
                            <span className="font-[600]">Số điện thoại:</span>
                            <span className="font-[400] ml-3">08128782993 </span>
                        </div>

                        <div className="text-[20px] mt-5 flex justify-between">
                            <span className="font-[600] justify-center flex flex-col">Ngày đặt sân:</span>
                            <div className="flex gap-4">
                                <div className="border-2 border-[#379E13] py-1 px-4 rounded-[10px] cursor-pointer">
                                    <span className="text-[20px] mx-4">T7 31/10/2023</span>
                                </div>
                                <div className="border-2 border-[#379E13] py-1 px-2 rounded-[10px] cursor-pointer">
                                    <Icon24px classIcon={faCalendarDays}/>
                                </div>
                                <div className="border-2 border-[#379E13] py-1 px-4 rounded-[10px] cursor-pointer">
                                    <span className="text-[20px] mx-4">Lọc loại sân</span>
                                    <Icon24px classIcon={faChevronDown}/>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-10 mt-5 gap-3">
                            <div className="col-span-2 bg-[#FFEB37] text-center px-4 py-2 rounded-[10px]">SÂN SỐ 1</div>
                            <div className="col-span-2 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">SÂN SỐ 2</div>
                            <div className="col-span-2 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">SÂN SỐ 3</div>
                        </div>
                    </div>
                </div>

                <div className="mt-[50px] relative">
                    <div className="text-[24px] text-[#2B790F]">Chi tiết sân bóng:</div>
                    <div className="w-full h-[3px] lineCustom"></div>
                    <div className="mt-4 flex gap-6">
                        <img className="w-[300px] h-[300px] rounded-[15px]" src="./assets/sanbong.jpg" alt="" />

                        <div className="w-full">
                            <div className="text-[20px] mt-1">
                                <span className="font-[600]">Cỡ sân:</span>
                                <span className="font-[400] ml-3">100m<sup>2</sup></span>
                            </div>

                            <div className="text-[20px] mt-1">
                                <span className="font-[600]">Loại sân:</span>
                                <span className="font-[400] ml-3">VIP</span>
                            </div>

                            <div className="mt-7 w-full gap-3 grid grid-cols-12">
                                <div className="col-span-3 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">5:00 - 7:00</div>                          
                                <div className="col-span-3 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">7:00 - 9:00</div>                          
                                <div className="col-span-3 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">9:00 - 11:00</div>                          
                                <div className="col-span-3 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">11:00 - 13:00</div>                          
                                <div className="col-span-3 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">13:00 - 15:00</div>                          
                                <div className="col-span-3 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">15:00 - 17:00</div>                          
                                <div className="col-span-3 bg-[#D9D9D9] text-center px-4 py-2 rounded-[10px]">17:00 - 19:00</div>                          
                            </div>

                            <div className="absolute flex gap-3 bottom-0">
                                <div className="w-[30px] h-[30px] bg-[#2AB514] border-[2px] border-[#2AB514] rounded-[5px] cursor-pointer p-1">
                                    <IconCheck classIcon={faCheck}/>
                                </div>

                                <div className="flex flex-col justify-center font-[600]">Cho phép người khác tham gia giao hữu</div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-[28px] font-[600] absolute bottom-5 left-5">Tạm tính:</div>
                <div className="text-[28px] font-[400] absolute bottom-5 left-[165px]">900.000</div>
                <button className="buttonXacNhan w-[250px] h-[50px] absolute bottom-5 right-5 text-[28px]">Xác nhận</button>

            </div>
        </div>
    
    
  </div>
  )
}

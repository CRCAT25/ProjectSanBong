import React, { useCallback, useState, useEffect, useRef } from "react";
import "../css/Admintest.css"

 const Admin = () => {

  const [activeTab, setActiveTab] = useState('hotel');

  const openTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="w-full h-[96px] px-[60px] fixed z-50 top-0 bg-white">
        <div className="flex item-center justify-between  py-[8px]">
          <div className="flex item-center gap-3">
            <button id="tablink" className={`tablink ${activeTab === 'hotel' ? 'active' : ''}`} data-electronic="hotel" onClick={() => openTab('hotel')}>Hotel</button>
            <button id="tablink" className={`tablink ${activeTab === 'phong' ? 'active' : ''}`} data-electronic="phong" onClick={() => openTab('phong')}>Phòng</button>
            <button id="tablink" className={`tablink ${activeTab === 'khachhang' ? 'active' : ''}`} data-electronic="khachhang" onClick={() => openTab('khachhang')}>Khách hàng</button>
            <button id="tablink" className={`tablink ${activeTab === 'partner' ? 'active' : ''}`} data-electronic="partner" onClick={() => openTab('partner')}>Partner</button>
            <button id="tablink" className={`tablink ${activeTab === 'doanhthu' ? 'active' : ''}`} data-electronic="doanhthu" onClick={() => openTab('doanhthu')}>Doanh Thu</button>
            <button id="tablink" className={`tablink ${activeTab === 'comment' ? 'active' : ''}`} data-electronic="comment" onClick={() => openTab('comment')}>Đánh giá</button>
            <button id="tablink" className={`tablink ${activeTab === 'video' ? 'active' : ''}`} data-electronic="video" onClick={() => openTab('video')}>Video</button>


            {/* {tenkh ? (
              <div className="flex items-center">
                <a id="atenkh" style={{ fontWeight: '600' }}>{tenkh}</a>
                <button className="iconlogout"
                  onClick={showdiv}
                >
                  <IconShowDiv classIcon={faSortDown} />
                </button>
                {isDivVisible && (
                  <div className="fixed top-12 right-20">
                    <div className="bg-white rounded-lg p-4">
                      <button className="mb-2" onClick={goLogout}>Đăng xuất</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <React.Fragment>
                <button
                  className="w-[104px] h-[40px] items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[14px]"
                  onClick={goLogin}
                >
                  Đăng nhập
                </button>
                <button
                  className="w-[104px] h-[40px] items-center font-[600] border-solid border border-[#FF3366] rounded-[8px] text-[#FF3366] text-[14px]"
                  onClick={goRegister}
                >
                  Đăng ký
                </button>
              </React.Fragment>
            )} */}
          </div>
        </div>
      </div>
      <div class="wrapper_tabcontent font-bold">
        {/* khachhang */}
        <div id="khachhang" className={`tabcontent ${activeTab === 'khachhang' ? 'active' : ''}`}>
          <h3 id="searchkh">Tìm email hoặc số điện thoại:</h3>
          <input type="text" class="input_searchemailso" id="rssearch"></input>
          <button id="Submit" class="submit_searchtenso"></button>
          <h2 class="tkh">Tên khách hàng:</h2>
          <h2 class="email">Email:</h2>
          <h2 class="sdt">Số điện thoại:</h2>
          <h2 class="mk">Mật khẩu:</h2>
          <h2 class="role">Quyền hạn:</h2>
          <input type="text" class="iptkh" ></input>
          <input type="text" class="ipsdt" ></input>
          <input type="text" class="ipemail" ></input>
          <input type="text" class="ipmk" ></input>
          <input type="number" class="iprole" id="myNumberam" onchange="limitNumberam()" min="0" max="1"></input>
          <div id="buttonn">
            <button id="btnaddkh" >Thêm</button>
            <button id="btneditkh" >Sửa</button>
          </div>
          <div class="tbkh">
            <div id="trsp1">
              <div id="thsp1">
                <h3 id="h3id">ID</h3>
                <h3 id="h3sdt">Số điện thoại</h3>
                <h3 id="h3tkh">Tên khách hàng</h3>
                <h3 id="h3email">Email</h3>
                <h3 id="h3mk">Mật khẩu</h3>
                <h3 id="h3am">Quyền hạn</h3>
                <h3 id="h3veri">Xác thực</h3>
              </div>
            </div>
            {/* <div id="showkh" style={{ overflow: "scroll" }}>
              {users.length > 0 ? (
                <ul>
                  {users.map((user, i) => (
                    <>
                      <tr key={i} id="trkh">
                        <th id="thid" className={`idkh-${user.User_id}`}>{user.User_id}</th>
                        <th id="thten" className={`tkh-${user.User_id}`}>{user.User_Name}</th>
                        <th id="themail" className={`emailkh-${user.User_id}`}>{user.User_Email}</th>
                        <th id="thsdt" className={`phonekh-${user.User_id}`}>{user.User_Phone}</th>
                        <th id="thmk" className={`mkkh-${user.User_id}`}>{user.User_Password}</th>
                        {formattedDate(user.email_verified_at) !== "1/1/1970, 8:00 AM" ? (
                          <th id="thtimeveri" className={`tvr-${user.User_id}`}>{formattedDate(user.email_verified_at)}</th>
                        ) : (
                          <th id="thtimeveri" className={`tvr-${user.User_id}`}>Chưa xác minh</th>
                        )}
                        <th id="throle" className={`rolekh-${user.User_id}`}>{user.Role}</th>
                        <th id="thremovekh">
                          <button id="buttoneditkh" onClick={() => onEditkh(user.User_id)}>Edit</button>
                          <button id="buttonrekh" onClick={() => DeleteUser(user.User_id)}>✘</button>
                        </th>
                      </tr></>
                  ))}
                </ul>
              ) : (
                <p>No users found.</p>
              )}
            </div> */}
          </div>
        </div>

        {/* partner */}
        <div id="partner" className={`tabcontent ${activeTab === 'partner' ? 'active' : ''}`}>
          <h3 id="searchpartner">Tìm email hoặc số điện thoại:</h3>
          <input type="text" class="input_searchemailsopart" id="rssearch" ></input>
          <button id="Submit" class="submit_searchtensopart">Search</button>

          <div class="tbpartner">
            <div id="trsp1">
              <div id="thsp1">
                <h3 id="h3idpartner">ID</h3>
                <h3 id="h3tenpartner">Tên khách hàng</h3>
                <h3 id="h3emailpartner">Email</h3>
                <h3 id="h3sdtpartner">Số điện thoại</h3>
                <h3 id="h3mkpartner">Mật khẩu</h3>
                <h3 id="h3veripartner">Xác thực</h3>
                <h3 id="h3cccdpartner">CCCD</h3>
                <h3 id="h3gpkdpartner">Giấy phép</h3>

              </div>
            </div>
            {/* <div id="showpartner" style={{ overflow: "scroll" }}>
              {partners.length > 0 ? (
                <ul>
                  {partners.map((partner, i) => (
                    formattedDate(partner.Partner_verified) !== "1/1/1970, 8:00 AM" && (
                      <tr key={i} id="trkh">
                        <th id="thidpartner" className={`idkh-${partner.Partner_id}`}>{partner.Partner_id}</th>
                        <th id="thtenpartner" className={`tkh-${partner.Partner_id}`}>{partner.Partner_Name}</th>
                        <th id="themailpartner" className={`emailkh-${partner.Partner_id}`}>{partner.Partner_Email}</th>
                        <th id="thsdtpartner" className={`phonekh-${partner.Partner_id}`}>{partner.Partner_Phone}</th>
                        <th id="thmkpartner" className={`mkkh-${partner.Partner_id}`}>{partner.Partner_Password}</th>
                        <th id="thdcpartner" className={`tvr-${partner.Partner_id}`}>{formattedDate(partner.Partner_verified)}</th>
                        <th id="thcccdpartner" className={`rolekh-${partner.Partner_id}`}
                          onClick={() => handleImageCCCD(partner.Partner_id, partner.Partner_Name)}
                        >Xem</th>
                        <th id="thgpkdpartner" className={`rolekh-${partner.Partner_id}`}
                          onClick={() => handleImageGPKD(partner.Partner_id, partner.Partner_Name)}
                        >Xem</th>
                        <th id="thremovepartner">
                          {partner.status === 0 && (
                            <div>
                              <button id="buttoneditkh" onClick={() => StickPartner(partner.Partner_id, partner.Partner_Email)}>✓</button>
                              <button id="buttonrekh" onClick={() => UnstickPartner(partner.Partner_id, partner.Partner_Email)}>✘</button>
                            </div>
                          )}
                          {partner.status === 1 && (
                            <button id="buttonrekh" onClick={() => UnstickPartner(partner.Partner_id, partner.Partner_Email)}>✘</button>
                          )}
                          {partner.status === 2 && (
                            <button id="buttonrekh" onClick={() => StickPartner(partner.Partner_id, partner.Partner_Email)}>✓</button>
                          )}
                        </th>
                      </tr>
                    )
                  ))}
                </ul>
              ) : (
                <p>No partners found.</p>
              )}
            </div> */}
          </div>
        </div>
          
      </div>
    </div>
  )
}
export default Admin;

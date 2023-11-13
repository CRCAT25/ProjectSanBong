import "../css/FieldManager.css";
const FieldManage = () => {
  return (
        <div className="landing-fAj" id="257:562">
          <div className="qun-l-sn-dgX" id="257:798">
            <p className="main-advertise-letter-fNK" id="257:861">
              QUẢN LÝ SÂN
            </p>
            <div className="group-289721-jNB" id="409:239">
              <div className="auto-group-9pu3-fmd" id="Wa15WRasqVvDXdss4P9pU3">
                <div className="nhp-tn-sn-zZ1" id="257:799">
                  <div className="tn-sn--vxT" id="257:802">
                    Tên sân:
                  </div>
                  <input className="auto-group-1jl7-TBh" id="Wa15ekgLDPSUrvQVNo1jL7" placeholder="Tên sân">
                  </input>
                </div>
                <div className="chn-loi-sn-Ji7" id="257:803">
                  <div className="loi-sn--RXq" id="257:806">
                    Loại sân:
                  </div>
                  <div className="auto-group-xrjf-hkF" id="Wa1675FotPrCMP7b6jXrJF">
                    <select name="cars"className="selectLoaiS">
                      <option value="volvo">Volvo</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                </div>
                <div className="nhp-gi-bUF" id="257:811">
                  <div className="n-gi--LRq" id="257:814">
                    Đơn giá:
                  </div>
                  <input placeholder ="Đơn giá"  className="auto-group-6ywm-4sd" id="Wa16GQKbfnkeocz8Vg6Ywm">
                  </input>
                </div>
              </div>
              <div className="chn-nh-u7Z" id="257:808">
                <div className="nh--pEX" id="257:810">
                  Ảnh:
                </div>
                <div className="auto-group-bp27-YwD" id="Wa16pPQJdzzne9yQzcbp27">
                  <img
                    className="imgboxfill-tkB"
                    src="https://via.placeholder.com/1920x839"
                    id="409:240"
                  />
                </div>
              </div>
              <div className="auto-group-hhjs-nKm" id="Wa16MefrYhWfBdYBexHhJs">
                <button className="btnThemSan" id="257:815">
                  Thêm
                </button>
                <button className="btnCapNhatSan" id="257:818">
                  Cập nhật
                </button>
                <button className="btXoaSan" id="257:821">
                  Xóa
                </button>
              </div>
            </div>
            <div className="danh-sch-sn-H3Z" id="257:824">
              Danh sách sân
            </div>
            <div className="sn-XTh" id="257:844">
              <div className="auto-group-lo8w-E7D" id="Wa17AdKabWVfpUgCKqLo8w">
                  <div className="tn-sn-input-J75" id="257:849">
                    <div className="tenSan">Tên sân</div>
                  </div>
                  <div className="tn-sn-input-Mr3" id="257:852">
                  <div className="loaiSan">Loại sân</div>    
                  </div>
                  <div className="tn-sn-input-J91" id="257:855">
                  <div className="donGia">Đơn giá</div> 
                  </div>
              </div>
              <div className="auto-group-fmjy-Uhh" id="Wa17XhYoPc9NvvqEtVfmjy">
                <img
                  className="imgSan"
                  src="https://via.placeholder.com/1920x839"
                  id="257:863"
                />
                <img
                  className="imgSan"
                  src="https://via.placeholder.com/1920x839"
                  id="260:1081"
                />
              </div>
              <div className="auto-group-vqh9-B1m" id="Wa17oh69siGSrCKt8xvQH9">
              <button class="btn">
                <i class="fa fa-edit fa-2x"></i>
                </button>
              <button class="btn">
                <i class="fa fa-trash fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
            <div className="auto-group-hdgw-1Js" id="Wa1AzrGdhotxoxgfMXhdgw">
              <p className="main-advertise-letter-XHD" id="257:945">
                QUẢN LÝ LỊCH SÂN
              </p>
              <p className="thng-tin-khch-hng-RtP" id="257:894">
                Thông tin khách hàng
              </p>
              <div className="auto-group-jx7d-jPH" id="Wa19Bjd7ahVU2wjvJrjx7d">
                <div className="nhp-tn-sn-p9q" id="257:870">
                  <div className="tn--jnb" id="257:873">
                    Tên:
                  </div>
                  <div className="auto-group-veaw-32b" id="Wa19NeUbkp5tm2aAF8vEaw">
                    <div className="tenKhach">Tên khách</div>
                  </div>
                </div>
                <div className="chn-loi-sn-ofy" id="257:896">
                  <div className="s-in-thoi--wGP" id="257:899">
                    Số điện thoại:
                  </div>
                  <div className="auto-group-xznk-duu" id="Wa19VowLAGzbnXsDdvxZNK">
                    <div className="soDT">Số điện thoại</div>
                  </div>
                </div>
              </div>
              <div className="thng-tin-sn-rXm" id="257:895">
                Thông tin sân
              </div>
              <div className="auto-group-evfy-kt3" id="Wa19cUQtrzDDFZVKVTeVFy">
                <div className="nhp-tn-sn-dB9" id="257:884">
                  <div className="loi--xUK" id="257:887">
                    Loại:
                  </div>
                  <select name="cars"className="selectLoaiLS">
                      <option value="volvo">Volvo</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="nhp-tn-sn-wjZ" id="257:889">
                  <div className="ngy--sNK" id="257:892">
                    Ngày:
                  </div>
                  <div className="auto-group-efjs-9qd" id="Wa19yo8hWThy9FUqpkefJs">
                    <input type="date" className="ngayLS" id="257:891">
                    </input>
                  </div>
                </div>
              </div>
              <div className="auto-group-fpes-Zns" id="Wa1A73RdCPEMmAij96FPEs">
                <div className="nhp-tn-sn-Srf" id="257:874">
                  <div className="tn--9FH" id="257:877">
                    Tên:
                  </div>
                  <select name="cars"className="selectTenLS">
                      <option value="volvo">Volvo</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="groupkhGHuu">
                <div className="nhp-tn-sn-9o1" id="257:879">
                  <div className="khung-gi--JA7" id="257:882">
                    Khung giờ:
                  </div>
                  <select name="cars"className="selectKhungGio">
                      <option value="volvo">Volvo</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="nhp-tn-sn-vKu" id="257:946">
                  <div className="cho-php-giao-hu-TKq" id="257:949">
                    Cho phép giao hữu
                  </div>
                  <select name="cars"className="selectGH">
                      <option value="volvo">Volvo</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                </div>
                </div>
              </div>
              <div className="auto-group-hhjs-nKm" id="Wa1AjrhcdDA61eXwBb9nwD">
                <div className="btnThemLich" id="257:900">
                  Thêm
                </div>
                <div className="btnCapNhatLich" id="257:939">
                  Cập nhật
                </div>
                <div className="btnXoaLich" id="257:942">
                  Xóa
                </div>
              </div>
            </div>
            <div className="group-289693-7qd" id="293:673">
              <div className="group-289658-51m" id="293:328">
                <div className="auto-group-ootz-nwm" id="Wa1Fuxaa4Znem9NxP2ooTZ">
                  8:00 - 10:00
                </div>
                <div className="auto-group-g8kj-qf9" id="Wa1G2HjMdSYXrXDkYPG8kj">
                  8:00 - 10:00
                </div>
                <div className="auto-group-tsyd-sLw" id="Wa1G7TFRDtgre7pyn7tsyD">
                  8:00 - 10:00
                </div>
                <div className="auto-group-jdsb-uYX" id="Wa1GCCcWQ3kmTei5Q8jdSb">
                  8:00 - 10:00
                </div>
                <div className="auto-group-tacj-Nh1" id="Wa1GGnKD1HbK6MhXB4Tacj">
                  8:00 - 10:00
                </div>
                <div className="auto-group-siiw-qqV" id="Wa1GNSpSJVRjSRyhx4Siiw">
                  8:00 - 10:00
                </div>
                <div className="auto-group-j53h-FeK" id="Wa1GT7MLCBsxfYuyeXj53h">
                  8:00 - 10:00
                </div>
              </div>
              <div className="auto-group-rifm-GJX" id="Wa1CodbNh5qjDKr6i2Rifm">
                <div className="group-289691-oZM" id="293:670">
                  <div className="thng-10-WTm" id="298:311">
                    Tháng 10
                  </div>
                  <div className="auto-group-gx3d-1vK" id="Wa1FME27YE1NattEaCGx3d">
                    <img
                      className="polygon-3-9Wj"
                      src="https://via.placeholder.com/1920x839"
                      id="298:308"
                    />
                    <div
                      className="auto-group-vgkk-VKh"
                      id="Wa1FTDr7yGJXJcwj3NVgkK"
                    >
                      <div className="item-4-cfD" id="298:306">
                        4
                      </div>
                      <div className="rectangle-4321-Tvj" id="298:310"></div>
                    </div>
                    <img
                      className="polygon-2-ni7"
                      src="https://via.placeholder.com/1920x839"
                      id="298:307"
                    />
                  </div>
                  <div className="group-289692-Kxw" id="293:672">
                    <div className="lc-loi-sn-Eq1" id="293:543">
                      Lọc loại sân
                    </div>
                    <img
                      className="expand-arrow-kHZ"
                      src="https://via.placeholder.com/1920x839"
                      id="293:544"
                    />
                  </div>
                </div>
                <div className="auto-group-kpmu-omd" id="Wa1D1TazzFCfTx5RoHkPmu">
                  <div className="auto-group-rtif-XxX" id="Wa1DAxKBLZLV71qd3KRtif">
                    <div className="ds-sn-4Bm" id="293:576">
                      <div
                        className="auto-group-n9eb-y3q"
                        id="Wa1DQN6W2SPPdV2efvN9eb"
                      >
                        <div className="group-289685-WJf" id="293:563">
                          <div className="rectangle-4317-1FR" id="293:552"></div>
                          <div className="sn-2-XzT" id="293:553">
                            Sân 2
                          </div>
                        </div>
                        <div className="group-289690-epB" id="293:667">
                          <div className="rectangle-4317-xZy" id="293:668"></div>
                          <div className="sn-4-tiX" id="293:669">
                            Sân 4
                          </div>
                        </div>
                        <div className="group-289687-pcB" id="293:567">
                          Sân 3
                        </div>
                        <div className="group-289688-2y9" id="293:570">
                          <div
                            className="auto-group-bbrb-YAo"
                            id="Wa1DfcA6xQyKD31rcVbBrB"
                          >
                            Sân 1
                          </div>
                          <div className="sn-2-osR" id="415:441">
                            Sân 2
                          </div>
                          <div className="sn-4-L6f" id="415:442">
                            Sân 4
                          </div>
                        </div>
                      </div>
                      <div className="group-289689-FjR" id="293:573">
                        Sân 5
                      </div>
                    </div>
                    <img
                      className="group-289676-WvF"
                      src="https://via.placeholder.com/1920x839"
                      id="293:455"
                    />
                    <img
                      className="group-289677-DJs"
                      src="https://via.placeholder.com/1920x839"
                      id="298:329"
                    />
                    <img
                      className="group-289678-LeP"
                      src="https://via.placeholder.com/1920x839"
                      id="298:338"
                    />
                    <img
                      className="group-289679-seK"
                      src="https://via.placeholder.com/1920x839"
                      id="298:347"
                    />
                    <img
                      className="group-289680-c67"
                      src="https://via.placeholder.com/1920x839"
                      id="298:356"
                    />
                  </div>
                  <img
                    className="rectangle-444-8q9"
                    src="https://via.placeholder.com/1920x839"
                    id="293:547"
                  />
                </div>
              </div>
              <div className="ch-thch-3hD" id="293:531">
                <div className="auto-group-zg8b-Kud" id="Wa1GnmTFAV54gyzyWwZG8B">
                  <div className="rectangle-4318-587" id="293:524"></div>
                  <div className="rectangle-4319-kk3" id="293:532"></div>
                </div>
                <div className="auto-group-lpyv-fs1" id="Wa1Gtr7Ssyyu181HufLPyV">
                  <p className="c-nhn-to-oiK" id="293:529">
                    Cỏ nhân tạo
                  </p>
                  <p className="c-t-nhin-LCT" id="293:530">
                    Cỏ tự nhiên
                  </p>
                </div>
                <div className="auto-group-ky5h-U3m" id="Wa1GzWcgBBpKMCHUgfKY5h">
                  <img
                    className="ellipse-237-1ZV"
                    src="https://via.placeholder.com/1920x839"
                    id="293:526"
                  />
                  <img
                    className="ellipse-238-kGB"
                    src="https://via.placeholder.com/1920x839"
                    id="293:527"
                  />
                </div>
                <div className="auto-group-quzw-tdH" id="Wa1H5WUMCijGwy145JqUzw">
                  <p className="trng-RNK" id="293:533">
                    Trống
                  </p>
                  <p className="t-Mmm" id="293:534">
                    Đã đặt
                  </p>
                </div>
                <img
                  className="ellipse-239-Tpo"
                  src="https://via.placeholder.com/1920x839"
                  id="293:528"
                />
                <p classNameName="hon-thnh-BF1" id="293:535">
                  Hoàn thành
                </p>
              </div>              
            </div>
          </div>
    
  );
};

export default FieldManage;

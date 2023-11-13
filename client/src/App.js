import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {
  Home,
  LichGiaoHuu,
  FieldManage,
  Admin,
  Header,
  Footer,
  FormHoanTien,
  FormLogin
  FormHoaDon,
  FormInfoCaNhan
} from "./views"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />}/>
        <Route path="/LichGiaoHuu" element={<LichGiaoHuu />}/>
        <Route path="/FieldManage" element={<FieldManage />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/Header" element={<Header />}/>
        <Route path="/Footer" element={<Footer />}/>
        <Route path="/FormHoanTien" element={<FormHoanTien/>}/>
        <Route path="/FormLogin" element={<FormLogin/>}/>
        <Route path="/FormHoaDon" element={<FormHoaDon/>}/>
        <Route path="/FormInfoCaNhan" element={<FormInfoCaNhan/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

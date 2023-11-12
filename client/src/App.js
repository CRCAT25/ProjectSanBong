import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {
  Home,
  LichGiaoHuu,
  FieldManage,
  Admin

} from "./views"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />}/>
        <Route path="/LichGiaoHuu" element={<LichGiaoHuu />}/>
        <Route path="/FieldManage" element={<FieldManage />}/>
        <Route path="/admin" element={<Admin />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

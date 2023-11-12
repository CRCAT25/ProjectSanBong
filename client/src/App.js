import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {
  Landing,
  LichGiaoHuu,
  FieldManage,
  Admin

} from "./views"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/LichGiaoHuu" element={<LichGiaoHuu />}/>
        <Route path="/FieldManage" element={<FieldManage />}/>
        <Route path="/admin" element={<Admin />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

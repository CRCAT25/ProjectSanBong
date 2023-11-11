import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {
  Landing,
  LichGiaoHuu,
  FieldManage

} from "./views"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/LichGiaoHuu" element={<LichGiaoHuu />}/>
        <Route path="/FieldManage" element={<FieldManage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {Landing} from "./views"
import FieldManage from './views/FieldManage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/FieldManage" element={<FieldManage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

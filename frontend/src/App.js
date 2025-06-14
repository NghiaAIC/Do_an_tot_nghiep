import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import GiangVien from "./pages/LecturerList";
import LopHoc from "./pages/Classes";
import NoPage from "./pages/NoPage";
import Details from "./pages/Details";
import ReactDOM from "react-dom/client";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/GiangVien" element={<GiangVien />} />
            <Route path="/GiangVien/:id" element={<Details />} />
            <Route path="/LopHoc" element={<LopHoc />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

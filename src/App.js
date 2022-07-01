import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TambahKontak from "./pages/TambahKontak";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./components/Protected";

function App() {
  const showName = () => {
    console.log("hai ini react");
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected />}>
          <Route index element={<Home />} />
          <Route path="tambah-kontak" element={<TambahKontak />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

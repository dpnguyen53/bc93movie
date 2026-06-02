import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeTemplate from "./pages/HomeTemplate";
import Home from "./pages/HomeTemplate/Home";
import ListMovie from "./pages/HomeTemplate/ListMovie";
import Contact from "./pages/HomeTemplate/Contact";
import Hooks from "./pages/HomeTemplate/Hooks";

import AdminTemplate from "./pages/AdminTemplate";
import Dashboard from "./pages/AdminTemplate/Dashboard";
import AddUser from "./pages/AdminTemplate/AddUser";
import Auth from "./pages/AdminTemplate/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="" element={<Home />} />
          <Route path="list-movie" element={<ListMovie />} />
          <Route path="contact" element={<Contact />} />
          <Route path="hooks" element={<Hooks />} />
        </Route>

        <Route path="admin" element={<AdminTemplate />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-user" element={<AddUser />} />
        </Route>

        <Route path="auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

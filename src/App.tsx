import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/analytics/Dashboard";
import Home from "./pages/home/Home";
import Profile from "./pages/members/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:idWithExtension" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

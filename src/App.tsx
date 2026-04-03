import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/analytics/Dashboard";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

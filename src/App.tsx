import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/analytics/Dashboard"));
const Profile = lazy(() => import("./pages/members/Profile"));

const LoadingScreen = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-(--ctp-base) text-(--miku-primary)">
    <i className="fa-solid fa-spinner fa-spin text-[3rem] mb-4"></i>
    <p className="font-bold tracking-wider uppercase text-[0.9rem]">
      Loading Sekai...
    </p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:idWithExtension" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

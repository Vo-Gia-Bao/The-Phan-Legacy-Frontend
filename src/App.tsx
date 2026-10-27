import { BrowserRouter, Routes, Route } from "react-router-dom";

import StartPage from "./pages/StartPage";
import Schoolbook from "./pages/Schoolbook";
import POV from "./pages/POV";
import Achievement from "./pages/Achievement";
import Tour from "./pages/Tour";
import HSGQG from "./pages/Achievement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<StartPage />}
        />

        <Route
          path="/book"
          element={<Schoolbook />}
        />
        <Route
          path="/pov"
          element={<POV />}
        />
        <Route
          path="/1"
          element={<Achievement />}
        />
        <Route
          path="/tour"
          element={<Tour />}
        />
        <Route
          path="/hsgqg"
          element={<HSGQG />}
        />

      </Routes>
    </BrowserRouter>
  );
}

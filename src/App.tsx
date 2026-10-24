import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookFlip from "./pages/Schoolbook";
import POV from "./pages/POV";
import StartPage from "./pages/StartPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/book" element={<BookFlip />} />
        <Route path="/pov" element={<POV />} />
        <Route path="/1" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

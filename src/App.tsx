import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BookFlip from "./pages/Schoolbook";
import POV from "./pages/POV";
import Tour from "./pages/Tour"
import StartPage from "./pages/StartPage"

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18
      }}
    >
      <Link to="/book">📖 Open Book</Link>
      <Link to="/pov">🎬 Open POV Story</Link>
      <Link to="/1">Start Page</Link>
    </div>
  );
}

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
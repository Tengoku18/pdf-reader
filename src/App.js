import { createContext, useState } from "react";
import LandingPage from "./components/LandingPage";
import { Route, Routes } from "react-router-dom";
import SecondPage from "./components/SecondPage";

export const urlContext = createContext();

function App() {
  const [url, setUrl] = useState(null);
  return (
    <urlContext.Provider value={{ url, setUrl }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/annotation" element={<SecondPage />} />
      </Routes>
    </urlContext.Provider>
  );
}

export default App;

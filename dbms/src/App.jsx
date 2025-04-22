import { Routes, Route } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DndBoard from "./Components/DndBoard";
import ERD from "./Components/ERD";
import { theme } from "./theme";
import Home from "./Pages/Home";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="w-full h-screen">
        
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editor" element={<ERD />} />
          <Route path="/erd" element={<ERD />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

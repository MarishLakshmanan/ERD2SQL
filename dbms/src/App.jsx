
import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import ERD from "./Components/ERD";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { theme } from "./theme";
import Home from "./pages/Home";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="w-full h-screen ">
      {/* <BrowserRouter> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/editor" element={<EditorRoute />} />
            {/* <Route path="/erd" element={<ERD />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        {/* </BrowserRouter> */}
      </Box>
    </ThemeProvider>
    
  );
}

// Protected Route Logic: only show ERD if token exists
const EditorRoute = () => {
  const token = localStorage.getItem("jwt");
  const location = useLocation()
  if(location.state?.edge){
    return token ? <ERD savedEdges={location.state.edge} savedNodes={location.state.node} savedName={location.state.name} id={location.state.id} /> : <Navigate to="/" />;
  }else{
    return token ? <ERD  /> : <Navigate to="/" />;
  }
  
  
};

// export default App;

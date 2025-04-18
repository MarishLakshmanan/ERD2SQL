import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import ERD from "./Components/ERD";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="w-full h-screen ">
        <ERD/>
      </Box>
    </ThemeProvider>
  );
}

export default App;

import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import ERD from "./Components/ERD";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="w-full h-screen ">
        {/* To Create a New Diagram */}
      <ERD/> 

        {/* To Load a saved Diagram pass the array to savedNodes and savedEdges
        <ERD id={"asd"} savedNodes={[]} savedEdges={[]}/> 
        */}
      </Box>
    </ThemeProvider>
  );
}

export default App;

import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Geography = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
    <Box m="20px">
        <Header title="Geography" subtitle="Simple Geography Chart" />

        <Box
        height="75vh"
        border={`1px solid ${colors.grey[500]}`}
        borderRadius="4px"    
        >
            <GeographyChart/>
        </Box>
    </Box>
    </main>
    </div>
  )
}

export default Geography
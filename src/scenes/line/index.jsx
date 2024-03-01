import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";



const Line = () => {
  return (
    <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
    <Box m="20px">
        <Header title="Line Chart" subtitle="Simple Line Chart" />
        <Box height="75vh">
            <LineChart/>
        </Box>
    </Box>
    </main>
    </div>
  )
}

export default Line 
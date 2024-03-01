import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";



const  Pie = () => {
  return (
    <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
    <Box m="20px">
        <Header title="Pie Chart" subtitle="Simple Pie Chart" />
        <Box height="75vh">
            <PieChart/>
        </Box>
    </Box>
    </main>
    </div>
  )
}

export default  Pie 
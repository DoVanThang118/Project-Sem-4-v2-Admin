import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../store/context";
import { blueGrey, pink } from "@mui/material/colors";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { getactive, getnotactive } from "../../services/contract.service";
import userService from "../../services/userService";
import dashboardService from "../../services/dashboardService";




const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {state,dispatch} = useContext(UserContext);
  const[acti, setActi] = useState({});
  const[notacti, setNotacti] = useState({})

  const[notify, setNotify] = useState([])

  useEffect(() => {
    dashboardService.getNotify()
        .then((res) => {
          setNotify(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  console.log("totalRevenue" , notify)

  const getDa = async ()=>{
    dispatch({type:"SHOW_LOADING"});

    const acti = await getactive();
    const notacti = await getnotactive();
    setActi(acti);
    setNotacti(notacti);

   
   
    dispatch({type:"HIDE_LOADING"});

  }

 

  useEffect(()=>{
    getDa();
     
    },[]);
    const tableStyle = {
      "border": "1px solid white"
   };


  return (
    <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="20px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                 variant="h3"
                 fontWeight="bold"

              >
                 Total Contract Active 
                 <p className="h1" > {notify.totalOrder} </p>
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
              >
                 Total Contract Not Active 
                 <p className="h1" > {notify.totalRevenue} </p>
                
              </Typography>
            </Box>
            {/*<Box>*/}
            {/*  <IconButton>*/}
            {/*    <DownloadOutlinedIcon*/}
            {/*      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}*/}
            {/*    />*/}
            {/*  </IconButton>*/}
            {/*</Box>*/}
          </Box>
          {/*<Box height="250px" m="-20px 0 0 0" style={{marginTop:30,marginLeft:30}}>*/}
          {/*<h3>Revenue In Month</h3>*/}
          {/*<table className="table" style={{border:"1px solid white", marginTop:20}}>*/}
          {/*  <thead>*/}
          {/*    {*/}
          {/*      da.map((e,k)=>{*/}
          {/*        return(*/}
          {/*          <th style={{padding:5,border:"1px solid white"}} key={k}>Month {e.mnth}/{e.yr}</th>*/}
          {/*        )*/}
          {/*      })*/}
          {/*    }*/}
          {/*  </thead>*/}
          {/*  <tbody>*/}
          {/*  <tr >*/}
          {/*    {*/}
          {/*        da.map((e,k)=>{*/}
          {/*            return (*/}
          {/*                    <td style={{padding:5,border:"1px solid white"}} key={k}>${e.tCharge}</td>*/}
          {/*                )*/}
          {/*        })*/}
          {/*    }*/}
          {/*     </tr>*/}
          {/*  </tbody>*/}
          {/*  </table>*/}
          {/*</Box>*/}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
    </main>
    </div>

  );
};

export default Dashboard;
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
import {Link} from "react-router-dom";
import OrderService from "../../services/orderService";




const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {state,dispatch} = useContext(UserContext);
  const[acti, setActi] = useState({});
  const[notacti, setNotacti] = useState([])

  const[notify, setNotify] = useState({})

  useEffect(() => {
    dashboardService.getNotify()
        .then((res) => {
          if (res.totalOrder > 0 || res.totalRevenue > 0) {
            setNotify(res);
          } else {
            console.log("NO Data notify");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const[notifyByMonth, setNotifyByMonth] = useState({})

  useEffect(() => {
    dashboardService.getNotifyByMonth()
        .then((res) => {
          if (res.totalOrder > 0 || res.totalRevenue > 0) {
            setNotifyByMonth(res);
          } else {
            console.log("NO Data notify");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  console.log("check notify:" , notify)

  const statusFilter = [1, 2];
  const [req] = useState({});
  const [order, setOrder] = useState([]);
  useEffect(() => {
    OrderService.findOrders(req)
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            const filteredOrders = res.data.filter(order => statusFilter.includes(order.status));
            setOrder(filteredOrders);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Order Waiting, payment Waiting";
      case 2:
        return "Order Waiting, payment completely";
      case 3:
        return "Order confirmed, payment Waiting";
      case 4:
        return "Order confirmed, payment completely";
      case 5:
        return "Shipping";
      case 6:
        return "Completed";
      case 0:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  // const getDa = async ()=>{
  //   dispatch({type:"SHOW_LOADING"});
  //
  //   const acti = await getactive();
  //   const notacti = await getnotactive();
  //   setActi(acti);
  //   setNotacti(notacti);
  //
  //
  //
  //   dispatch({type:"HIDE_LOADING"});
  //
  // }

 

  // useEffect(()=>{
  //   getDa();
  //
  //   },[]);
  //   const tableStyle = {
  //     "border": "1px solid white"
  //  };


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
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="20px" p="0 30px" display="flex " justifyContent="space-between" alignItems="center">
              <div className="col-md-6">
                <Box height="250px" m="-20px 0 0 0" style={{marginTop:30,marginLeft:30}}>
                  <h3>Total Statistics</h3>
                  <Typography
                      variant="h3"
                      fontWeight="bold"
                  >
                    Total Revenue
                    <p className="h1" >
                      {notify.totalRevenue}
                    </p>
                  </Typography>
                  <Typography
                      variant="h3"
                      fontWeight="bold"
                  >
                    Total Order
                    <p className="h1" > {notify.totalOrder} </p>

                  </Typography>
                </Box>
              </div>
              <div className="col-md-6">
                <Box height="250px" m="-20px 0 0 0" style={{marginTop:30,marginLeft:30}}>
                  <h3>Revenue In Month</h3>
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
                        Total Revenue
                        <p className="h1" >
                          {notifyByMonth.totalRevenue}
                        </p>
                      </Typography>
                      <Typography
                          variant="h3"
                          fontWeight="bold"
                      >
                        Total Order
                        <p className="h1" > {notifyByMonth.totalOrder} </p>

                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </div>
          </Box>
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
            Orders need confirmation
          </Typography>
          </Box>
          {order.map((e, i) => (
            <Link key={i} to={"/orders/confirm/" + e.id}>
              <Box
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
                    {e.name}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {e.email}
                  </Typography>
                </Box>
                <Box>
                  <Box color={colors.grey[100]}>{e.createDate}</Box>
                  <Box color={colors.grey[100]}>{getStatusText(e.status)}</Box>
                </Box>
                <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                >
                  ${e.totalMoney}
                </Box>
              </Box>
            </Link>
          ))}
        </Box>

         {/*ROW 3*/}
        {/*<Box*/}
        {/*  gridColumn="span 4"*/}
        {/*  gridRow="span 2"*/}
        {/*  backgroundColor={colors.primary[400]}*/}
        {/*  p="30px"*/}
        {/*>*/}
        {/*  <Typography variant="h5" fontWeight="600">*/}
        {/*    Campaign*/}
        {/*  </Typography>*/}
        {/*  <Box*/}
        {/*    display="flex"*/}
        {/*    flexDirection="column"*/}
        {/*    alignItems="center"*/}
        {/*    mt="25px"*/}
        {/*  >*/}
        {/*    <ProgressCircle size="125" />*/}
        {/*    <Typography*/}
        {/*      variant="h5"*/}
        {/*      color={colors.greenAccent[500]}*/}
        {/*      sx={{ mt: "15px" }}*/}
        {/*    >*/}
        {/*      $48,352 revenue generated*/}
        {/*    </Typography>*/}
        {/*    <Typography>Includes extra misc expenditures and costs</Typography>*/}
        {/*  </Box>*/}
        {/*</Box>*/}
        {/*<Box*/}
        {/*  gridColumn="span 4"*/}
        {/*  gridRow="span 2"*/}
        {/*  backgroundColor={colors.primary[400]}*/}
        {/*>*/}
        {/*  <Typography*/}
        {/*    variant="h5"*/}
        {/*    fontWeight="600"*/}
        {/*    sx={{ padding: "30px 30px 0 30px" }}*/}
        {/*  >*/}
        {/*    Sales Quantity*/}
        {/*  </Typography>*/}
        {/*  <Box height="250px" mt="-20px">*/}
        {/*    <BarChart isDashboard={true} />*/}
        {/*  </Box>*/}
        {/*</Box>*/}
        {/*<Box*/}
        {/*  gridColumn="span 4"*/}
        {/*  gridRow="span 2"*/}
        {/*  backgroundColor={colors.primary[400]}*/}
        {/*  padding="30px"*/}
        {/*>*/}
        {/*  <Typography*/}
        {/*    variant="h5"*/}
        {/*    fontWeight="600"*/}
        {/*    sx={{ marginBottom: "15px" }}*/}
        {/*  >*/}
        {/*    Geography Based Traffic*/}
        {/*  </Typography>*/}
        {/*  <Box height="200px">*/}
        {/*    <GeographyChart isDashboard={true} />*/}
        {/*  </Box>*/}
        {/*</Box>*/}
      </Box>
    </Box>
    </main>
    </div>

  );
};

export default Dashboard;
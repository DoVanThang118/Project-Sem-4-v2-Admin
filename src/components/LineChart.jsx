import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";
import React, { useContext, useState, useEffect } from "react";
import { tong_month } from "../services/contract.service";



const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [da,setDa]= useState([]);
  const getDa = async()=>{
    const da = await tong_month();
    setDa(da);
    

  }

  useEffect(()=>{
    getDa();
     
    },[]);
    console.log(da);


  return (
    <div></div>

    
    
  )
};

export default LineChart;
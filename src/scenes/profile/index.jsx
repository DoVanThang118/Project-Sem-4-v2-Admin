import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup  from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import UserContext from "../../store/context";
import React, { useEffect, useState,useContext } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Profile = () => {
  const {state,dispatch} = useContext(UserContext);
  const[us, setUs] = useState({});
  const getTo = () =>{
      
      setUs(state.userlogin);
  }
  useEffect(()=>{
    getTo();
  },[]);

    return (
      <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
        <Box m="20px">
            <Header title="PROFILE USER" subtitle="User Profile" />
            <p>Name:{us.name}</p>
            <p>Email:{us.email}</p>
            {/* <p>{us.token}</p> */}

           
        </Box>
        </main>
        </div>
    )
}

export default Profile;
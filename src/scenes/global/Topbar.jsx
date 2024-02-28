import React, { useRef,useContext, useState } from "react";
import { Box, IconButton, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './topbar.css'

import UserContext from '../../store/context';
import api from '../../services/api';



const Topbar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const {state,dispatch} = useContext(UserContext);
  const logout =()=>{ 
    const u = null;
    state.cart = [];

    localStorage.setItem("state",JSON.stringify(state));
         
    dispatch({type:"UPDATE_CART",payload:state.cart});
    dispatch({type:"UPDATE_USER",payload:u});
    state.userlogin = u;
    setTimeout(()=>{dispatch({type:"HIDE_LOADING"})},1000);
    localStorage.setItem("state",JSON.stringify(state));
    api.defaults.headers.common["Authorization"] = `Bearer ${null}`;
}

  return (
    <div className="shadow">
    <Box display="flex" justifyContent="space-between" p={2} >
      {/* <Box display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlinedIcon />
        </IconButton>
      </Box> */}
      <div style={{width:'100%'}}>
      <Box className="topBar">
        {/*<IconButton onClick={colorMode.toggleColorMode} >*/}
        {/*  {theme.palette.mode === 'dark' ? (*/}
        {/*    <DarkModeOutlinedIcon />*/}
        {/*  ) : (*/}
        {/*    <LightModeOutlinedIcon />*/}
        {/*  )}*/}
        {/*</IconButton>*/}
        {(state.userlogin!=null)?(
          <div>
          {/* <IconButton>
          <Link to="/profile"><PersonOutlineOutlinedIcon /></Link> 
         </IconButton> */}
          <NavLink to="/login" className=" d-flex align-items-center gap-1">
            <button type="button" onClick={logout} className="btn btn-primary" style={{borderRadius:8, margin:'0 20px'}}> Logout </button>
          </NavLink>
         </div>
        ):(
          <IconButton>
          <NavLink to ="/login">
           <button type="button" style={{borderRadius:8, backgroundColor:"pink"}} >Login</button> </NavLink>
        </IconButton>
        )
}
          
          
       
      </Box>
      </div>
    </Box>
    <hr style={{marginTop:'0'}}/>
    </div>
  );
};

export default Topbar
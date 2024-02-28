import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from './scenes/dashboard'
import Login from "./scenes/login";
import INIT_STATE from './store/initState';
import  UserContext, { UserProvider } from './store/context';
import reducer from './store/reducer';
import React, {useContext, useEffect, useReducer, useState} from "react";
import { jwtDecode } from "jwt-decode";

import CreateBrand from "./scenes/brand/createBrand";
import ListBrand from "./scenes/brand/listBrand";
import ActionBrand from "./scenes/brand/actionBrand";

import './css/sb-admin-2.min.css';
import ListRestaurant from "./scenes/restaurant/listRestaurant";


// Hàm kiểm tra thời hạn của token
// const isTokenExpired = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Math.floor(Date.now());
//     return decoded.exp > currentTime;
//   } catch (error) {
//     return true;
//   }
//
// };
//
// function PrivateRoute({ element }) {
//   const localState = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : INIT_STATE;
//   const [state, dispatch] = useReducer(reducer, localState);
//
//   // Kiểm tra đăng nhập và thời hạn của token
//   return (state.userlogin !== null && isTokenExpired(state.jwt)) ?  element : <Navigate to="/login" />;
// }
function PrivateRoute({ element }) {
  const localState = localStorage.getItem("state")?JSON.parse(localStorage.getItem("state")):INIT_STATE;
  const [state,dispatch] = useReducer(reducer,localState);
  // Kiểm tra trạng thái đăng nhập, nếu đã đăng nhập thì cho phép truy cập, ngược lại chuyển hướng đến trang đăng nhập
  return (state.userlogin !== null) ? element : <Navigate to="/" />;
}

function PrivateRouteLg({ element }) {
  const localState = localStorage.getItem("state")?JSON.parse(localStorage.getItem("state")):INIT_STATE;
  const [state,dispatch] = useReducer(reducer,localState);
  // Kiểm tra trạng thái đăng nhập, nếu đã đăng nhập thì cho phép truy cập, ngược lại chuyển hướng đến trang đăng nhập
  return (state.userlogin === null) ? element : <Navigate to="/home" />;
}

function App() {

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(INIT_STATE));
  },[] );
  const [theme, colorMode] = useMode();
  const localState = localStorage.getItem("state")?JSON.parse(localStorage.getItem("state")):INIT_STATE;
  const [state,dispatch] = useReducer(reducer,localState);
  const styles = {
    backgroundImage:"url(/Wedges-3s-200px.gif)",
    width:"100%",
    height:"100%",
    position:"fixed",
    top:0,
    left:0,
    backgroundColor:"#000000",
    opacity:0.8,
    zIndex:100,
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center center",
    display: state.isLoading?"block":"none"
  }
  return (
      <>
        {(state.userlogin === null)?
            <UserProvider value={{state,dispatch}}>
              <div id='loading' style={styles}></div>
              <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

                    {/*QUICK EAT*/}
                    <Route path="/brands" element={<PrivateRoute element={<ListBrand />} />} />
                    <Route path="/brands/create" element={<PrivateRoute element={<CreateBrand />} />} />
                    <Route path='/brands/detail/:id' element={<PrivateRoute element={<ActionBrand />} />} />
                  </Routes>
                </ThemeProvider>
              </ColorModeContext.Provider>
            </UserProvider>
            :
            <UserProvider value={{state,dispatch}}>
              <div id='loading' style={styles}></div>
              <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Routes>
                    <Route path="/login" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

                    {/*Brand*/}
                    <Route path="/brands" element={<PrivateRoute element={<ListBrand />} />} />
                    <Route path="/brands/create" element={<PrivateRoute element={<CreateBrand />} />} />
                    <Route path='/brands/detail/:id' element={<PrivateRoute element={<ActionBrand />} />} />

                    {/*Restaurant*/}
                    <Route path="/restaurants" element={<PrivateRoute element={<ListRestaurant />} />} />
                    {/*<Route path="/restaurants/create" element={<PrivateRoute element={<CreateRestaurant />} />} />*/}
                    {/*<Route path='/restaurants/detail/:id' element={<PrivateRoute element={<ActionRestaurant />} />} />*/}

                    {/*default*/}
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                  </Routes>

                </ThemeProvider>
              </ColorModeContext.Provider>
            </UserProvider>

        }

      </>
  );
}

export default App;

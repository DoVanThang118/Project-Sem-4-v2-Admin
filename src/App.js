import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Dashboard from './scenes/dashboard'
import Team from './scenes/team'
import Login from "./scenes/login";
import INIT_STATE from './store/initState';
import  UserContext, { UserProvider } from './store/context';
import reducer from './store/reducer';
import React, { useContext, useReducer, useState } from "react";
import Profile from "./scenes/profile";

import CreateBrand from "./scenes/brand/createBrand";
import ListBrand from "./scenes/brand/listBrand";
import EditBrand from "./scenes/brand/actionBrand";

import './css/sb-admin-2.min.css'
import CreateProduct from "./scenes/product/createProduct";
import ActionProduct from "./scenes/product/actionProduct"
import ListProduct from "./scenes/product/listProduct";
import ListFeedback from "./scenes/feedback/listfeedback";


import ActionBrand from "./scenes/brand/actionBrand";
import CreateRestaurant from "./scenes/restaurant/createRestaurant";
import ListRestaurant from "./scenes/restaurant/listRestaurant";
import ActionRestaurant from "./scenes/restaurant/actionRestaurant";

import ListCategory from "./scenes/category/listCategory";
import CreateCategory from "./scenes/category/createCategory";
import ActionCategory from "./scenes/category/actionCategory";
import WaitOrder from "./scenes/order/waitOrder";
import ConfirmOrder from "./scenes/order/confirmOrder";
import EntireOrder from "./scenes/order/entireOrder";
import DetailOrder from "./scenes/order/detailOrder";
import ListUser from "./scenes/users/listUser";
import CreateUser from "./scenes/users/createUser";
import ActionUser from "./scenes/users/actionUser";
import {jwtDecode} from "jwt-decode";
import ListShipper from "./scenes/shipper/listShipper";
import ActionShipper from "./scenes/shipper/actionShipper";

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
  return (state.userlogin === null) ? element : <Navigate to="/dashboard" />;
}

function App() {
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

  // Lấy giá trị state từ localStorage
  // const getState = localStorage.getItem('state');
  // const parsedState = JSON.parse(getState);
  // const userLogin = parsedState.userlogin;
  // const jwtToken = userLogin.jwt;
  // const decodedToken = jwtDecode(jwtToken);
  // const userRole = decodedToken.role;
  return (
      <>
        {(state.userlogin === null)?
            <UserProvider value={{state,dispatch}}>
              <div id='loading' style={styles}></div>

              <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                  </Routes>
                </ThemeProvider>
              </ColorModeContext.Provider>
            </UserProvider>
            :
            <UserProvider value={{state,dispatch}}>
              <div id='loading' style={styles}></div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                      <Route path="/" element={<Login/>} />
                      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                      <Route path="/team" element={<PrivateRoute element={<Team />} />} />

                      {/*Brand*/}
                      <Route path="/brands" element={<PrivateRoute element={<ListBrand />} />} />
                      <Route path="/brands/create" element={<PrivateRoute element={<CreateBrand />} />} />
                      <Route path='/brands/detail/:id' element={<PrivateRoute element={<ActionBrand />} />} />

                      {/*Restaurant*/}
                      <Route path="/restaurants" element={<PrivateRoute element={<ListRestaurant />} />} />
                      <Route path="/restaurants/create" element={<PrivateRoute element={<CreateRestaurant />} />} />
                      <Route path='/restaurants/detail/:id' element={<PrivateRoute element={<ActionRestaurant />} />} />

                      {/*category*/}
                      <Route path="/categories" element={<PrivateRoute element={<ListCategory />} />} />
                      <Route path="/categories/create" element={<PrivateRoute element={<CreateCategory />} />} />
                      <Route path='/categories/detail/:id' element={<PrivateRoute element={<ActionCategory />} />} />

                      {/*User*/}
                      <Route path="/users" element={<PrivateRoute element={<ListUser />} />} />
                      <Route path="/users/create" element={<PrivateRoute element={<CreateUser />} />} />
                      <Route path='/users/detail/:id' element={<PrivateRoute element={<ActionUser />} />} />

                      {/*Product*/}
                      <Route path="/products" element={<PrivateRoute element={<ListProduct />} />} />
                      <Route path="/products/create" element={<PrivateRoute element={<CreateProduct />} />} />
                      <Route path='/products/detail/:id' element={<PrivateRoute element={<ActionProduct />} />} />

                      {/*Order*/}
                      <Route path="/orders" element={<PrivateRoute element={<WaitOrder />} />} />
                      <Route path='/orders/confirm/:id' element={<PrivateRoute element={<ConfirmOrder />} />} />
                      <Route path="/orders/entire" element={<PrivateRoute element={<EntireOrder />} />} />
                      <Route path='/orders/detail/:id' element={<PrivateRoute element={<DetailOrder />} />} />

                      {/*Shipper*/}
                      <Route path="/shippers" element={<PrivateRoute element={<ListShipper />} />} />
                      <Route path="/shippers/detail/:id" element={<PrivateRoute element={<ActionShipper />} />} />



                    </Routes>
                  </ThemeProvider>
                </ColorModeContext.Provider>c
              </LocalizationProvider>
            </UserProvider>
        }
      </>
  );
}

export default App;

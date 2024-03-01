import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from './scenes/dashboard'
import Team from './scenes/team'
import Invoices from './scenes/invoices'
import Form from './scenes/form'
import Calendar from './scenes/calendar'
import FAQ from './scenes/faq'
import Bar from './scenes/bar'
import Pie from './scenes/pie'
import Line from './scenes/line'
import Geography from './scenes/geography'
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
// import EditProduct from "./scenes/product";
import ListProduct from "./scenes/product/listProduct";
import ListFeedback from "./scenes/feedback/listfeedback";


import ActionBrand from "./scenes/brand/actionBrand";
import CreateRestaurant from "./scenes/restaurant/createRestaurant";
import ListRestaurant from "./scenes/restaurant/listRestaurant";
import ListCategory from "./scenes/Category/listCategory";
import CreateCategory from "./scenes/Category/createCategory";

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
            <Route path="/" element={<Login/>} />
            <Route path="/home" element={<PrivateRoute element={<Dashboard />} />} />
            {/* <Route path="/team" element={<PrivateRoute element={<Team />} />} /> */}
            {/*<Route path="/listContract" element={<PrivateRoute element={<Contacts />} />} />*/}
            {/*<Route path="/create-contract" element={<PrivateRoute element={<CreateContract />} />} />*/}
            {/*<Route path="/contract-detail/:id" element={<PrivateRoute element={<ContractDevice />} />} />*/}


            {/* <Route path="/invoices" element={<PrivateRoute element={<Invoices />} />} /> */}
            {/*<Route path="/form" element={<PrivateRoute element={<Form />} />} />*/}
            {/*<Route path="/listbrand" element={<PrivateRoute element={<ListBrand />} />} />*/}
            {/*<Route path="/listfeedback" element={<PrivateRoute element={<ListFeedback />} />} />*/}
            {/*<Route path="/listthietbi" element={<PrivateRoute element={<ListThietBi />} />} />*/}
            {/*<Route path='/thietbi-edit/:id' element={<PrivateRoute element={<EditThietBi />} />} />*/}
            {/*<Route path="/create-thietbi" element={<PrivateRoute element={<CreateThietBi />} />} />*/}
            {/*<Route path="/create-check/:id" element={<PrivateRoute element={<CreateCheckInstall />} />} />*/}
            {/*<Route path="/listCheck" element={<PrivateRoute element={<ListCheck />} />} />*/}
            {/*<Route path="/edit-check/:id" element={<PrivateRoute element={<EditCheckInstall />} />} />*/}

            {/*<Route path="/listCheckProposed" element={<PrivateRoute element={<ListProposedDevices />} />} />*/}
            {/*<Route path="/create-proposed/:idd" element={<PrivateRoute element={<CreateProposed />} />} />*/}

            {/*<Route path="/create-pro/:idd" element={<PrivateRoute element={<CreatePro />} />} />*/}

            {/*<Route path="/edit-proposed/:id" element={<PrivateRoute element={<EditProposed />} />} />*/}

            {/*<Route path="/listNVLDCheck" element={<PrivateRoute element={<ListNVLDCheck />} />} />*/}

            {/*<Route path="/listNVLDProposed" element={<PrivateRoute element={<ListNVLDProposed />} />} />*/}













            {/* <Route path="/faq" element={<PrivateRoute element={<FAQ />} />} /> */}
            {/* <Route path="/bar" element={<PrivateRoute element={<Bar />} />} /> */}
            {/* <Route path="/pie" element={<PrivateRoute element={<Pie />} />} /> */}
            {/* <Route path="/line" element={<PrivateRoute element={<Line />} />} /> */}
            {/* <Route path="/geography" element={<PrivateRoute element={<Geography />} />} /> */}
            {/* <Route path="/profile" element={<PrivateRoute element={<Profile />} />} /> */}
            {/*<Route path="/listpackdata" element={<PrivateRoute element={<ListPackData />} />} />*/}
            {/*<Route path="/create-packdata" element={<PrivateRoute element={<CreatePackData />} />} />*/}
            {/*<Route path='/packdata-edit/:id' element={<PrivateRoute element={<EditPackData />} />} />*/}
            {/*<Route path="/create-brands" element={<PrivateRoute element={<CreateBrand />} />} />*/}
            {/*<Route path='/brand-edit/:id' element={<PrivateRoute element={<EditBrand />} />} />*/}


            {/*<Route path='/contract-edit/:id' element={<PrivateRoute element={<EditContract />} />} />*/}
            {/* <Route path='/contractagree' element={<PrivateRoute element={<Contractagree />} />} /> */}
            {/* <Route path='/contractdisagree' element={<PrivateRoute element={<Contractdisagree />} />} /> */}
            {/* <Route path='/contractpayment' element={<PrivateRoute element={<Contractpayment />} />} /> */}




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
            <Route path="/" element={<Login/>} />
            <Route path="/home" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/team" element={<PrivateRoute element={<Team />} />} />
            {/*<Route path="/listContract" element={<PrivateRoute element={<Contacts />} />} />*/}
            {/*<Route path="/create-contract" element={<PrivateRoute element={<CreateContract />} />} />*/}

            {/*<Route path="/contract-detail/:id" element={<PrivateRoute element={<ContractDevice />} />} />*/}


            {/*/!* <Route path="/invoices" element={<PrivateRoute element={<Invoices />} />} /> *!/*/}
            {/*<Route path="/form" element={<PrivateRoute element={<Form />} />} />*/}
            {/*<Route path="/listbrand" element={<PrivateRoute element={<ListBrand />} />} />*/}
            {/*<Route path="/listfeedback" element={<PrivateRoute element={<ListFeedback />} />} />*/}
            {/*<Route path="/listthietbi" element={<PrivateRoute element={<ListThietBi />} />} />*/}
            {/*<Route path='/thietbi-edit/:id' element={<PrivateRoute element={<EditThietBi />} />} />*/}
            {/*<Route path="/create-thietbi" element={<PrivateRoute element={<CreateThietBi />} />} />*/}
            {/*<Route path="/create-check/:id" element={<PrivateRoute element={<CreateCheckInstall />} />} />*/}
            {/*<Route path="/listCheck" element={<PrivateRoute element={<ListCheck />} />} />*/}
            {/*<Route path="/edit-check/:id" element={<PrivateRoute element={<EditCheckInstall />} />} />*/}

            {/*<Route path="/listCheckProposed" element={<PrivateRoute element={<ListProposedDevices />} />} />*/}
            {/*<Route path="/create-proposed/:idd" element={<PrivateRoute element={<CreateProposed />} />} />*/}
            {/*<Route path="/create-pro/:idd" element={<PrivateRoute element={<CreatePro />} />} />*/}
            {/*<Route path="/edit-proposed/:id" element={<PrivateRoute element={<EditProposed />} />} />*/}

            {/*<Route path="/listNVLDCheck" element={<PrivateRoute element={<ListNVLDCheck />} />} />*/}
            {/*<Route path="/listNVLDProposed" element={<PrivateRoute element={<ListNVLDProposed />} />} />*/}


            {/* <Route path="/faq" element={<PrivateRoute element={<FAQ />} />} /> */}
            {/* <Route path="/bar" element={<PrivateRoute element={<Bar />} />} /> */}
            {/* <Route path="/pie" element={<PrivateRoute element={<Pie />} />} /> */}
            {/* <Route path="/line" element={<PrivateRoute element={<Line />} />} /> */}
            {/* <Route path="/geography" element={<PrivateRoute element={<Geography />} />} /> */}
            {/* <Route path="/profile" element={<PrivateRoute element={<Profile />} />} /> */}
            {/*<Route path="/listpackdata" element={<PrivateRoute element={<ListPackData />} />} />*/}
            {/*<Route path="/create-packdata" element={<PrivateRoute element={<CreatePackData />} />} />*/}
            {/*<Route path='/packdata-edit/:id' element={<PrivateRoute element={<EditPackData />} />} />*/}
            {/*<Route path="/create-brands" element={<PrivateRoute element={<CreateBrand />} />} />*/}
            {/*<Route path='/brand-edit/:id' element={<PrivateRoute element={<EditBrand />} />} />*/}


            {/*<Route path='/contract-edit/:id' element={<PrivateRoute element={<EditContract />} />} />*/}
            {/* <Route path='/contractagree' element={<PrivateRoute element={<Contractagree />} />} /> */}
            {/* <Route path='/contractdisagree' element={<PrivateRoute element={<Contractdisagree />} />} /> */}
            {/* <Route path='/contractpayment' element={<PrivateRoute element={<Contractpayment />} />} /> */}



          {/*Brand*/}
          <Route path="/brands" element={<PrivateRoute element={<ListBrand />} />} />
          <Route path="/brands/create" element={<PrivateRoute element={<CreateBrand />} />} />
          <Route path='/brands/detail/:id' element={<PrivateRoute element={<ActionBrand />} />} />

          {/*Restaurant*/}
          <Route path="/restaurants" element={<PrivateRoute element={<ListRestaurant />} />} />
          <Route path="/restaurants/create" element={<PrivateRoute element={<CreateRestaurant />} />} />
          {/*<Route path='/restaurants/detail/:id' element={<PrivateRoute element={<ActionRestaurant />} />} />*/}

          {/*Category*/}
          <Route path="/categories" element={<PrivateRoute element={<ListCategory />} />} />
          <Route path="/categories/create" element={<PrivateRoute element={<CreateCategory />} />} />
          {/*<Route path='/categories/detail/:id' element={<PrivateRoute element={<ActionCategory />} />} />*/}

          {/*Product*/}
          <Route path="/products" element={<PrivateRoute element={<ListProduct />} />} />
          <Route path="/products/create" element={<PrivateRoute element={<CreateProduct />} />} />
          {/*<Route path='/products/detail/:id' element={<PrivateRoute element={<ActionProduct />} />} />*/}
          </Routes>

      </ThemeProvider>
    </ColorModeContext.Provider>
    </UserProvider>
    }
    </>
  );
}

export default App;

import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ava from '../../img/logobrand.png';
import UserContext from "../../store/context";
import { useContext } from "react";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {jwtDecode} from 'jwt-decode';
import RoomServiceIcon from '@mui/icons-material/RoomService';


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem active={selected === title}
                  style={{ color: colors.grey[100]}}
                  onClick={() => setSelected(title)}
                  icon={icon}
        >
            <Typography style={{fontWeight:'600', fontSize:'1.2rem'}}>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const {state,dispatch} = useContext(UserContext);

    //Giai jwt

// Lấy giá trị state từ localStorage
    const getState = localStorage.getItem('state');
    const parsedState = JSON.parse(getState);
    const userLogin = parsedState.userlogin;
    const jwtToken = userLogin.jwt;
    const decodedToken = jwtDecode(jwtToken);
    const userRole = decodedToken.role;
    console.log(userRole)




    return (
        <Box sx={{
            ".pro-sidebar":{
                position:'fixed',
                left:'0'

            },
            "& .pro-sidebar-inner": {
                backgroundImage: 'linear-gradient(#ffffff, #ffffff, #ffffff)',
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important"
            },
            "& .pro-inner-item": {
                padding: "5px 25px 5px 20px !important"
            },
            "& .pro-inner-item:hover": {
                color: " #868dfb  !important"
            },
            "& .pro-menu-item.active": {
                color: "#6870fa !important"
            },
        }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]} >


                                </Typography>
                                {/* <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton> */}
                            </Box>
                        )}
                    </MenuItem>
                    {/*User menu*/}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={ava}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>

                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    QUICK EAT
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {/* Menu items */}
                    <Box padding={isCollapsed ? undefined : "10%"}>


                        {userRole === 'ROLE_ADMIN'&& (
                            <>
                                <Item
                                    title={"Dashboard"}
                                    to={"/dashboard"}
                                    icon={<HomeOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Typography
                                    variant="h6"
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}>
                                    Pages
                                </Typography>
                                <Item
                                    title={"Brand"}
                                    to={"/brands"}
                                    icon={<FastfoodIcon  />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Item
                                    title={"Restaurant"}
                                    to={"/restaurants"}
                                    icon={<TableRestaurantIcon  />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title={"category"}
                                    to={"/categories"}
                                    icon={<CategoryIcon  />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title={"Product"}
                                    to={"/products"}
                                    icon={<ProductionQuantityLimitsIcon  />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title={"User"}
                                    to={"/users"}
                                    icon={<PeopleAltIcon  />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}

                        {userRole === 'ROLE_ADMIN' && (
                            <>
                                <Item
                                    title={"Order"}
                                    to={"/orders/entire"}
                                    icon={<AssignmentIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                {/*<Item*/}
                                {/*    title={"Feedback"}*/}
                                {/*    to={"/feedbacks"}*/}
                                {/*    icon={<QuestionAnswerIcon />}*/}
                                {/*    selected={selected}*/}
                                {/*    setSelected={setSelected}*/}
                                {/*/>*/}
                            </>
                        )}

                        {userRole === 'ROLE_MANAGER' && (
                            <>
                                <Item
                                    title={"Dashboard"}
                                    to={"/dashboard"}
                                    icon={<HomeOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Typography
                                    variant="h6"
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}>
                                    Pages
                                </Typography>

                                <Item
                                    title={"Product"}
                                    to={"/products"}
                                    icon={<ProductionQuantityLimitsIcon  />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title={"Order"}
                                    to={"/orders"}
                                    icon={<AssignmentIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                {/*<Item*/}
                                {/*    title={"Feedback"}*/}
                                {/*    to={"/feedbacks"}*/}
                                {/*    icon={<QuestionAnswerIcon />}*/}
                                {/*    selected={selected}*/}
                                {/*    setSelected={setSelected}*/}
                                {/*/>*/}
                                <Item
                                    title={"Shipper"}
                                    to={"/shippers"}
                                    icon={<RoomServiceIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        {userRole === 'ROLE_SHIPPER' && (
                            <>

                            </>
                        )}

                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar
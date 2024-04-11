import {Box, TextField, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../store/context";
import OrderService from "../../services/orderService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const EntireOrder = (props) => {

    const getState = localStorage.getItem('state');
    const parsedState = JSON.parse(getState);
    const userLogin = parsedState.userlogin;
    const jwtToken = userLogin.jwt;
    const decodedToken = jwtDecode(jwtToken);
    const userRole = decodedToken.role;

    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { state, dispatch } = useContext(UserContext);
    const [req] = useState({});
    const [order, setOrder] = useState([]);

    console.log("order check:",order);

    useState(() => {
        OrderService.findOrders(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setOrder(res.data);
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

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchAddress, setSearchAddress] = useState('');
    const [searchPhone, setSearchPhone] = useState('');

    useEffect(() => {
        const filtered = order.filter(order =>
            (searchTerm === '' || (order.restaurant && order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (searchEmail === '' || (order.email && order.email.toLowerCase().includes(searchEmail.toLowerCase()))) &&
            (searchName === '' || (order.name && order.name.toLowerCase().includes(searchName.toLowerCase()))) &&
            (searchAddress === '' || (order.address && order.address.toLowerCase().includes(searchAddress.toLowerCase()))) &&
            (searchPhone === '' || (order.phone && order.phone.toLowerCase().includes(searchPhone.toLowerCase())))
        );
        setFilteredUsers(filtered);
    }, [searchTerm, searchEmail, searchName, searchAddress, searchPhone, order]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleNameChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setSearchAddress(event.target.value);
    };

    const handleEmailChange = (event) => {
        setSearchEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setSearchPhone(event.target.value);
    };

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">

                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>ORDERS</h1>
                        <nav className="navbar bg-body-tertiary">
                            <div>
                                {userRole === 'ROLE_MANAGER'&& (
                                    <Link to={"/orders"} style={{ margin: '24px 0' }}>
                                        <button style={{}} className="btn btn-success">
                                            Confirm Order
                                        </button>
                                    </Link>
                                )}
                            </div>
                            <div className="d-flex">

                                {userRole === 'ROLE_ADMIN'&& (
                                    <TextField
                                        label="Search by restaurant name"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        variant="outlined"
                                        style={{ margin: '24px 0' }}
                                    />
                                )}
                                <TextField
                                    label="Search by name"
                                    value={searchName}
                                    onChange={handleNameChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                                <TextField
                                    label="Search by email"
                                    value={searchEmail}
                                    onChange={handleEmailChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                                <TextField
                                    label="Search by address"
                                    value={searchAddress}
                                    onChange={handleAddressChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                                <TextField
                                    label="Search by phone"
                                    value={searchPhone}
                                    onChange={handlePhoneChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                            </div>
                        </nav>

                        <table className="table  table-bordered" style={{}}>
                            <thead>
                            <tr>
                                <th style={{textAlign: 'center'}}>STT</th>
                                <th style={{textAlign: 'center'}}>Name</th>
                                <th style={{textAlign: 'center'}}>Address</th>
                                <th style={{textAlign: 'center'}}>Email</th>
                                <th style={{textAlign: 'center'}}>Phone</th>
                                <th style={{textAlign: 'center'}}>Total</th>
                                <th style={{textAlign: 'center'}}>Create Date</th>
                                <th style={{textAlign: 'center'}}>Note</th>
                                {userRole === 'ROLE_ADMIN'&& (
                                    <th style={{textAlign: 'center'}}>Restaurant</th>
                                )}
                                <th style={{textAlign: 'center'}}>Status</th>
                                <th style={{textAlign: 'center'}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                filteredUsers.map((e, k) => {
                                    return (
                                        <tr key={k}>
                                            <td >{k + 1}</td>
                                            <td >{e.name}</td>
                                            <td >{e.address}</td>
                                            <td >{e.email}</td>
                                            <td >{e.phone}</td>
                                            <td >{e.totalMoney}$</td>
                                            <td >{e.createDate}</td>
                                            <td >{e.note}</td>
                                            {userRole === 'ROLE_ADMIN'&& (
                                                <td >{e.restaurant.name}</td>
                                            )}
                                            <td >{getStatusText(e.status)}</td>
                                            <td style={{textAlign: 'center'}}>
                                                <Link to={"/orders/detail/" + e.id}>
                                                    <button className="btn btn-outline-info">
                                                        Detail
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </Box>
            </main>
        </div>
    )

}

export default EntireOrder;
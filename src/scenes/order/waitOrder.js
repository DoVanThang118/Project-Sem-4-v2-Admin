import {Box, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../store/context";
import OrderService from "../../services/orderService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Link} from "react-router-dom";

const WaitOrder = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { state, dispatch } = useContext(UserContext);
    const [req] = useState({});
    const [order, setOrder] = useState([]);

    console.log("order check:",order);

    // useState(() => {
    //     OrderService.findOrders(req)
    //         .then((res) => {
    //             if (Array.isArray(res.data) && res.data.length > 0) {
    //                 setOrder(res.data);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    const statusFilter = [1, 2];
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

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">

                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>ORDERS WAITING</h1>
                        <Link to={"/orders/entire"} style={{ margin: '24px 0' }}>
                            <button style={{}} className="btn btn-success">
                                Entire Order
                            </button>
                        </Link>

                        <table className="table  table-bordered" style={{}}>
                            <thead>
                            <tr>
                                <th style={{textAlign: 'center', width: '5%'}}>STT</th>
                                <th style={{textAlign: 'center'}}>Name</th>
                                <th style={{textAlign: 'center'}}>Address</th>
                                <th style={{textAlign: 'center', width: '15%'}}>Email</th>
                                <th style={{textAlign: 'center', width: '10%'}}>Phone</th>
                                <th style={{textAlign: 'center', width: '5%'}}>Total</th>
                                <th style={{textAlign: 'center', width: '15%'}}>Create Date</th>
                                <th style={{textAlign: 'center'}}>Note</th>
                                <th style={{textAlign: 'center'}}>Status</th>
                                <th style={{textAlign: 'center', width: '5%'}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                order.map((e, k) => {
                                    return (
                                        <tr key={k}>
                                            <td style={{textAlign: 'center'}}>{k + 1}</td>
                                            <td >{e.name}</td>
                                            <td >{e.address}</td>
                                            <td >{e.email}</td>
                                            <td >{e.phone}</td>
                                            <td style={{textAlign: 'center', width: '5%'}}>{e.totalMoney}$</td>
                                            <td style={{textAlign: 'center', width: '15%'}}>{e.createDate}</td>
                                            <td >{e.note}</td>
                                            <td >{getStatusText(e.status)}</td>
                                            <td style={{textAlign: 'center'}}>
                                                <Link to={"/orders/confirm/" + e.id}>
                                                    <button className="btn btn-outline-info">
                                                        Confirm
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

export default WaitOrder;
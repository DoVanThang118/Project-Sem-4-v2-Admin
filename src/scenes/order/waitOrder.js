import {Box, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import React, {useContext, useState} from "react";
import UserContext from "../../store/context";
import OrderService from "../../services/orderService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Link} from "react-router-dom";

const WaitOrder = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { state, dispatch } = useContext(UserContext);
    const [req] = useState({status: 1});
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

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">

                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>ORDERS</h1>
                        <Link to={"/orders/entire"} style={{ margin: '24px 0' }}>
                            <button style={{}} className="btn btn-success">
                                Entire Order
                            </button>
                        </Link>

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
                                <th style={{textAlign: 'center'}}>Status</th>
                                <th style={{textAlign: 'center'}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                order.map((e, k) => {
                                    return (
                                        <tr key={k}>
                                            <td >{k + 1}</td>
                                            <td >{e.name}</td>
                                            <td >{e.address}</td>
                                            <td >{e.email}</td>
                                            <td >{e.phone}</td>
                                            <td >{e.totalMoney}</td>
                                            <td >{e.createDate}</td>
                                            <td >{e.note}</td>
                                            <td >{e.status}</td>
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
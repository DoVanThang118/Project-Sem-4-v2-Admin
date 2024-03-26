import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Box, MenuItem, Select, TextareaAutosize, TextField, useTheme} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {tokens} from "../../theme";
import UserContext from "../../store/context";
import {Form, Formik} from "formik";
import orderService from "../../services/orderService";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";
import OrderService from "../../services/orderService";

const DetailOrder = (props) => {

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { state, dispatch } = useContext(UserContext);
    const {id} = useParams();
    const [req] = useState({id: id});
    const [order, setOrder] = useState({});
    useEffect(() => {
        OrderService.findOrders(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setOrder(res.data[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "Waiting for order confirmation";
            case 2:
                return "Order confirmed, payment pending";
            case 3:
                return "Payment confirmed";
            case 4:
                return "Shipping";
            case 5:
                return "Completed";
            case 0:
                return "Cancelled";
            default:
                return "Unknown";
        }
    };


    const cancel = () => {
        navigate("/orders/entire");
    };

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">
                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>DETAIL ORDER</h1>
                        <div style={{ padding: "40px 24px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Box display="grid" width="30%">
                                    <label>Name: </label>
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        name="name"
                                        value={order.name|| ''}
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="30%">
                                    <label>Email: </label>
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        name="email"
                                        value={order.email|| ''}
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="30%">
                                    <label>Phone: </label>
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        name="phone"
                                        value={order.phone|| ''}
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                            </div>
                            <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                <Box display="grid" width="30%">
                                    <label>Status: </label>
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        name="status"
                                        value={getStatusText(order.status) || ''}
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="30%">
                                    <label>Date: </label>
                                    <TextField
                                        variant="filled"
                                        type="datetime-local"
                                        name="createDate"
                                        value={order.createDate|| ''}
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="30%">
                                    <label>Total Money: </label>
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        name="totalMoney"
                                        value={order.totalMoney + ' $'|| ''}
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                            </div>
                            <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                <Box display="grid" width="45%">
                                    <label>Note: </label>
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        name="note"
                                        value={order.note || ''}
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="45%">
                                    <label>Address: </label>
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        name="address"
                                        value={order.address|| ''}
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                            </div>

                            <h3 style={{ margin: 'auto', marginTop: '24px' }}>DETAIL USER</h3>

                            <table className="table  table-bordered" style={{}}>
                                <thead>
                                <tr>
                                    <th style={{textAlign: 'center', width: '5%'}}>STT</th>
                                    <th style={{textAlign: 'center', width: '5%'}}>Image</th>
                                    <th style={{textAlign: 'center'}}>Name</th>
                                    <th style={{textAlign: 'center'}}>Type</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    order.users && order.users.map((e, k) => {
                                        return (
                                            <tr key={k}>
                                                <td style={{textAlign: 'center', width: '5%'}}>{k + 1}</td>
                                                <td style={{textAlign: 'center', width: '5%'}} >
                                                    {e.images && e.images.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image.url}
                                                            width={50}
                                                            style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                                            alt={`gif-${index}`}
                                                        />
                                                    ))}
                                                    {(!e.images || e.images.length === 0) && (
                                                        <img
                                                            width={50}
                                                            style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU"
                                                            className="rounded-circle "
                                                        />
                                                    )}
                                                </td>
                                                <td >{e.name}</td>
                                                <td >{e.type}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>

                            <h3 style={{ margin: 'auto', marginTop: '24px' }}>DETAIL ITEM</h3>

                            <table className="table  table-bordered" style={{}}>
                                <thead>
                                <tr>
                                    <th style={{textAlign: 'center', width: '5%'}}>STT</th>
                                    <th style={{textAlign: 'center', width: '5%'}}>Image</th>
                                    <th style={{textAlign: 'center'}}>Name</th>
                                    <th style={{textAlign: 'center', width: '5%'}}>Price</th>
                                    <th style={{textAlign: 'center', width: '5%'}}>Quantity</th>
                                    <th style={{textAlign: 'center', width: '5%'}}>Total</th>
                                    <th style={{textAlign: 'center'}}>Type</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    order.orderDetails && order.orderDetails.map((e, k) => {
                                        return (
                                            <tr key={k}>
                                                <td style={{textAlign: 'center', width: '5%'}}>{k + 1}</td>
                                                <td style={{textAlign: 'center', width: '5%'}} >
                                                    {e.product.images && e.product.images.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image.url}
                                                            width={90}
                                                            style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                                            alt={`gif-${index}`}
                                                        />
                                                    ))}
                                                </td>
                                                <td >{e.product.name}</td>
                                                <td style={{textAlign: 'center', width: '5%'}}>{e.price}</td>
                                                <td style={{textAlign: 'center', width: '5%'}}>{e.qty}</td>
                                                <td style={{textAlign: 'center', width: '5%'}}>{e.total} $</td>
                                                <td >{e.product.type}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>

                            <Box
                                display="flex"
                                justifyContent="end"
                                mt="20px"
                            >
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={cancel}
                                    style={{ marginLeft: "10px" }}
                                >
                                    cancel
                                </button>
                            </Box>
                        </div>
                    </div>
                </Box>
            </main>
        </div>
    )
}
export default DetailOrder;
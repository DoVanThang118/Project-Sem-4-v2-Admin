import useMediaQuery from "@mui/material/useMediaQuery";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../store/context";
import OrderService from "../../services/orderService";
import Swal from "sweetalert2";
import BrandService from "../../services/brandService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Box, TextareaAutosize, TextField} from "@mui/material";
import {Form, Formik} from "formik";
import UserService from "../../services/userService";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ConfirmOrder = (props) => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const { state, dispatch } = useContext(UserContext);
    const { id } = useParams();
    const [req] = useState({id: id});
    const [shipperReq, setShipperReq] = useState({
        type: "shipper",
        restaurantId: ''
    });
    const [shipper, setShipper] = useState([]);
    const [order, setOrder] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        note: '',
        status: '',
        shipperId: ''
    });
    const [item, setItem] = useState([])

    console.log("order: ",order)
    console.log("shipper: ",shipper)

    useEffect(() => {
        OrderService.findOrders(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const first = res.data[0];
                    setItem(first.orderDetails);
                    setShipperReq({
                        type: '',
                        restaurantId: first.restaurant.id || ''
                    });
                    setOrder({
                        name: first.name || '',
                        email: first.email || '',
                        address: first.address || '',
                        phone: first.phone || '',
                        note: first.note || '',
                        status: first.status + 2 || ''
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        UserService.findUsers(shipperReq)
            .then((res) => {
                setShipper(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleShipperSelect = (event) => {
        setOrder({...order, shipperId: event.target.value});
    };

    const handleChange = (event) => {
        setOrder((prevDetails) => ({
            ...prevDetails,
            [event.target.name]: event.target.value,
        }));
    };

    const handleUpdate = async (e) => {
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure confirm?',
            text: "You won't be able to revert this!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(order)
                const t = await OrderService.updateOrder(order,id);
                if (t != null) {
                    Swal.fire(
                        'Confirm Success!',
                        'Your file has been confirm.',
                        'success'
                    )
                    return navigate("/orders");

                }
            }
        })
    }
    const deleteOder = async () => {

        Swal.fire({
            title: 'Are you sure delete?',
            text: "You won't be able to revert this!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await OrderService.updateOrder({status: 0}, id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/orders");
                }
            }
        })
    }
    const waiting = () => {
        navigate("/orders");
    };

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">
                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>DETAIL ORDER</h1>
                        <Formik initialValues={order} onSubmit={handleUpdate}>
                            <Form style={{ padding: "40px 24px" }}>
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Box display="grid" width="30%">
                                            <label>Name: </label>
                                            <TextField
                                                variant="filled"
                                                type="text"
                                                onChange={handleChange}
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
                                                onChange={handleChange}
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
                                                onChange={handleChange}
                                                name="phone"
                                                value={order.phone|| ''}
                                                sx={{ gridColumn: "span 2" }}
                                                required
                                            />
                                        </Box>
                                    </div>
                                    <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                        <Box display="grid" width="30%" marginRight="1rem">
                                            <label>Shipper: </label>
                                            <FormControl variant="filled">
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="shipper"
                                                    value={order.shipperId || ''}
                                                    onChange={handleShipperSelect}
                                                    required
                                                >
                                                    <MenuItem value="" disabled>Select a shipper</MenuItem>
                                                    {shipper.map((shipper) => (
                                                        <MenuItem key={shipper.id} value={shipper.id}>
                                                            {shipper.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                    <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                        <Box display="grid" width="45%">
                                            <label>Note: </label>
                                            <TextField
                                                variant="filled"
                                                type="text"
                                                onChange={handleChange}
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
                                                onChange={handleChange}
                                                name="address"
                                                value={order.address|| ''}
                                                sx={{ gridColumn: "span 2" }}
                                                required
                                            />
                                        </Box>
                                    </div>

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
                                            item.map((e, k) => {
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
                                        <button type="submit" className="btn btn-outline-success" variant="contained">
                                            Confirm
                                        </button>
                                        <button type="button" style={{ marginLeft: 10 }} onClick={deleteOder} className="btn btn-outline-danger" variant="contained">
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={waiting}
                                            style={{ marginLeft: "10px" }}
                                        >
                                            Waiting
                                        </button>
                                    </Box>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </Box>
            </main>
        </div>
    )
}

export default ConfirmOrder;
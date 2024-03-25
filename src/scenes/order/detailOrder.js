import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Box, MenuItem, Select, TextareaAutosize, TextField, useTheme} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {tokens} from "../../theme";
import UserContext from "../../store/context";
import {Formik} from "formik";
import orderService from "../../services/orderService";
import Swal from "sweetalert2";

const DetailOrder = (props) => {

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { state, dispatch } = useContext(UserContext);
    const {id} = useParams();
    const [req] = useState({id: id});
    const [order, setOrder] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        note: '',
        status: ''
    });
    const [orderDetail, setOrderDetail] = useState([])


    useEffect(() => {
        orderService.findOrders(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const first = (res.data[0])
                    setOrder({
                        name: first.name || '',
                        email: first.email || '',
                        address: first.address || '',
                        phone: first.phone || '',
                        note: first.note || '',
                        status: first.status || ''
                    });
                    setOrderDetail(first.orderDetails)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (event) => {
        setOrder((prevDetails) => ({
            ...prevDetails,
            [event.target.name]: event.target.value,
        }));
    };

    const handleShipperSelect = (event) => {
        setOrder({ ...order,brandId: event.target.value  });
    };

    const handleUpdate = async (e) => {
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure update?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await orderService.updateOrder(order,id);
                if (t != null) {
                    await Swal.fire(
                        'Update Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/orders");

                }
            }
        })
    }

    const cancel = () => {
        navigate("/orders");
    };

    return (
        <div className="app">

            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">
                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>Action Product</h1>
                        <Formik initialValues={order} onSubmit={handleUpdate}>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                    <label>Name: </label>
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        onChange={handleChange}
                                        value={order.name || ''}
                                        name="name"
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                    <label>Price: </label>
                                    <TextField
                                        variant="filled"
                                        type="number"
                                        onChange={handleChange}
                                        value={order.price || ''}
                                        name="price"
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                    <label>Quantity: </label>
                                    <TextField
                                        variant="filled"
                                        type="number"
                                        onChange={handleChange}
                                        value={order.qty || ''}
                                        name="qty"
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                    <label>Rating: </label>
                                    <TextField
                                        variant="filled"
                                        type="number"
                                        onChange={handleChange}
                                        value={order.rate || ''}
                                        name="rate"
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                                <Box display="grid" width="30%" marginRight="1rem">
                                    <label>Category:</label>
                                    <Select
                                        value={order.categoryId}
                                        onChange={handleShipperSelect}
                                        variant="filled"
                                        className="form-select form-select-lg mb-3"
                                        required
                                    >
                                        <MenuItem value="" disabled>Select a restaurant</MenuItem>
                                        {order.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </div>
                            <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                <Box display="grid" width="100%">
                                    <label>Description: </label>
                                    <TextareaAutosize
                                        variant="filled"
                                        type="text"
                                        onChange={handleChange}
                                        value={order.description || ''}
                                        name="description"
                                        sx={{ gridColumn: "span 2" }}
                                        required
                                    />
                                </Box>
                            </div>

                            <table className="table  table-bordered" style={{}}>
                                <thead>
                                <tr>
                                    <th style={{textAlign: 'center'}}>STT</th>
                                    <th style={{textAlign: 'center'}}>Image</th>
                                    <th style={{textAlign: 'center'}}>Name</th>
                                    <th style={{textAlign: 'center'}}>Price</th>
                                    <th style={{textAlign: 'center'}}>Quantity</th>
                                    <th style={{textAlign: 'center'}}>Type</th>
                                    <th style={{textAlign: 'center'}}>rating</th>
                                    <th style={{textAlign: 'center'}}>Category</th>
                                    <th style={{ textAlign: 'center', width: '20%'}}>Description</th>
                                    <th style={{textAlign: 'center'}}>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    order.orderDetails.map((e, k) => {
                                        return (
                                            <tr key={k}>
                                                <td >{k + 1}</td>
                                                <td >
                                                    {e.images && e.images.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image.url}
                                                            width={90}
                                                            style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                                            alt={`gif-${index}`}
                                                        />
                                                    ))}
                                                </td>
                                                <td >{e.name}</td>
                                                <td >{e.price}</td>
                                                <td >{e.qty}</td>
                                                <td >{e.type}</td>
                                                <td >{e.rate}</td>
                                                <td >{e.category.name} </td>
                                                <td >{e.description}</td>
                                                <td style={{}}>
                                                    <Link to={"/products/detail/" + e.id}>
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

                            <Box
                                display="flex"
                                justifyContent="end"
                                mt="20px"
                                style={{}}
                            >
                                <button type="submit" className="btn btn-outline-success" variant="contained">
                                    EDIT
                                </button>
                                {/*<button type="button" style={{marginLeft: 10}} onClick={deleteProduct}*/}
                                {/*        className="btn btn-outline-danger" variant="contained">*/}
                                {/*    DELETE*/}
                                {/*</button>*/}
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={cancel}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancel
                                </button>
                            </Box>
                        </Formik>
                    </div>
                </Box>
            </main>
        </div>
    )
}
export default DetailOrder;
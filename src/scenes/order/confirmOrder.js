import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../store/context";
import OrderService from "../../services/orderService";
import Swal from "sweetalert2";
import BrandService from "../../services/brandService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Box, TextareaAutosize, TextField} from "@mui/material";
import {Form, Formik} from "formik";

const ConfirmOrder = (props) => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const { state, dispatch } = useContext(UserContext);
    const { id } = useParams();
    const [req] = useState({id: id});
    const [order, setOrder] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        note: '',
        status: ''
    });

    console.log("order: ",order)

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
                const t = await BrandService.updateBrand(order,id);
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
                const t = await BrandService.updateBrand({status: 0});
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
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>DETAIL BRAND</h1>
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
                                        <Box display="grid" width="45%">
                                            <label>Description: </label>
                                            <TextareaAutosize
                                                variant="filled"
                                                type="text"
                                                onChange={handleChange}
                                                name="description"
                                                value={order.description|| ''}
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

                                    <Box
                                        display="flex"
                                        justifyContent="end"
                                        mt="20px"
                                    >
                                        <button type="submit" className="btn btn-outline-success" variant="contained">
                                            EDIT
                                        </button>
                                        <button type="button" style={{ marginLeft: 10 }} onClick={deleteOder} className="btn btn-outline-danger" variant="contained">
                                            DELETE
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={cancel}
                                            style={{ marginLeft: "10px" }}
                                        >
                                            Cancel
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
// import {Box, TextareaAutosize, TextField} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../store/context";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {useNavigate, useParams} from "react-router-dom";
import ProductService from "../../services/productService";
import RestaurantService from "../../services/restaurantService";
import CategoryService from "../../services/categoryService";
import Swal from "sweetalert2";
import productService from "../../services/productService";
import {Box, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";



const ActionProduct = () => {
    const navigate = useNavigate();

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const { state, dispatch } = useContext(UserContext);
    const [file,setFile] = useState({
        img: ''
    });
    const {id} = useParams();
    const [req] = useState({id: id});
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        qty: '',
        rate: '',
        price: '',
        type: '',
        categoryId: '',
        restaurantId: ''
    });

    useEffect(() => {
        productService.findProducts(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setProductDetails(res.data[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (event) => {
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [event.target.name]: event.target.value,
        }));
    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getCategories()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleCategorySelect = (event) => {
        setProductDetails({ ...productDetails, categoryId: event.target.value });
    };

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        RestaurantService.getRestaurants()
            .then((res) => {
                setRestaurants(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleRestaurantSelect = (event) => {
        setProductDetails({ ...productDetails, restaurantId: event.target.value });
    };

    const handleFileChange = (event) => {
        productDetails.img = event.target.files;
        setFile(productDetails);
    };


    const handleTypeSelect = (event) => {
        setProductDetails({ ...productDetails, type: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        ProductService.createProduct(productDetails)
            .then((res) => {
                navigate("/products");
            })
            .catch((error) => {
                alert("Please Provided valid information");
            });
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
                console.log(productDetails)
                const t = await RestaurantService.updateRestaurant(productDetails, id);
                if (t != null) {
                    await Swal.fire(
                        'Update Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/products");

                }
            }
        })
    }

    const openProduct = async () => {

        Swal.fire({
            title: 'Are you sure open Brand?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await ProductService.updateProduct({status: 1},id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/brands");
                }
            }
        })
    }

    const closedProduct = async () => {

        Swal.fire({
            title: 'Are you sure closed Brand?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await ProductService.updateProduct({status: 0},id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/brands");
                }
            }
        })
    }
    const deleteProduct = async () => {

        Swal.fire({
            title: 'Are you sure delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await productService.deleteProduct(id);
                if (t != null) {
                    await Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/products");
                }
            }
        })
    }

    const updateAvatar = async () => {

        Swal.fire({
            title: 'Are you sure update Image ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await RestaurantService.updateAvatar(file, id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    ).then(() => {
                        window.location.reload();
                    });
                }
            }
        })
    }

    const cancel = () => {
        navigate("/products");
    };

    console.log("productDetails",productDetails);

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">
                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>Action Product</h1>
                        <Formik initialValues={productDetails} onSubmit={handleUpdate}>
                            <form onSubmit={handleSubmit} style={{ padding: "40px 24px" }}>
                                <div className="container rounded">
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                {productDetails.images && productDetails.images.length > 0 ? (
                                                    productDetails.images.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image.url}
                                                            id="profile-image"
                                                            width={225}
                                                            style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                                        />
                                                    ))
                                                ) : (
                                                    <img
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU"
                                                        id="profile-image"
                                                        style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                                    />
                                                )}
                                                <br/>
                                                <div >
                                                    <div className="input-group">
                                                        <input
                                                            type="file"
                                                            onChange={handleFileChange}
                                                            name="img"
                                                            className="form-control"
                                                            id="inputGroupFile04"
                                                            aria-describedby="inputGroupFileAddon04"
                                                            aria-label="Upload"
                                                            multiple
                                                        />
                                                        <button className="btn btn-outline-secondary" type="button" onClick={updateAvatar} id="inputGroupFileAddon04">Upload</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7 ">
                                            <div className="p-3 py-5">
                                                <div className="row mt-2">
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <label>Name: </label>
                                                            <TextField
                                                                variant="filled"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={productDetails.name || ''}
                                                                name="name"
                                                                sx={{ gridColumn: "span 2" }}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <label>Price: </label>
                                                            <TextField
                                                                variant="filled"
                                                                type="number"
                                                                onChange={handleChange}
                                                                value={productDetails.price || ''}
                                                                name="price"
                                                                sx={{ gridColumn: "span 2" }}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <label>Quantity: </label>
                                                            <TextField
                                                                variant="filled"
                                                                type="number"
                                                                onChange={handleChange}
                                                                value={productDetails.qty || ''}
                                                                name="qty"
                                                                sx={{ gridColumn: "span 2" }}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <label>Rating: </label>
                                                            <TextField
                                                                variant="filled"
                                                                type="number"
                                                                onChange={handleChange}
                                                                value={productDetails.rate || ''}
                                                                name="rate"
                                                                sx={{ gridColumn: "span 2" }}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <label>Category:</label>
                                                            <Select
                                                                value={productDetails.categoryId}
                                                                onChange={handleCategorySelect}
                                                                variant="filled"
                                                                className="form-select form-select-lg mb-3"
                                                                required
                                                            >
                                                                <MenuItem value="" disabled>Select a restaurant</MenuItem>
                                                                {categories.map((category) => (
                                                                    <MenuItem key={category.id} value={category.id}>
                                                                        {category.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </Box>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <label>Restaurant: </label>
                                                            <Select
                                                                value={productDetails.restaurantId}
                                                                onChange={handleRestaurantSelect}
                                                                variant="filled"
                                                                className="form-select form-select-lg mb-3"
                                                                required
                                                            >
                                                                <MenuItem value="" disabled>Select a restaurant</MenuItem>
                                                                {restaurants.map((restaurant) => (
                                                                    <MenuItem key={restaurant.id} value={restaurant.id}>
                                                                        {restaurant.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <label>Type: </label>
                                                            <Select
                                                                value={productDetails.type}
                                                                onChange={handleTypeSelect}
                                                                variant="filled"
                                                                className="form-select form-select-lg mb-3"
                                                                required
                                                            >
                                                                <MenuItem selected disabled value="">Open this select brand</MenuItem>
                                                                <MenuItem value="Breakfast, Brunch">Breakfast</MenuItem>
                                                                <MenuItem value="Lunch">Lunch</MenuItem>
                                                                <MenuItem value="Brunch">Brunch</MenuItem>
                                                            </Select>
                                                        </Box>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <label>Description: </label>
                                                            <textarea
                                                                rows="4"
                                                                cols="50"
                                                                variant="filled"
                                                                name="description"
                                                                placeholder="Nhập mô tả..."
                                                                value={productDetails.description || ''}
                                                                onChange={handleChange}
                                                                required
                                                            ></textarea>
                                                        </Box>
                                                    </div>
                                                </div>
                                            </div>
                                            <Box
                                                display="flex"
                                                justifyContent="end"
                                                mt="20px"
                                                style={{}}
                                            >
                                                <button type="submit" className="btn btn-outline-success" variant="contained">
                                                    EDIT
                                                </button>
                                                {productDetails.status === 1 ? (
                                                    <button type="button" style={{ marginLeft: 10 }} onClick={closedProduct} className="btn btn-outline-danger" variant="contained">
                                                        CLOSED
                                                    </button>
                                                ) : (
                                                    <button type="button" style={{ marginLeft: 10 }} onClick={openProduct} className="btn btn-outline-success" variant="contained">
                                                        OPEN
                                                    </button>
                                                )}
                                                <button type="button" style={{marginLeft: 10}} onClick={deleteProduct}
                                                        className="btn btn-outline-danger" variant="contained">
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
                                    </div>
                                </div>
                            </form>
                        </Formik>
                    </div>
                </Box>
            </main>
        </div>
    );
};

export default ActionProduct;

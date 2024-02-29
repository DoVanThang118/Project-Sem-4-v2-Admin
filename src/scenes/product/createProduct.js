import {Box, TextareaAutosize, TextField} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../store/context";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {useNavigate} from "react-router-dom";
import ProductService from "../../services/productService";
import RestaurantService from "../../services/restaurantService";
import BrandService from "../../services/brandService";
import CategoryService from "../../services/categoryService";


const CreateProduct = () => {
    const navigate = useNavigate();

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const { state, dispatch } = useContext(UserContext);
    const [file,setFile] = useState(null);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        qty: '',
        rate: '0',
        price: '',
        type: '',
        categoryId: '',
        restaurantId: '',
        img: ''
    });

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

    const handleChange = (event) => {
        product[event.target.name] = event.target.value;
        setProduct(product);
    };

    const handleFileChange = (event) => {
        product.img = event.target.files;
        setFile(product);
    };

    const handleCategorySelect = (event) => {
        setProduct({ ...product, categoryId: event.target.value });
    };
    const handleTypeSelect = (event) => {
        setProduct({ ...product, type: event.target.value });
    };

    const handleRestaurantSelect = (event) => {
        setProduct({ ...product, restaurantId: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        ProductService.createProduct(product)
            .then((res) => {
                navigate("/products");
            })
            .catch((error) => {
                alert("Please Provided valid information");
            });
    };
    const cancel = () => {
        navigate("/products");
    };

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">
                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>CREATE PRODUCT</h1>
                        <Formik>
                            <form onSubmit={handleSubmit} style={{ padding: "40px 24px" }}>

                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Box display="grid" width="30%">
                                        <label>Name: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="name"
                                            sx={{ gridColumn: "span 2" }}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%">
                                        <label>Price: </label>
                                        <TextField
                                            variant="filled"
                                            type="number"
                                            onChange={handleChange}
                                            name="price"
                                            sx={{ gridColumn: "span 2" }}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%">
                                        <label>Quantity: </label>
                                        <TextField
                                            variant="filled"
                                            type="number"
                                            onChange={handleChange}
                                            name="qty"
                                            sx={{ gridColumn: "span 2" }}
                                            required
                                        />
                                    </Box>
                                </div>
                                <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                    <Box display="grid" width="30%">
                                        <label>Type: </label>
                                        <select
                                            value={product.type}
                                            onChange={handleTypeSelect}
                                            variant="filled"
                                            className="form-select form-select-lg mb-3"
                                            required
                                        >
                                            <option selected disabled value="">Open this select brand</option>
                                            <option value="morning">morning</option>
                                            <option value="noon">noon</option>
                                            <option value="evening">evening</option>
                                        </select>
                                    </Box>
                                    <Box display="grid" width="30%">
                                        <label>Category: </label>
                                        <select
                                            value={product.categoryId}
                                            onChange={handleCategorySelect}
                                            variant="filled"
                                            className="form-select form-select-lg mb-3"
                                            required
                                        >
                                            <option selected disabled value="">Open this select brand</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                    <Box display="grid" width="30%">
                                        <label>Restaurant: </label>
                                        <select
                                            value={product.restaurantId}
                                            onChange={handleRestaurantSelect}
                                            variant="filled"
                                            className="form-select form-select-lg mb-3"
                                            required
                                        >
                                            <option selected disabled value="">Open this select brand</option>
                                            {restaurants.map((restaurant) => (
                                                <option key={restaurant.id} value={restaurant.id}>
                                                    {restaurant.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                </div>
                                <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                    <Box display="grid" width="100%">
                                        <label>Description: </label>
                                        <TextareaAutosize
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="description"
                                            sx={{ gridColumn: "span 2" }}
                                            required
                                        />
                                    </Box>
                                </div>
                                <div style={{marginTop: 40, display:'flex', alignItems:'flex-end'}}>
                                    <Box display="grid" width="48%">
                                        <label htmlFor="avatar" className="form-label">
                                            Image :
                                        </label>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            name="img"
                                            className="form-control"
                                            id="avatar"
                                            multiple
                                        />
                                    </Box>
                                </div>

                                <Box
                                    display="flex"
                                    justifyContent="end"
                                    mt="20px"
                                    style={{}}
                                >
                                    <button type="submit" className="btn btn-success" variant="contained">
                                        CREATE
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={cancel}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Cancel
                                    </button>
                                </Box>
                            </form>
                        </Formik>
                    </div>
                </Box>
            </main>
        </div>
    );
};

export default CreateProduct;

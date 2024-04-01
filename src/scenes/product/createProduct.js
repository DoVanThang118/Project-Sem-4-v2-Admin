// import {Box, OutlinedInput, Select, TextareaAutosize, TextField} from "@mui/material";
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
// import {MenuItem} from "react-pro-sidebar";
import Swal from "sweetalert2";
import {Box, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";

const CreateProduct = () => {
    const navigate = useNavigate();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const types = [
        'morning',
        'abc',
        'xyz'
    ];
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
        CategoryService.findCategories({status: 1})
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log("create product categories:",categories)
    const handleCategorySelect = (event) => {
        setProduct({ ...product, categoryId: event.target.value });
    };

    const [restaurantsProduct, setRestaurantsProduct] = useState([]);

    useEffect(() => {
        RestaurantService.findRestaurants({status: 1})
            .then((res) => {
                setRestaurantsProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleRestaurantSelect  = (event) => {
        setProduct({ ...product, restaurantId: event.target.value });
    };

    const handleChange = (event) => {
        product[event.target.name] = event.target.value;
        setProduct(product);
    };

    const handleFileChange = (event) => {
        product.img = event.target.files;
        setFile(product);
    };


    const handleTypeSelect = (event) => {
        setProduct({ ...product, type: event.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        ProductService.createProduct(product)
            .then(async (res) => {
                await Swal.fire(
                    'Update Success!',
                    'Your file has been update.',
                    'success'
                )
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
                                    <Box display="grid" width="45%">
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
                                    <Box display="grid" width="45%">
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
                                    {/*<Box display="grid" width="30%">*/}
                                    {/*    <label>Quantity: </label>*/}
                                    {/*    <TextField*/}
                                    {/*        variant="filled"*/}
                                    {/*        type="number"*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        name="qty"*/}
                                    {/*        sx={{ gridColumn: "span 2" }}*/}
                                    {/*        required*/}
                                    {/*    />*/}
                                    {/*</Box>*/}
                                </div>
                                <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                    <Box display="grid" width="30%">
                                        <label>Type: </label>
                                        <Select
                                            value={product.type}
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


                                        {/*<Select*/}
                                        {/*    labelId="demo-multiple-name-label"*/}
                                        {/*    id="demo-multiple-name"*/}
                                        {/*    multiple*/}
                                        {/*    value={product.type}*/}
                                        {/*    onChange={handleTypeSelect}*/}
                                        {/*    input={<OutlinedInput label="Name" />}*/}
                                        {/*    MenuProps={MenuProps}*/}
                                        {/*>*/}
                                        {/*    {types.map((name) => (*/}
                                        {/*        <MenuItem*/}
                                        {/*            key={name}*/}
                                        {/*            value={name}*/}
                                        {/*        >*/}
                                        {/*            {name}*/}
                                        {/*        </MenuItem>*/}
                                        {/*    ))}*/}
                                        {/*</Select>*/}
                                    </Box>
                                    {/*<Box display="grid" width="30%">*/}
                                    {/*    <label>Category: </label>*/}
                                    {/*    <select*/}
                                    {/*        value={product.categoryId}*/}
                                    {/*        onChange={handleCategorySelect}*/}
                                    {/*        variant="filled"*/}
                                    {/*        className="form-select form-select-lg mb-3"*/}
                                    {/*        required*/}
                                    {/*    >*/}
                                    {/*        <option selected disabled value="">Open this select brand</option>*/}
                                    {/*        {categories.map((category) => (*/}
                                    {/*            <option key={category.id} value={category.id}>*/}
                                    {/*                {category.name}*/}
                                    {/*            </option>*/}
                                    {/*        ))}*/}
                                    {/*    </select>*/}
                                    {/*</Box>*/}

                                    <Box display="grid" width="30%">
                                        <label>Category: </label>
                                        <Select
                                            value={product.categoryId}
                                            onChange={handleCategorySelect}
                                            variant="filled"
                                            className="form-select form-select-lg mb-3"
                                            required
                                        >
                                            <MenuItem value="" disabled>Select a category</MenuItem>
                                            {categories.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>

                                    <Box display="grid" width="30%">
                                        <label>Restaurant: </label>
                                        <Select
                                            value={product.restaurantId}
                                            onChange={handleRestaurantSelect}
                                            variant="filled"
                                            className="form-select form-select-lg mb-3"
                                            required
                                        >
                                            <MenuItem value="" disabled>Select a restaurant</MenuItem>
                                            {restaurantsProduct.map((restaurant) => (
                                                <MenuItem key={restaurant.id} value={restaurant.id}>
                                                    {restaurant.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>

                                    {/*<Box display="grid" width="30%">*/}
                                    {/*    <label htmlFor="brandSelect">Restaurant: </label>*/}
                                    {/*    <Select*/}
                                    {/*        id="brandSelect"*/}
                                    {/*        value={product.brandId}*/}
                                    {/*        onChange={handleRestaurantSelect}*/}
                                    {/*        variant="filled"*/}
                                    {/*        className="form-select form-select-lg mb-3"*/}
                                    {/*        required*/}
                                    {/*    >*/}
                                    {/*        <MenuItem value="" disabled>*/}
                                    {/*            Open this select brand*/}
                                    {/*        </MenuItem>*/}
                                    {/*        {restaurants.map((brand) => (*/}
                                    {/*            <MenuItem key={brand.id} value={brand.id}>*/}
                                    {/*               {brand.name}*/}
                                    {/*            </MenuItem>*/}
                                    {/*        ))}*/}
                                    {/*    </Select>*/}
                                    {/*</Box>*/}

                                    {/*<Box display="grid" width="30%">*/}
                                    {/*    <label>Restaurant: </label>*/}
                                    {/*    <select*/}
                                    {/*        value={product.restaurantId}*/}
                                    {/*        onChange={handleRestaurantSelect}*/}
                                    {/*        variant="filled"*/}
                                    {/*        className="form-select form-select-lg mb-3"*/}
                                    {/*        required*/}
                                    {/*    >*/}
                                    {/*        <option selected disabled value="">Open this select brand</option>*/}
                                    {/*        {restaurants.map((restaurant) => (*/}
                                    {/*            <option key={restaurant.id} value={restaurant.id}>*/}
                                    {/*                {restaurant.name}*/}
                                    {/*            </option>*/}
                                    {/*        ))}*/}
                                    {/*    </select>*/}
                                    {/*</Box>*/}
                                </div>
                                <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                    <Box display="grid" width="100%">
                                        <label>Description: </label>
                                        <textarea
                                            rows="4"
                                            cols="50"
                                            variant="filled"
                                            name="description"
                                            placeholder="description ..."
                                            onChange={handleChange}
                                            required
                                        ></textarea>
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

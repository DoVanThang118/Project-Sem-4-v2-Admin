import {Box, Select, TextareaAutosize, TextField} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../store/context";
import BrandService from "../../services/brandService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {useNavigate} from "react-router-dom";
import RestaurantService from "../../services/restaurantService";
import {MenuItem} from "react-pro-sidebar";


const CreateRestaurant = () => {

    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const { state, dispatch } = useContext(UserContext);
    const [file,setFile] = useState(null);
    const [restaurant, setRestaurant] = useState({
        name: '',
        description: '',
        tel: '',
        address: '',
        brandId: '',
        img: ''
    });
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        BrandService.getBrands()
            .then((res) => {
                setBrands(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (event) => {
        restaurant[event.target.name] = event.target.value;
        setRestaurant(restaurant);
    };

    const handleFileChange = (event) => {
        restaurant.img = event.target.files;
        setFile(restaurant);
    };

    const handleBrandSelect = (event) => {
        setRestaurant({ ...restaurant, brandId: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(restaurant);
        RestaurantService.createRestaurant(restaurant)
            .then((res) => {
                navigate("/restaurants");
            })
            .catch((error) => {
            });
    };
    const cancel = () => {
        navigate("/restaurants");
    };

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">
                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>CREATE RESTAURANT</h1>
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
                                        <label>Telephone: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="tel"
                                            sx={{ gridColumn: "span 2" }}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%">
                                        <label>Address: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="address"
                                            sx={{ gridColumn: "span 2" }}
                                            required
                                        />
                                    </Box>
                                </div>
                                <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                                    <Box display="grid" width="20%">
                                        <label>Brand: </label>
                                        <select
                                            value={restaurant.brandId}
                                            onChange={handleBrandSelect}
                                            variant="filled"
                                            className="form-select form-select-lg mb-3"
                                            required
                                        >
                                            <option selected disabled value="">Open this select brand</option>
                                            {brands.map((brand) => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
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

                                <Box display="flex" justifyContent="end" mt="20px" style={{}}>
                                    <button type="submit" className="btn btn-success" variant="contained">
                                        CREATE
                                    </button>
                                    <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>
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

export default CreateRestaurant;
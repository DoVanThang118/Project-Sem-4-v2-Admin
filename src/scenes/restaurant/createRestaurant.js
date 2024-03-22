// import {Box, Select, TextareaAutosize, TextField} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../store/context";
import BrandService from "../../services/brandService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {useNavigate} from "react-router-dom";
import RestaurantService from "../../services/restaurantService";
// import {MenuItem} from "react-pro-sidebar";
import {TimePicker} from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import {Box, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";

const CreateRestaurant = () => {

    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const {state, dispatch} = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [restaurant, setRestaurant] = useState({
        name: '',
        description: '',
        tel: '',
        address: '',
        brandId: '',
        cuisines: '',
        meals: '',
        hourStart: '',
        hourEnd: '',
        rate: '',
        status: '',
        img:''
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

    const handleBrandSelect = (event) => {
        setRestaurant({...restaurant, brandId: event.target.value});
    };

    const handleChange = (event) => {
        restaurant[event.target.name] = event.target.value;
        setRestaurant(restaurant);
    };

    const handleFileChange = (event) => {
        restaurant.img = event.target.files;
        setFile(restaurant);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        RestaurantService.createRestaurant(restaurant)
            .then(async (res) => {
                await Swal.fire(
                    'Update Success!',
                    'Your file has been update.',
                    'success'
                )
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
            <Sidebar/>
            <main className="content">
                <Topbar/>
                <Box m="20px">
                    <div className="container shadow" style={{display: 'grid'}}>
                        <h1 style={{margin: 'auto', marginTop: '24px'}}>CREATE RESTAURANT</h1>
                        <Formik>
                            <form onSubmit={handleSubmit} style={{padding: "40px 24px"}}>
                                <div style={{display: "flex", flexWrap: "wrap"}}>
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Name: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="name"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Telephone: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="tel"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Address: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="address"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box></Box>
                                    {/*<Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">*/}
                                    {/*    <TimePicker label="Basic time picker" />*/}
                                    {/*</Box>*/}
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Open: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="hourStart"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Close: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="hourEnd"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Meals: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="meals"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Cuisines: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="cuisines"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Rate: </label>
                                        <TextField
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="rate"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                        <label>Status: </label>
                                        <TextField
                                            variant="filled"
                                            type="number"
                                            onChange={handleChange}
                                            name="status"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                    <Box display="grid" width="30%" marginRight="1rem">
                                        <label>Brand: </label>
                                        <Select
                                            value={restaurant.brandId}
                                            onChange={handleBrandSelect}
                                            variant="filled"
                                            className="form-select form-select-lg mb-3"
                                            required
                                        >
                                            <MenuItem value="" disabled>Select a restaurant</MenuItem>
                                            {brands.map((brand) => (
                                                <MenuItem key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>

                                </div>
                                <div style={{marginTop: 10, display: "flex", justifyContent: "space-between"}}>
                                    {/*<Box display="grid" width="20%">*/}
                                    {/*    <label htmlFor="brandSelect">Brand: </label>*/}
                                    {/*    <Select*/}
                                    {/*        id="brandSelect"*/}
                                    {/*        value={restaurant.brandId}*/}
                                    {/*        onChange={handleBrandSelect}*/}
                                    {/*        variant="filled"*/}
                                    {/*        className="form-select form-select-lg mb-3"*/}
                                    {/*        required*/}
                                    {/*    >*/}
                                    {/*        <MenuItem value="" disabled>*/}
                                    {/*            Open this select brand*/}
                                    {/*        </MenuItem>*/}
                                    {/*        {brands.map((brand) => (*/}
                                    {/*            <MenuItem key={brand.id} value={brand.id}>*/}
                                    {/*                {brand.name}*/}
                                    {/*            </MenuItem>*/}
                                    {/*        ))}*/}
                                    {/*    </Select>*/}
                                    {/*</Box>*/}




                                </div>

                                <div style={{marginTop: 40, display: "flex", justifyContent: "space-between"}}>
                                    <Box display="grid" width="100%">
                                        <label>Description: </label>
                                        <TextareaAutosize
                                            variant="filled"
                                            type="text"
                                            onChange={handleChange}
                                            name="description"
                                            sx={{gridColumn: "span 2"}}
                                            required
                                        />
                                    </Box>
                                </div>
                                <div style={{marginTop: 40, display: 'flex', alignItems: 'flex-end'}}>
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
                                    <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>
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

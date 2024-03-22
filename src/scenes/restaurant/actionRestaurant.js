// import { Button, Select, TextareaAutosize, TextField} from "@mui/material";
import {Form, Formik} from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../store/context";
import RestaurantService from "../../services/restaurantService";
import { useParams } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BrandService from "../../services/brandService";
// import {MenuItem} from "react-pro-sidebar";
import CategoryService from "../../services/categoryService";
import restaurantService from "../../services/restaurantService";
import {Box, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";


const ActionRestaurant = (props) => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const {state, dispatch} = useContext(UserContext);
    const [img, setFile] = useState(null);
    const {id} = useParams();
    const [req] = useState({id: id});
    const [restaurantDetails, setRestaurantDetails] = useState({
        name: "",
        address: "",
        tel: "",
        brandId: "",
        img: null,
        description: "",
        meals: "",
        hourStart: "",
        hourEnd: "",
        rate: "",
        cuisines: "",
        status: ""
    });

    useEffect(() => {
        RestaurantService.findRestaurants(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const firstRestaurant = res.data[0];
                    setRestaurantDetails({
                        name: firstRestaurant.name || "",
                        address: firstRestaurant.address || "",
                        tel: firstRestaurant.tel || "",
                        brandId: firstRestaurant.brandId || "",
                        img: firstRestaurant.img || "",
                        description: firstRestaurant.description || "",
                        meals: firstRestaurant.meals || "",
                        hourStart: firstRestaurant.hourStart || "",
                        hourEnd: firstRestaurant.hourEnd || "",
                        rate: firstRestaurant.rate || "",
                        cuisines: firstRestaurant.cuisines || "",
                        status: firstRestaurant.status || ""
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
        setRestaurantDetails((prevDetails) => ({
            ...prevDetails,
            [event.target.name]: event.target.value,
        }));
    };

    const handleBrandSelect = (event) => {
        setRestaurantDetails({ ...restaurantDetails,brandId: event.target.value  });

    };

    const handleFileChange = (event) => {
        setRestaurantDetails((prevDetails) => ({
            ...prevDetails,
            img: event.target.files
        }));
    };

    // const handleUpdate = async (e) => {
    //     // e.preventDefault();
    //     Swal.fire({
    //         title: 'Are you sure update?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, update it!'
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             const t = await RestaurantService.updateRestaurant(restaurantDetails, id);
    //             if (t != null) {
    //                 await Swal.fire(
    //                     'Update Success!',
    //                     'Your file has been update.',
    //                     'success'
    //                 )
    //                 return navigate("/brands");
    //
    //             }
    //         }
    //     })
    // }

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
                const t = await restaurantService.updateRestaurant(restaurantDetails,id);
                if (t != null) {
                    await Swal.fire(
                        'Update Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/restaurants");

                }
            }
        })
    }
    const deleteRestaurant = async () => {

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
                const t = await RestaurantService.deleteRestaurant(id);
                if (t != null) {
                    await Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/restaurants");
                }
            }
        })

    }
    const cancel = () => {
        navigate("/restaurants");
    };



    console.log("restaurantDetails", restaurantDetails);
    console.log("restaurantDetails brands", brands);

    return (
        <div className="app">
            <Sidebar/>
            <main className="content">
                <Topbar/>
                <Box m="20px">
                    <div className="container shadow" style={{display: 'grid'}}>
                        <h1 style={{margin: 'auto', marginTop: '24px'}}>DETAIL RESTAURANT</h1>
                        <Formik initialValues={restaurantDetails} onSubmit={handleUpdate}>
                            <Form style={{padding: "40px 24px"}}>
                                <div>
                                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                                        {/*<Box display="grid" width="30%"  marginRight="1rem" marginBottom="1rem">*/}
                                        {/*    <label>Brand: </label>*/}
                                        {/*    <select*/}
                                        {/*        value={restaurantDetails.brandId}*/}
                                        {/*        onChange={handleBrandSelect}*/}
                                        {/*        variant="filled"*/}
                                        {/*        className="form-select form-select-lg mb-3"*/}
                                        {/*        required*/}
                                        {/*    >*/}
                                        {/*        {restaurantDetails.brandId && (*/}
                                        {/*            <option value={restaurantDetails.brandId} disabled>*/}
                                        {/*                {brands.find(brand => brand.id === restaurantDetails.brandId)?.name}*/}
                                        {/*            </option>*/}
                                        {/*        )}*/}
                                        {/*        {brands.map((brand) => (*/}
                                        {/*            <option key={brand.id} value={brand.id}>*/}
                                        {/*                {brand.name}*/}
                                        {/*            </option>*/}
                                        {/*        ))}*/}

                                        {/*    </select>*/}
                                        {/*</Box>*/}

                                        {/*<Box display="grid" width="30%"  marginRight="1rem">*/}
                                        {/*    <label htmlFor="brandSelect">Brand: </label>*/}
                                        {/*    <Select*/}
                                        {/*        id="brandSelect"*/}
                                        {/*        value={restaurantDetails.brandId|| ''}*/}
                                        {/*        onChange={handleBrandSelect}*/}
                                        {/*        variant="filled"*/}
                                        {/*        className="form-select form-select-lg mb-3"*/}
                                        {/*        required*/}
                                        {/*    >*/}
                                        {/*        <MenuItem value="" disabled>*/}
                                        {/*        </MenuItem>*/}
                                        {/*        {brands.map((brand) => (*/}
                                        {/*            <MenuItem key={brand.id} value={brand.id}>*/}
                                        {/*                {brand.name}*/}
                                        {/*            </MenuItem>*/}
                                        {/*        ))}*/}
                                        {/*    </Select>*/}
                                        {/*</Box>*/}

                                        {/*<Box display="grid" width="30%">*/}
                                        {/*    <label>Brand: </label>*/}
                                        {/*    <select*/}
                                        {/*        value={restaurantDetails.brandId}*/}
                                        {/*        onChange={handleBrandSelect}*/}
                                        {/*        variant="filled"*/}
                                        {/*        className="form-select form-select-lg mb-3"*/}
                                        {/*        required*/}
                                        {/*    >*/}
                                        {/*        <option selected disabled value="">Open this select brand</option>*/}
                                        {/*        {brands.map((brand) => (*/}
                                        {/*            <option key={brand.id} value={brand.id}>*/}
                                        {/*                {brand.name}*/}
                                        {/*            </option>*/}
                                        {/*        ))}*/}
                                        {/*    </select>*/}
                                        {/*</Box>*/}

                                        <Box display="grid" width="30%" marginRight="1rem">
                                            <label>Brand: </label>
                                            <Select
                                                value={restaurantDetails.brandId}
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

                                        <Box display="grid" width="30%"  marginRight="1rem" marginBottom="1rem">
                                            <label>Name: </label>
                                            <TextField
                                                variant="filled"
                                                type="text"
                                                onChange={handleChange}
                                                name="name"
                                                value={restaurantDetails.name|| ''}
                                                sx={{gridColumn: "span 2"}}
                                                required
                                            />
                                        </Box>
                                        <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                            <label>Hotline: </label>
                                            <TextField
                                                variant="filled"
                                                type="text"
                                                onChange={handleChange}
                                                name="tel"
                                                value={restaurantDetails.tel|| ''}
                                                sx={{gridColumn: "span 2"}}
                                                required
                                            />
                                        </Box>


                                        <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                            <label>Open: </label>
                                            <TextField
                                                variant="filled"
                                                type="text"
                                                onChange={handleChange}
                                                name="hourStart"
                                                value={restaurantDetails.hourStart|| ''}
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
                                                value={restaurantDetails.hourEnd|| ''}
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
                                                value={restaurantDetails.meals|| ''}
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
                                                value={restaurantDetails.cuisines|| ''}
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
                                                value={restaurantDetails.cuisines|| ''}
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
                                                value={restaurantDetails.rate|| ''}
                                                sx={{gridColumn: "span 2"}}
                                                required
                                            />
                                        </Box>
                                        <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                                            <label>Status: </label>
                                            <TextField
                                                variant="filled"
                                                type="text"
                                                onChange={handleChange}
                                                name="cuisines"
                                                value={restaurantDetails.status|| ''}
                                                sx={{gridColumn: "span 2"}}
                                                required
                                            />
                                        </Box>
                                    </div>
                                    <div style={{marginTop: 40, display: "flex", justifyContent: "space-between"}}>
                                        <Box display="grid" width="100%">
                                            <label>Description: </label>
                                            <TextareaAutosize
                                                variant="filled"
                                                type="text"
                                                onChange={handleChange}
                                                name="description"
                                                value={restaurantDetails.description|| ''}
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
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                {restaurantDetails.images && restaurantDetails.images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image.url}
                                                        width={90}
                                                        style={{objectFit: 'cover', borderRadius: 8, marginRight: 10}}
                                                        alt={`gif-${index}`}
                                                    />
                                                ))}
                                            </div>
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
                                    >
                                        <button type="submit" className="btn btn-outline-success" variant="contained">
                                            EDIT
                                        </button>
                                        <button type="button" style={{marginLeft: 10}} onClick={deleteRestaurant}
                                                className="btn btn-outline-danger" variant="contained">
                                            DELETE
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={cancel}
                                            style={{marginLeft: "10px"}}
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

export default ActionRestaurant;
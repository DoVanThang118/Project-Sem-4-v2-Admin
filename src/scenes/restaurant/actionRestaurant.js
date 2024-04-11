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
import restaurantService from "../../services/restaurantService";
import {Box, MenuItem, Select, TextareaAutosize, TextField, useTheme} from "@mui/material";
import {TimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import dashboardService from "../../services/dashboardService";


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
const listMeals = [
    'Breakfast',
    'Lunch',
    'Dinner'
];

const listCuisines = [
    'american',
    'seafood',
    'steakhouse',
    'healthy',
    'vegetarian'
];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}


const ActionRestaurant = (props) => {
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const {state, dispatch} = useContext(UserContext);
    const [file, setFile] = useState({
        img: ''
    });
    const {id} = useParams();
    const [req] = useState({id: id});
    const [restaurantDetails, setRestaurantDetails] = useState({
        name: '',
        description: '',
        tel: '',
        address: '',
        brandId: '',
        cuisines: [],
        meals: [],
        hourStart: '',
        hourEnd: '',
        rate: '',
        status: ''
    });

    useEffect(() => {
        RestaurantService.findRestaurants(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setRestaurantDetails(res.data[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        BrandService.findBrands({status: 1})
            .then((res) => {
                setBrands(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const[notify, setNotify] = useState({})

    useEffect(() => {
        dashboardService.getNotify()
            .then((res) => {
                if (res.totalOrder > 0 || res.totalRevenue > 0) {
                    setNotify(res);
                } else {
                    console.log("NO Data notify");
                }
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
        file.img = event.target.files;
        setFile(file);
    };

    const handleSelectChangeMeals = (event) => {
        setRestaurantDetails({ ...restaurantDetails, meals: event.target.value });
    };

    const handleSelectChangeCuisines = (event) => {
        setRestaurantDetails({ ...restaurantDetails, cuisines: event.target.value });
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

    const openRestaurant = async () => {

        Swal.fire({
            title: 'Are you sure open Restaurant?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await RestaurantService.updateRestaurant({status: 1},id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/restaurants");
                }
            }
        })
    }

    const closedRestaurant = async () => {

        Swal.fire({
            title: 'Are you sure closed Restaurant?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await RestaurantService.updateRestaurant({status: 0},id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/restaurants");
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
                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>DETAIL RESTAURANT</h1>
                        <Formik initialValues={restaurantDetails} onSubmit={handleUpdate}>
                            <Form style={{ padding: "40px 24px" }}>
                                <div className="container rounded">
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                {restaurantDetails.images && restaurantDetails.images.length > 0 ? (
                                                    restaurantDetails.images.map((image, index) => (
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
                                            <div className="row mt-2">
                                                <div className="col-md-12">
                                                    <h3 style={{ display: "grid", marginRight: "1rem", marginBottom: "1rem" }}>
                                                        total statistics
                                                    </h3>
                                                </div>
                                                <div className="col-md-6">
                                                    <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Total Order"
                                                            variant="outlined"
                                                            type="number"
                                                            value={notify.totalOrder || "0"}
                                                            sx={{gridColumn: "span 2"}}
                                                            required
                                                        />
                                                    </Box>
                                                </div>
                                                <div className="col-md-6">
                                                    <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Total Revenue"
                                                            variant="outlined"
                                                            type="number"
                                                            value={notify.totalRevenue || "0"}
                                                            sx={{gridColumn: "span 2"}}
                                                            required
                                                        />
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7 ">
                                            <div className="p-3 py-5">
                                                <div className="row mt-2">
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Name"
                                                                variant="outlined"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={restaurantDetails.name || ""}
                                                                name="name"
                                                                sx={{gridColumn: "span 2"}}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Telephone"
                                                                variant="outlined"
                                                                type="text"
                                                                value={restaurantDetails.tel || ""}
                                                                onChange={handleChange}
                                                                name="tel"
                                                                sx={{gridColumn: "span 2"}}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Open"
                                                                variant="outlined"
                                                                type="time"
                                                                value={restaurantDetails.hourStart || ""}
                                                                onChange={handleChange}
                                                                name="hourStart"
                                                                sx={{gridColumn: "span 2"}}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Close"
                                                                variant="outlined"
                                                                type="time"
                                                                value={restaurantDetails.hourEnd || ""}
                                                                onChange={handleChange}
                                                                name="hourEnd"
                                                                sx={{gridColumn: "span 2"}}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <FormControl>
                                                                <InputLabel id="demo-multiple-chip-label">Meals</InputLabel>
                                                                <Select
                                                                    labelId="demo-multiple-chip-label"
                                                                    id="demo-multiple-chip"
                                                                    multiple
                                                                    value={restaurantDetails.meals}
                                                                    onChange={handleSelectChangeMeals}
                                                                    input={<OutlinedInput id="select-multiple-chip" label="Meals" />}
                                                                    renderValue={(selected) => (
                                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                            {selected.map((value) => (
                                                                                <Chip key={value} label={value} />
                                                                            ))}
                                                                        </Box>
                                                                    )}
                                                                    MenuProps={MenuProps}
                                                                >
                                                                    {listMeals.map((name) => (
                                                                        <MenuItem
                                                                            key={name}
                                                                            value={name}
                                                                            style={getStyles(name, restaurantDetails.meals, theme)}
                                                                        >
                                                                            {name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Box display="grid"  marginRight="1rem" marginBottom="1rem">
                                                            <FormControl>
                                                                <InputLabel id="demo-multiple-chip-label">Cuisines</InputLabel>
                                                                <Select
                                                                    labelId="demo-multiple-chip-label"
                                                                    id="demo-multiple-chip"
                                                                    multiple
                                                                    value={restaurantDetails.cuisines}
                                                                    onChange={handleSelectChangeCuisines}
                                                                    input={<OutlinedInput id="select-multiple-chip" label="Cuisines" />}
                                                                    renderValue={(selected) => (
                                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                            {selected.map((value) => (
                                                                                <Chip key={value} label={value} />
                                                                            ))}
                                                                        </Box>
                                                                    )}
                                                                    MenuProps={MenuProps}
                                                                >
                                                                    {listCuisines.map((name) => (
                                                                        <MenuItem
                                                                            key={name}
                                                                            value={name}
                                                                            style={getStyles(name, restaurantDetails.cuisines, theme)}
                                                                        >
                                                                            {name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-12">
                                                        <Box display="grid"  marginRight="1rem" marginBottom="1rem">
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Address"
                                                                variant="outlined"
                                                                type="text"
                                                                value={restaurantDetails.address || ""}
                                                                onChange={handleChange}
                                                                name="address"
                                                                sx={{gridColumn: "span 2"}}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem">
                                                            <FormControl>
                                                                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Brand"
                                                                    value={restaurantDetails.brandId || ''}
                                                                    onChange={handleBrandSelect}
                                                                    required
                                                                >
                                                                    {brands.map((brand) => (
                                                                        <MenuItem key={brand.id} value={brand.id}>
                                                                            {brand.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Box display="grid" marginRight="1rem" marginBottom="1rem">
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Rate"
                                                                variant="outlined"
                                                                type="number"
                                                                value={restaurantDetails.rate || ""}
                                                                onChange={handleChange}
                                                                name="rate"
                                                                sx={{gridColumn: "span 2"}}
                                                                inputProps={{ min: 0 , max: 5}}
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-12">
                                                        <Box display="grid"  marginRight="1rem" marginBottom="1rem">
                                                            <label>Description: </label>
                                                            <textarea
                                                                rows="4"
                                                                cols="50"
                                                                id="outlined-basic"
                                                                variant="outlined"
                                                                value={restaurantDetails.description || ""}
                                                                onChange={handleChange}
                                                                name="description"
                                                                required
                                                            />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </div>
                                            <Box
                                                display="flex"
                                                justifyContent="end"
                                                mt="20px"
                                            >
                                                <button type="submit" className="btn btn-outline-warning" variant="contained">
                                                    EDIT
                                                </button>
                                                {restaurantDetails.status === 1 ? (
                                                    <button type="button" style={{ marginLeft: 10 }} onClick={closedRestaurant} className="btn btn-outline-danger" variant="contained">
                                                        CLOSED
                                                    </button>
                                                ) : (
                                                    <button type="button" style={{ marginLeft: 10 }} onClick={openRestaurant} className="btn btn-outline-success" variant="contained">
                                                        OPEN
                                                    </button>
                                                )}
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
                            </Form>
                        </Formik>
                    </div>
                </Box>
            </main>
        </div>

    )
}

export default ActionRestaurant;
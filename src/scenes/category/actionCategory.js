import {Box, Button, TextareaAutosize, TextField} from "@mui/material";
import {Form, Formik} from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../store/context";
import BrandService from "../../services/brandService";
import { useParams } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CategoryService from "../../services/categoryService";


const ActionCategory = (props) => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const { state, dispatch } = useContext(UserContext);
    const [img, setFile] = useState(null);
    const { id } = useParams();
    const [req] = useState({id: id});
    const [categoryDetails, setCategoryDetails] = useState({
        name: "",
        description: "",
        img: null
    });

    console.log(categoryDetails)

    useEffect(() => {
        CategoryService.findCategories(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const firstCategory = res.data[0];
                    setCategoryDetails({
                        name: firstCategory.name || "",
                        description: firstCategory.description || ""
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (event) => {
        setCategoryDetails((prevDetails) => ({
            ...prevDetails,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFileChange = (event) => {
        setCategoryDetails((prevDetails) => ({
            ...prevDetails,
            img: event.target.files
        }));
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
                const t = await CategoryService.updateCategory(categoryDetails,id);
                if (t != null) {
                    await Swal.fire(
                        'Update Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/categories");

                }
            }
        })
    }
    const deleteBrand = async () => {

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
                const t = await CategoryService.deleteCategory(id);
                if (t != null) {
                    await Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/categories");
                }
            }
        })

    }
    const cancel = () => {
        navigate("/categories");
    };

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">
                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>DETAIL CATEGORY</h1>
                        <Formik initialValues={categoryDetails} onSubmit={handleUpdate}>
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
                                                value={categoryDetails.name|| ''}
                                                sx={{ gridColumn: "span 2" }}
                                                required
                                            />
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
                                                value={categoryDetails.description|| ''}
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
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                {categoryDetails.images && categoryDetails.images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image.url}
                                                        width={90}
                                                        style={{ objectFit: 'cover', borderRadius: 8, marginRight: 10 }}
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
                                        <button type="button" style={{ marginLeft: 10 }} onClick={deleteBrand} className="btn btn-outline-danger" variant="contained">
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

export default ActionCategory;
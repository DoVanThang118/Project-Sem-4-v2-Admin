import {Box, TextareaAutosize, TextField} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useState } from "react";
import UserContext from "../../store/context";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {useNavigate} from "react-router-dom";
import CategoryService from "../../services/categoryService";


const CreateCategory = () => {
    const navigate = useNavigate();

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const { state, dispatch } = useContext(UserContext);
    const [file,setFile] = useState(null);
    const [category, setCategory] = useState({
        name: '',
        description: '',
        img: ''
    });
    const handleChange = (event) => {
        category[event.target.name] = event.target.value;
        setCategory(category);
    };

    const handleFileChange = (event) => {
        category.img = event.target.files;
        setFile(category);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        CategoryService.createCategory(category)
            .then((res) => {
                navigate("/categories");
            })
            .catch((error) => {
                alert("Please Provided valid information");
            });
    };
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
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>CREATE CATEGORY</h1>
                        <Formik>
                            <form onSubmit={handleSubmit} style={{ padding: "40px 24px" }}>

                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Box display="grid" width="48%">
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

export default CreateCategory;

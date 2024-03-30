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
    const [file, setFile] = useState({
        img: ''
    });
    const { id } = useParams();
    const [req] = useState({id: id});
    const [categoryDetails, setCategoryDetails] = useState({
        name: "",
        description: ""
    });

    console.log(categoryDetails)

    useEffect(() => {
        CategoryService.findCategories(req)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setCategoryDetails(res.data[0]);
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
        file.img = event.target.files;
        setFile(file);
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
    const deleteCategory = async () => {

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

    const openCategory = async () => {

        Swal.fire({
            title: 'Are you sure open Category?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await CategoryService.updateCategory({status: 1},id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/categories");
                }
            }
        })
    }

    const closedCategory = async () => {

        Swal.fire({
            title: 'Are you sure closed Category?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const t = await CategoryService.updateCategory({status: 0},id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    )
                    return navigate("/categories");
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
                const t = await CategoryService.updateAvatar(file, id);
                if (t != null) {
                    Swal.fire(
                        'Success!',
                        'Your file has been update.',
                        'success'
                    ).then(() => {
                        // Sau khi hiển thị thông báo thành công, làm mới trang
                        window.location.reload();
                    });
                    // return navigate("/brands/detail/ + e.id");
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
                                <div className="container rounded">
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                {categoryDetails.images && categoryDetails.images.length > 0 ? (
                                                    categoryDetails.images.map((image, index) => (
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
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU" // Replace default_image_url_here with the URL of your default image
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
                                                        <button className="btn btn-outline-secondary" type="button" onClick={updateAvatar} id="inputGroupFileAddon04">Button</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7 ">
                                            <div className="p-3 py-5">
                                                <div className="row mt-2">
                                                    <div className="col-md-12">
                                                        <label className="labels">Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Full name"
                                                            onChange={handleChange}
                                                            value={categoryDetails.name || ""}
                                                            name="name"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-12">
                                                        <label className="labels">Description</label>
                                                        <input
                                                            onChange={handleChange}
                                                            value={categoryDetails.description || ""}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Description"
                                                            name="description"
                                                            required
                                                        />
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
                                                {(categoryDetails.status === 1) ? (
                                                    <button type="button" style={{ marginLeft: 10 }} onClick={closedCategory} className="btn btn-outline-danger" variant="contained">
                                                        CLOSED
                                                    </button>
                                                ) : null}

                                                {(categoryDetails.status === 0) ?(
                                                    <button type="button" style={{ marginLeft: 10 }} onClick={openCategory} className="btn btn-outline-success" variant="contained">
                                                        OPEN
                                                    </button>
                                                ) : null}
                                                <button type="button" style={{ marginLeft: 10 }} onClick={deleteCategory} className="btn btn-outline-danger" variant="contained">
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
                            </Form>
                        </Formik>
                    </div>
                </Box>
            </main>
        </div>

    )
}

export default ActionCategory;
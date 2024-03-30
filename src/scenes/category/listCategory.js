import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import UserContext from "../../store/context";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import '../../css/product.css';
import CategoryService from "../../services/categoryService";

const ListCategory = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { state, dispatch } = useContext(UserContext);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        CategoryService.getCategories()
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "is active";
            case 0:
                return "closed";
            default:
                return "Unknown";
        }
    };


    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">

                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>CATEGORIES</h1>
                        <Link to={"/categories/create"} style={{ margin: '24px 0' }}>
                            <button style={{}} className="btn btn-success">
                                Create New Category
                            </button>
                        </Link>

                        <table className="table  table-bordered" style={{}}>
                            <thead>
                            <tr>
                                <th style={{textAlign: 'center', width: '5%'}}>STT</th>
                                <th style={{textAlign: 'center', width: '5%'}}>Logo</th>
                                <th style={{textAlign: 'center'}}>Name</th>
                                <th style={{textAlign: 'center', width: '50%'}}>Description</th>
                                <th style={{textAlign: 'center', width: '10%'}}>Status</th>
                                <th style={{textAlign: 'center'}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                category.map((e, k) => {
                                    return (
                                        <tr key={k}>
                                            <td >{k + 1}</td>
                                            <td >
                                                {e.images && e.images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image.url}
                                                        width={90}
                                                        style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                                        alt={`gif-${index}`}
                                                    />
                                                ))}
                                            </td>
                                            <td >{e.name}</td>
                                            <td >{e.description}</td>
                                            <td style={{textAlign: 'center', width: '10%'}}>{getStatusText(e.status)}</td>
                                            <td style={{textAlign: 'center', width: '10%'}}>
                                                <Link to={"/categories/detail/" + e.id}>
                                                    <button className="btn btn-outline-info">
                                                        Detail
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </Box>
            </main>
        </div>
    )
}

export default ListCategory;
import {Box, TextField, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import UserContext from "../../store/context";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import '../../css/product.css';
import ProductService from "../../services/productService";
import {jwtDecode} from "jwt-decode";

const ListProduct = (props) => {

    const getState = localStorage.getItem('state');
    const parsedState = JSON.parse(getState);
    const userLogin = parsedState.userlogin;
    const jwtToken = userLogin.jwt;
    const decodedToken = jwtDecode(jwtToken);
    const userRole = decodedToken.role;

    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { state, dispatch } = useContext(UserContext);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        ProductService.getProducts()
            .then((res) => {
                setProduct(res.data);
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

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchCate, setSearchCate] = useState('');

    useEffect(() => {
        const filtered = product.filter(product =>
            (searchTerm === '' || (product.restaurant && product.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (searchName === '' || (product.name && product.name.toLowerCase().includes(searchName.toLowerCase()))) &&
            (searchType === '' || (product.type && product.type.toLowerCase().includes(searchType.toLowerCase()))) &&
            (searchCate === '' || (product.category.name && product.category.name.toLowerCase().includes(searchCate.toLowerCase())))
        );
        setFilteredUsers(filtered);
    }, [searchTerm, searchName, searchType, searchCate, product]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleNameChange = (event) => {
        setSearchName(event.target.value);
    };
    const handleTypeChange = (event) => {
        setSearchType(event.target.value);
    };
    const handleCateChange = (event) => {
        setSearchCate(event.target.value);
    };

console.log(product);
    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">

                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>PRODUCT</h1>
                        <nav className="navbar bg-body-tertiary">
                            <div>
                                {userRole === 'ROLE_MANAGER'&& (
                                    <Link to={"/products/create"} style={{ margin: '24px 0' }}>
                                        <button style={{}} className="btn btn-success">
                                            Create New Product
                                        </button>
                                    </Link>
                                )}
                            </div>
                            <div className="d-flex">

                                {userRole === 'ROLE_ADMIN'&& (
                                    <TextField
                                        label="Search by restaurant"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        variant="outlined"
                                        style={{ margin: '24px 0' }}
                                    />
                                )}
                                <TextField
                                    label="Search by name"
                                    value={searchName}
                                    onChange={handleNameChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                                <TextField
                                    label="Search by type"
                                    value={searchType}
                                    onChange={handleTypeChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                                <TextField
                                    label="Search by category"
                                    value={searchCate}
                                    onChange={handleCateChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                            </div>
                        </nav>

                        <table className="table  table-bordered" style={{}}>
                            <thead>
                            <tr>
                                <th style={{textAlign: 'center'}}>STT</th>
                                <th style={{textAlign: 'center'}}>Image</th>
                                <th style={{textAlign: 'center'}}>Name</th>
                                <th style={{textAlign: 'center'}}>Price</th>
                                {/*<th style={{textAlign: 'center'}}>Quantity</th>*/}
                                <th style={{textAlign: 'center'}}>Type</th>
                                <th style={{textAlign: 'center'}}>rating</th>
                                <th style={{textAlign: 'center'}}>Category</th>
                                <th style={{textAlign: 'center'}}>Restaurant</th>
                                <th style={{ textAlign: 'center', width: '20%'}}>Description</th>
                                <th style={{ textAlign: 'center'}}>Status</th>
                                <th style={{textAlign: 'center'}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                filteredUsers.map((e, k) => {
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
                                            <td >{e.price}</td>
                                            {/*<td >{e.qty}</td>*/}
                                            <td >{e.type}</td>
                                            <td >{e.rate}</td>
                                            <td >{e.category.name} </td>
                                            <td >{e.restaurant.name}</td>
                                            <td >{e.description}</td>
                                            <td >{getStatusText(e.status)}</td>
                                            <td style={{}}>
                                                <Link to={"/products/detail/" + e.id}>
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

export default ListProduct;
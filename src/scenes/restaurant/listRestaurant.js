import { Box} from "@mui/material";
import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import '../../css/product.css';
import RestaurantService from "../../services/restaurantService";

const ListRestaurant = (props) => {
    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
        RestaurantService.getRestaurants()
            .then((res) => {
                console.log(res.data)
                setRestaurant(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

console.log("restaurant:", restaurant)
    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">

                    <div className="container shadow" style={{ display: 'grid' }}>
                        <h1 style={{ margin: 'auto', marginTop: '24px' }}>RESTAURANT</h1>
                        <Link to={"/restaurants/create"} style={{ margin: '24px 0' }}>
                            <button style={{}} className="btn btn-success">
                                Create New Restaurant
                            </button>
                        </Link>

                        <table className="table  table-bordered" style={{}}>
                            <thead>
                            <tr>
                                <th style={{textAlign: 'center'}}>STT</th>
                                <th style={{textAlign: 'center'}}>Logo</th>
                                <th style={{textAlign: 'center'}}>Name</th>
                                <th style={{textAlign: 'center'}}>Brand</th>
                                <th style={{textAlign: 'center'}}>Telephone</th>
                                <th style={{textAlign: 'center'}}>Cuisines</th>
                                <th style={{textAlign: 'center'}}>Meals</th>
                                <th style={{textAlign: 'center'}}>Open</th>
                                <th style={{textAlign: 'center'}}>Close</th>
                                <th style={{textAlign: 'center'}}>Rate</th>
                                <th style={{textAlign: 'center'}}>Address</th>
                                <th style={{ textAlign: 'center', width: '30%'}}>Description</th>
                                <th style={{ textAlign: 'center'}}>Status</th>
                                <th style={{textAlign: 'center'}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                restaurant.map((e, k) => {
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
                                            <td>{e.brand ? e.brand.name : ''}</td>
                                            <td >{e.tel}</td>
                                            <td >{e.cuisines}</td>
                                            <td >{e.meals}</td>
                                            <td >{e.hourStart}</td>
                                            <td >{e.hourEnd}</td>
                                            <td >{e.rate}</td>
                                            <td >{e.address}</td>
                                            <td >{e.description}</td>
                                            <td >{e.status}</td>
                                            <td style={{}}>
                                                <Link to={`/restaurants/detail/${e.id}`}>
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

export default ListRestaurant;
import { Box} from "@mui/material";
import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import '../../css/product.css';
import RestaurantService from "../../services/restaurantService";

const ListRestaurant = (props) => {
    const [restaurant, setRestaurant] = useState([]);
    console.log("cvssdfsd" ,restaurant)

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

                        <table className="table" style={{}}>
                            <thead>
                            <tr>
                                <th style={{}}>STT</th>
                                <th style={{}}>Logo</th>
                                <th style={{}}>Name</th>
                                <th style={{}}>Hotline</th>
                                <th style={{}}>Email</th>
                                <th style={{ width: '40%'}}>Description</th>
                                <th style={{}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                restaurant.map((e, k) => {
                                    return (
                                        <tr key={k}>
                                            <td >{k + 1}</td>
                                            <td >
                                                {e.gifs && e.gifs.map((gif, index) => (
                                                    <img
                                                        key={index}
                                                        src={gif.url}
                                                        width={90}
                                                        style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                                        alt={`gif-${index}`}
                                                    />
                                                ))}
                                            </td>
                                            <td >{e.name}</td>
                                            <td >{e.hotline}</td>
                                            <td >{e.email}</td>
                                            <td >{e.description}</td>
                                            <td style={{}}>
                                                <Link to={"/restaurants/detail/" + e.id}>
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
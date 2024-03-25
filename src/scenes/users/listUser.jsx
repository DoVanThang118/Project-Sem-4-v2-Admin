import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import UserContext from "../../store/context";
import React, {useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import '../../css/product.css';
import userService from "../../services/userService";

const ListUser = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const {state, dispatch} = useContext(UserContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        userService.getUsers()
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log("user check:", user);

    return (
        <div className="app">
            <Sidebar/>
            <main className="content">
                <Topbar/>
                <Box m="20px">

                    <div className="container shadow" style={{display: 'grid'}}>
                        <h1 style={{margin: 'auto', marginTop: '24px'}}>USERS</h1>
                        <Link to={"/users/create"} style={{margin: '24px 0'}}>
                            <button style={{}} className="btn btn-success">
                                Create New User
                            </button>
                        </Link>

                        <table className="table  table-bordered" style={{}}>
                            <thead>
                            <tr>
                              <th style={{textAlign: 'center'}}>STT</th>
                              <th style={{textAlign: 'center'}}>Image</th>
                              <th style={{textAlign: 'center'}}>Name</th>
                              <th style={{textAlign: 'center'}}>Email</th>
                              <th style={{textAlign: 'center'}}>Address</th>
                              <th style={{textAlign: 'center'}}>Birth day</th>
                              {/*<th style={{textAlign: 'center'}}>Password</th>*/}
                              {/*<th style={{textAlign: 'center'}}>Manager Restaurant</th>*/}
                              <th style={{textAlign: 'center'}}>Role</th>
                              <th style={{textAlign: 'center'}}>Action</th>
                            </tr>
                            </thead>
                          <tbody>
                          {user.map((e, k) => {
                                return (
                                    <tr key={k}>
                                        <td>{k + 1}</td>
                                        <td>
                                            {e.images && e.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image.url}
                                                    width={90}
                                                    style={{objectFit: 'cover', borderRadius: 8, marginRight: 5}}
                                                    alt={`gif-${index}`}
                                                />
                                            ))}
                                            {(!e.images || e.images.length === 0) && (
                                                <img
                                                    width={50}
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU"
                                                    id="profile-image"
                                                    className="rounded-circle mt-5"
                                                />
                                            )}

                                        </td>

                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.address}</td>
                                        <td>{e.birthday}</td>
                                        {/*<td>{e.password}</td>*/}
                                        {/*<td>{e.restaurant_id}</td>*/}
                                        <td>
                                            {e.roles.map((r, index) => (
                                                <span key={index}>{r.name}</span>
                                            ))}
                                        </td>

                                        <td style={{}}>
                                        <Link to={"/users/detail/" + e.id}>
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

export default ListUser;
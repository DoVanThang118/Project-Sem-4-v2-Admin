import {Box, TextField, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import UserContext from "../../store/context";
import React, {useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import '../../css/product.css';
import userService from "../../services/userService";
import dashboardService from "../../services/dashboardService";

const ListUser = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const {state, dispatch} = useContext(UserContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        userService.getUsers()
            .then((res) => {
                const userlist = res.data.filter(user => user.type !== 'user');
                setUser(userlist);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const[notify, setNotify] = useState([])
    useEffect(() => {
        dashboardService.getNotify()
            .then((res) => {
                setNotify(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log("totalRevenue" , notify)

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        const filtered = user.filter(user =>
            (searchTerm === '' || (user.restaurant && user.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (searchEmail === '' || (user.email && user.email.toLowerCase().includes(searchEmail.toLowerCase()))) &&
            (searchName === '' || (user.name && user.name.toLowerCase().includes(searchName.toLowerCase())))
        );
        setFilteredUsers(filtered);
    }, [searchTerm, searchEmail, searchName, user]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleEmailChange = (event) => {
        setSearchEmail(event.target.value);
    };
    const handleNameChange = (event) => {
        setSearchName(event.target.value);
    };

    console.log("user check:", user);

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
            <Sidebar/>
            <main className="content">
                <Topbar/>
                <Box m="20px">

                    <div className="container shadow" style={{display: 'grid'}}>
                        <h1 style={{margin: 'auto', marginTop: '24px'}}>USERS</h1>
                        <nav className="navbar bg-body-tertiary">
                            <div>
                                <Link to={"/users/create"} style={{margin: '24px 0'}}>
                                    <button style={{}} className="btn btn-success">
                                        Create New User
                                    </button>
                                </Link>
                            </div>
                            <div className="d-flex">
                                <TextField
                                    label="Search by restaurant"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                                <TextField
                                    label="Search by name"
                                    value={searchName}
                                    onChange={handleNameChange}
                                    variant="outlined"
                                    style={{ margin: '24px 0' ,marginLeft: '24px' }}
                                />
                                <TextField
                                    label="Search by email"
                                    value={searchEmail}
                                    onChange={handleEmailChange}
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
                              <th style={{textAlign: 'center'}}>Email</th>
                              <th style={{textAlign: 'center'}}>Address</th>
                              <th style={{textAlign: 'center'}}>Birthday</th>
                              <th style={{textAlign: 'center'}}>Manager Restaurant</th>
                              <th style={{textAlign: 'center'}}>Type</th>
                              <th style={{textAlign: 'center'}}>Role</th>
                              <th style={{textAlign: 'center'}}>Action</th>
                            </tr>
                            </thead>
                          <tbody>
                          {filteredUsers.map((e, k) => {
                                return (
                                    <tr key={k}>
                                        <td style={{textAlign: 'center', width: '5%'}}>{k + 1}</td>
                                        <td style={{textAlign: 'center', width: '10%'}}>
                                            {e.images && e.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image.url}
                                                    width={90}
                                                    className="rounded-circle"
                                                    style={{objectFit: 'cover', borderRadius: 8, marginRight: 5}}
                                                    alt={`gif-${index}`}
                                                />
                                            ))}
                                            {(!e.images || e.images.length === 0) && (
                                                <img
                                                    width={90}
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU"
                                                    id="profile-image"
                                                    className="rounded-circle"
                                                    style={{objectFit: 'cover', borderRadius: 8, marginRight: 5}}
                                                />
                                            )}

                                        </td>

                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.address}</td>
                                        <td>{e.birthday}</td>
                                        <td>{e.restaurant ? e.restaurant.name : ''}</td>
                                        <td>{e.type}</td>
                                        <td style={{textAlign: 'center', width: '5%'}}>
                                            {e.roles.map((r, index) => (
                                                <span key={index}>
                                                    {r.name}
                                                    {index !== e.roles.length - 1 && ", \n"}
                                                </span>
                                            ))}
                                        </td>
                                        <td >{getStatusText(e.status)}</td>
                                        <td style={{textAlign: 'center', width: '5%'}}>
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
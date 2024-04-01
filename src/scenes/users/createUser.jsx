import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import RestaurantService from "../../services/restaurantService";
import {MenuItem, Select} from "@mui/material";

const CreateUser = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [user, setUser] = useState({
    name: '',
    address: '',
    birthday: '',
    tel: '',
    email: '',
    password: '',
    type: '',
    restaurantId: ''
  });

  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    RestaurantService.findRestaurants({status: 1})
        .then((res) => {
          setRestaurants(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const handleRestaurantSelect  = (event) => {
    setUser({ ...user, restaurantId: event.target.value });
  };

  const handleTypeSelect  = (event) => {
    setUser({ ...user, type: event.target.value });
  };

  const handleChange = (event) => {
    user[event.target.name] = event.target.value;
    setUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    userService.createUser(user)
        .then((res) => {
          navigate("/users");
        })
        .catch((error) => {
          alert("Please provide valid information");
        });
  };

  return (
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Box m="20px">
            <div className="container shadow" style={{ display: 'grid' }}>
              <h1 style={{ margin: 'auto', marginTop: '24px' }}>CREATE ACCOUNT</h1>
              <form onSubmit={handleSubmit} style={{ padding: "40px 24px" }}>

                <div style={{display: "flex", flexWrap: "wrap"}}>
                  <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
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
                  <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Phone: </label>
                    <TextField
                        variant="filled"
                        type="text"
                        onChange={handleChange}
                        name="tel"
                        sx={{ gridColumn: "span 2" }}
                        required
                    />
                  </Box>
                  <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Email: </label>
                    <TextField
                        variant="filled"
                        type="text"
                        onChange={handleChange}
                        name="email"
                        sx={{ gridColumn: "span 2" }}
                        required
                    />
                  </Box>
                  <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Password: </label>
                    <TextField
                        variant="filled"
                        type="password"
                        onChange={handleChange}
                        name="password"
                        sx={{ gridColumn: "span 2" }}
                        required
                    />
                  </Box>
                  <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Address: </label>
                    <TextField
                        variant="filled"
                        type="text"
                        onChange={handleChange}
                        name="address"
                        sx={{ gridColumn: "span 2" }}
                        required
                    />
                  </Box>
                  <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Birthday: </label>
                    <TextField
                        variant="filled"
                        type="date"
                        onChange={handleChange}
                        name="birthday"
                        sx={{ gridColumn: "span 2" }}
                        required
                    />
                  </Box>
                  <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Type: </label>
                    <Select
                        value={user.type}
                        onChange={handleTypeSelect}
                        variant="filled"
                        className="form-select form-select-lg mb-3"
                        required
                    >
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="shipper">Shipper</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </Box>
                  <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Restaurant: </label>
                    <Select
                        value={user.restaurantId}
                        onChange={handleRestaurantSelect}
                        variant="filled"
                        className="form-select form-select-lg mb-3"
                    >
                      <MenuItem value="" disabled>Select a restaurant</MenuItem>
                      {restaurants.map((restaurant) => (
                          <MenuItem key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                          </MenuItem>
                      ))}
                    </Select>
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
                      onClick={() => navigate("/users")}
                      style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </Box>
              </form>
            </div>
          </Box>
        </main>
      </div>
  );
};

export default CreateUser;

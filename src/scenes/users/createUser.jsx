import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import userService from "../../services/userService";

const CreateUser = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: '',
    address: '',
    birthday: '',
    tel: '',
    email: '',
    password: ''
    // img: ''
  });

  const handleChange = (event) => {
    user[event.target.name] = event.target.value;
    setUser(user);
  };

  const handleFileChange = (event) => {
    user.img = event.target.files;
    setFile(user);
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
        <main className="content">
          <Box m="20px">
            <div className="container shadow" style={{ display: 'grid' }}>
              <h1 style={{ margin: 'auto', marginTop: '24px' }}>CREATE BRAND</h1>
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
                        type="text"
                        onChange={handleChange}
                        name="birthday"
                        sx={{ gridColumn: "span 2" }}
                        required
                    />
                  </Box>
                </div>

                {/*<div style={{marginTop: 40, display:'flex', alignItems:'flex-end'}}>*/}
                {/*  <Box display="grid" width="48%">*/}
                {/*    <label htmlFor="avatar" className="form-label">*/}
                {/*      Image :*/}
                {/*    </label>*/}
                {/*    <input*/}
                {/*        type="file"*/}
                {/*        onChange={handleFileChange}*/}
                {/*        name="img"*/}
                {/*        className="form-control"*/}
                {/*        id="avatar"*/}
                {/*        multiple*/}
                {/*    />*/}
                {/*  </Box>*/}
                {/*</div>*/}

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
                      onClick={() => navigate("/brands")}
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

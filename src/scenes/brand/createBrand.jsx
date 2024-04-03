import {Box, TextareaAutosize, TextField} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useState } from "react";
import UserContext from "../../store/context";
import BrandService from "../../services/brandService";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {useNavigate} from "react-router-dom";


const CreateBrand = () => {
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { state, dispatch } = useContext(UserContext);
  const [file,setFile] = useState(null);
  const [brand, setBrand] = useState({
    name: '',
    description: '',
    hotline: '',
    email: '',
    status: '',
    img: ''
  });
  console.log("brand",brand)

  const handleChange = (event) => {
    brand[event.target.name] = event.target.value;
    setBrand(brand);
  };

  const handleFileChange = (event) => {
    brand.img = event.target.files;
    setFile(brand);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    BrandService.createBrand(brand)
        .then((res) => {
          navigate("/brands");
        })
        .catch((error) => {
          alert("Please Provided valid information");
        });
  };
  const cancel = () => {
    navigate("/brands");
  };

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box m="20px">
          <div className="container shadow" style={{ display: 'grid' }}>
            <h1 style={{ margin: 'auto', marginTop: '24px' }}>CREATE BRAND</h1>
            <Formik>
              <form onSubmit={handleSubmit} style={{ padding: "40px 24px" }}>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box display="grid" width="30%">
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
                  <Box display="grid" width="30%">
                    <label>Hotline: </label>
                    <TextField
                      variant="filled"
                      type="text"
                      onChange={handleChange}
                      name="hotline"
                      sx={{ gridColumn: "span 2" }}
                      required
                    />
                  </Box>
                  <Box display="grid" width="30%">
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
                </div>
                <div style={{marginTop: 40, display: "flex", justifyContent: "space-between" }}>
                  <Box display="grid" width="100%">
                    <label>Description: </label>
                    <TextareaAutosize
                        variant="filled"
                        type="text"
                        onChange={handleChange}
                        name="description"
                        style={{ minHeight: "100px" }}
                        placeholder="description..."
                        sx={{ gridColumn: "span 2" }}
                        required
                    />
                  </Box>
                </div>
                <div style={{marginTop: 40, display:'flex', alignItems:'flex-end'}}>
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

export default CreateBrand;

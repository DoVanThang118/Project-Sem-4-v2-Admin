import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import UserContext from "../../store/context";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import '../../css/product.css';
import BrandService from "../../services/brandService";

const ListBrand = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const { state, dispatch } = useContext(UserContext);
  const [brand, setBrand] = useState([]);
  console.log("cvssdfsd" ,brand)

  useEffect(() => {
    BrandService.getBrands()
        .then((res) => {
          setBrand(res.data);
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
            <h1 style={{ margin: 'auto', marginTop: '24px' }}>BRANDS</h1>
            <Link to={"/brands/create"} style={{ margin: '24px 0' }}>
              <button style={{}} className="btn btn-success">
                Create New Brand
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
                  brand.map((e, k) => {
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
                        <td >{e.hotline}</td>
                        <td >{e.email}</td>
                        <td >{e.description}</td>
                        <td style={{}}>
                          <Link to={"/brands/detail/" + e.id}>
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

export default ListBrand;
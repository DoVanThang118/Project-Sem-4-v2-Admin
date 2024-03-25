import {Box, Button, TextareaAutosize, TextField} from "@mui/material";
import {Form, Formik} from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../store/context";
import BrandService from "../../services/brandService";
import { useParams } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userService from "../../services/userService";


const ActionUser = (props) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  const [img, setFile] = useState(null);
  const { id } = useParams();
  const [req] = useState({id: id});
  const [user, setUser] = useState({
    name: '',
    address: '',
    birthday: '',
    tel: '',
    email: '',
    password: '',
    // roles: '',
    img: null
  });


  useEffect(() => {
    userService.findUsers(req)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const firstUser = res.data[0];
          setUser({
            name: firstUser.name || "",
            address: firstUser.address ||  '',
            birthday: firstUser.birthday ||  '',
            tel: firstUser.tel ||  '',
            email: firstUser.email ||  '',
            password: firstUser.password ||  '',
            // roles: firstUser.roles ||  '',

          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setUser((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    setUser((prevDetails) => ({
      ...prevDetails,
      img: event.target.files
    }));
  };

  const handleUpdate = async (e) => {
    // e.preventDefault();
    Swal.fire({
      title: 'Are you sure update?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(user)
        const t = await userService.updateUser(user,id);
        if (t != null) {
          await Swal.fire(
              'Update Success!',
              'Your file has been update.',
              'success'
          )
          return navigate("/users");

        }
      }
    })
  }
  const deleteBrand = async () => {

    Swal.fire({
      title: 'Are you sure delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const t = await userService.deleteUser(id);
        if (t != null) {
          await Swal.fire(
              'Success!',
              'Your file has been update.',
              'success'
          )
          return navigate("/users");
        }
      }
    })

  }
  const cancel = () => {
    navigate("/brands");
  };
  console.log("userDetails",user)

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box m="20px">
          <div className="container shadow" style={{ display: 'grid' }}>
            <h1 style={{ margin: 'auto', marginTop: '24px' }}>USER DETAIL</h1>
            <Formik initialValues={user} onSubmit={handleUpdate}>
              <Form style={{ padding: "40px 24px" }}>
                <div>
                  <div style={{display: "flex", flexWrap: "wrap"}}>
                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Name: </label>
                      <TextField
                          variant="filled"
                          type="text"
                          onChange={handleChange}
                          name="name"
                          value={user.name || ''}
                          sx={{gridColumn: "span 2"}}
                          required
                      />
                    </Box>
                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Hotline: </label>
                      <TextField
                          variant="filled"
                          type="text"
                          onChange={handleChange}
                          name="tel"
                          value={user.tel || ''}
                          sx={{gridColumn: "span 2"}}
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
                          value={user.email || ''}
                          sx={{gridColumn: "span 2"}}
                          required
                      />
                    </Box>
                    <Box display="grid" width="30%" marginRight="1rem" marginBottom="1rem">
                    <label>Email: </label>
                      <TextField
                          variant="filled"
                          type="password"
                          onChange={handleChange}
                          name="password"
                          value={user.password || ''}
                          sx={{gridColumn: "span 2"}}
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
                          value={user.birthday || ''}
                          sx={{gridColumn: "span 2"}}
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
                          value={user.address || ''}
                          sx={{gridColumn: "span 2"}}
                          required
                      />
                    </Box>
                  </div>


                  <div style={{marginTop: 40, display: 'flex', alignItems: 'flex-end'}}>
                    <Box display="grid" width="48%">
                      <label htmlFor="avatar" className="form-label">
                        Image :
                      </label>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        {user.images && user.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                width={90}
                                style={{objectFit: 'cover', borderRadius: 8, marginRight: 10}}
                                alt={`gif-${index}`}
                            />
                        ))}
                      </div>
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
                  >
                    <button type="submit" className="btn btn-outline-success" variant="contained">
                      EDIT
                    </button>
                    <button type="button" style={{marginLeft: 10}} onClick={deleteBrand}
                            className="btn btn-outline-danger" variant="contained">
                      DELETE
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={cancel}
                        style={{marginLeft: "10px"}}
                    >
                      Cancel
                    </button>
                  </Box>
                </div>
              </Form>
            </Formik>
          </div>
        </Box>
      </main>
    </div>

  )
}

export default ActionUser;
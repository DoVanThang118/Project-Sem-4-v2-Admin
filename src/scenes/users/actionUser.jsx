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
import DatePicker from "@mui/lab/DatePicker";


const ActionUser = (props) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  const [file, setFile] = useState({
    img: ''
  });
  const { id } = useParams();
  const [req] = useState({id: id});
  const [user, setUser] = useState({
    name: '',
    address: '',
    birthday: '',
    tel: '',
    email: '',
  });

  const [birthday, setBirthday] = useState();


  useEffect(() => {
    userService.findUsers(req)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setUser(res.data[0]);
          setBirthday(res.data[0].birthday)
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

  const handleBirthday = (event) => {
    setUser({ ...user,birthday: event.target.value  });

  };

  const handleFileChange = (event) => {
    file.img = event.target.files;
    setFile(file);
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

  const updateAvatar = async () => {

    Swal.fire({
      title: 'Are you sure update Image ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const t = await userService.updateAvatar(file, id);
        if (t != null) {
          Swal.fire(
              'Success!',
              'Your file has been update.',
              'success'
          ).then(() => {
            // Sau khi hiển thị thông báo thành công, làm mới trang
            window.location.reload();
          });
          // return navigate("/brands/detail/ + e.id");
        }
      }
    })
  }

  const deleteUser = async () => {
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
  const openUser = async () => {

    Swal.fire({
      title: 'Are you sure open ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, open it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const t = await userService.updateUser({status: 1},id);
        if (t != null) {
          Swal.fire(
              'Success!',
              'Your file has been update.',
              'success'
          )
          return navigate("/shippers");
        }
      }
    })
  }

  const lockUser = async () => {

    Swal.fire({
      title: 'Are you sure lock ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, lock it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const t = await userService.updateUser({status: 0},id);
        if (t != null) {
          Swal.fire(
              'Success!',
              'Your file has been update.',
              'success'
          )
          return navigate("/shippers");
        }
      }
    })
  }
  const cancel = () => {
    navigate("/users");
  };
  console.log("userDetails",user)

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box m="20px">
          <div className="container shadow" style={{ display: 'grid' }}>
            <h1 style={{ margin: 'auto', marginTop: '24px' }}>PROFILE</h1>
            <Formik initialValues={user} onSubmit={handleUpdate}>
              <Form style={{ padding: "40px 24px" }}>
                <div className="container rounded">
                  <div className="row">
                    <div className="col-md-5 ">
                      <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        {user.images && user.images.length > 0 ? (
                            user.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    id="profile-image"
                                    width={225}
                                    style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                                />
                            ))
                        ) : (
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9l3x_T90wLTxFRNtGjTcdi-naKnFfjSIsg&usqp=CAU" // Replace default_image_url_here with the URL of your default image
                                id="profile-image"
                                style={{ objectFit: 'cover', borderRadius: 8, marginRight: 5 }}
                            />
                        )}
                        <div >
                          <span className="font-weight-bold">{user.name}</span>
                          <br/>
                          <span className="text-black-50">{user.email}</span>
                        </div>
                        <br/>
                        <div >
                          <div className="input-group">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                name="img"
                                className="form-control"
                                id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04"
                                aria-label="Upload"
                                multiple
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={updateAvatar} id="inputGroupFileAddon04">Upload</button>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-7 ">
                      <div className="p-3 py-5">
                        <div className="row mt-2">
                          <div className="col-md-6">
                            <label className="labels">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full name"
                                onChange={handleChange}
                                value={user.name || ""}
                                name="name"
                                required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="labels">Telephone</label>
                            <input
                                onChange={handleChange}
                                value={user.tel || ""}
                                type="text"
                                className="form-control"
                                placeholder="Telephone"
                                name="tel"
                                required
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <label className="labels">Email</label>
                            <input
                                onChange={handleChange}
                                value={user.email || ""}
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                required
                            />
                          </div>
                          <div className="col-md-6">
                            <Box display="grid" marginRight="1rem" marginBottom="1rem">
                              <label className="labels">Birthday </label>
                              <input
                                  type="date"
                                  onChange={handleChange}
                                  name="birthday"
                                  className="form-control"
                                  value={user.birthday || ''}
                                  placeholder="birthday"

                                  required
                              />
                            </Box>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <label className="labels">Address</label>
                            <input
                                onChange={handleChange}
                                value={user.address || ""}
                                type="text"
                                className="form-control"
                                placeholder="address"
                                name="address"
                                required
                            />
                          </div>
                        </div>
                      </div>
                      <Box
                          display="flex"
                          justifyContent="end"
                          mt="20px"
                      >
                        <button type="submit" className="btn btn-outline-warning" variant="contained">
                          EDIT
                        </button>
                        {user.status === 1 ? (
                            <button type="button" style={{ marginLeft: 10 }} onClick={lockUser} className="btn btn-outline-danger" variant="contained">
                              LOCK
                            </button>
                        ) : (
                            <button type="button" style={{ marginLeft: 10 }} onClick={openUser} className="btn btn-outline-success" variant="contained">
                              OPEN
                            </button>
                        )}
                        <button
                            className="btn btn-outline-secondary"
                            onClick={cancel}
                            style={{ marginLeft: "10px" }}
                        >
                          Cancel
                        </button>
                      </Box>
                    </div>
                  </div>
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
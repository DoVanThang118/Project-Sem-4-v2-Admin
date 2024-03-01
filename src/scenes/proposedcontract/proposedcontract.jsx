import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import UserContext from "../../store/context";
import React, { useContext, useState, useEffect } from "react";
import {get, getproposedstatus,getproposedone} from "../../services/contract.service";
import { Link } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import '../../css/product.css';




const ListNVLDProposed = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const {state,dispatch} = useContext(UserContext);
  const [contract, setContract] = useState([]);
  const[newcontract,setNewcontract]= useState([]);
  const[status,setStatus]= useState(0);
  


  const[idde,setIdde] = useState(0);

  const getType = async ()=>{
    dispatch({type:"SHOW_LOADING"});
    const contract = await getproposedone();
    setNewcontract(contract);
    dispatch({type:"HIDE_LOADING"});

    
  }
  const handleStatus = (e)=>{
    const t = e.target.value;
    setStatus(t);

  }

  
  const setnewcontract = async()=>{
    dispatch({type:"SHOW_LOADING"});
    const co = await getproposedstatus(status);
    setNewcontract(co);
    dispatch({type:"HIDE_LOADING"});

  }
  console.log(newcontract);




  console.log(contract)
  

  useEffect(()=>{
   getType();
    
   },[]);


  return (
    <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
    <Box m="20px">

      <div className="container shadow" style={{display:'grid'}}>
                <h1 style={{margin:'auto', marginTop:'24px'}}>NVLD PROPOSED CONTRACTS</h1>

                  <Link to={"/create-contract"} style={{margin:'24px 0'}}>
                      {/* <button style={{}} className="btn btn-success">
                          Create New Contract
                      </button>  */}
                  </Link>
                  <div class="input-group mb-3 col-md-6">
                    <div class="input-group-prepend">
                      <button class="btn btn-outline-primary" type="button" onClick={setnewcontract}>Choose</button>
                    </div>
                    <select class="custom-select" id="inputGroupSelect03" onClick={handleStatus}>
                      <option selected>Choose...</option>
                      <option value="0">Hợp đồng mới thanh toán đã có đề nghị thiết bị</option>
                      {/* <option value="1">Hợp đồng mới thanh toán đã có đề nghị thiết bị được duyệt</option> */}
                      <option value="2">Hợp đồng mới thanh toán đã có đề nghị thiết bị không được duyệt</option>
                    </select>

                  </div>
            
                    
              

              
                  <table className="table" style={{}}>
                    <thead>
                        <th style={{}}>STT</th>
                        {/* <th style={{}}>Thumbnail</th> */}
                        
                        <th style={{width:'10%'}}>ContractId</th>

                        <th  style={{width:'10%'}}>Address</th>
                        <th style={{width:'10%'}}>Ngày tạo</th>
                      
                        <th style={{}}>Chukỳ</th>
                        <th style={{}}>Data</th>
                        <th style={{}}>Modem</th>
                        <th style={{}}>Telephone</th>


                        
                        <th style={{width:'10%'}}>NVLapDat</th>
                        <th style={{width:'10%'}}>NVQuanLy</th>

                        {/* <th style={{width:'10%'}}>Thiết bị</th> */}

                        <th style={{}}>Check Status</th>

                        <th style={{}}>Action</th>
                        
                        
                    </thead>
                    <tbody>

                        {
                            newcontract.map((e,k)=>{
                                return (
                                    <tr key={k}>
                                        <td >{k+1}</td> 
                                        
                                        <td >{e.contractId}</td>    
    
                                        <td style={{width:'25%'}} >{e.address}/{e.district}/{e.city}</td> 
                                        <td >{new Date(e.ngaytaohopdong).toLocaleDateString()}</td> 
                                       
                                        <td >{e.chukydongtien}</td> 
                                        <td >{e.packdataId}</td> 
                                        <td >{e.thietbimodemId}</td> 
                                        <td >{e.thietbidienthoaiId}</td> 
                                        <td >{e.nhanvienlapdatId}</td> 
                                        <td  >{e.nhanvienquanlyId}</td> 
                                        {/* <td >{e.thietbimodel}+{e.thietbidienthoail}</td>  */}

                                        <td style={{width:'30%'}} >{
                                        
                                        e.checkStatus
                                        
                                        // (e.status==0)?<p>Chờ kiểm tra lắp đặt</p>
                                        // :(e.status==1)?<p>Lắp đặt được chờ khách thanh toán</p>
                                        // :(e.status==2)?<p>Thanh toán thành công chờ lắp đặt</p>
                                        // :(e.status==3)?<p>Lắp đặt thành công đi vào sử dụng</p>
                                        // :(e.status==4)?<p>Hết hạn chờ thanh toán gia hạn sử dụng</p>
                                        // :(e.status==5)?<p>Địa chỉ không lắp đặt được</p>:<p></p>

                                        
                                        
                                        
                                        
                                        
                                        }</td> 
                                        <td style={{}}>
                                          {(e.proposedStatus==null)?<Link to={"/create-proposed/"+e.contractId}>
                                            <button  className="btn btn-outline-success">
                                            PROPOSED
                                            </button> 
                                            </Link>:<></>}
                                          
                                          {(e.proposedStatus==0)?<Link >
                                            <button  className="btn btn-outline-warning">
                                            CHỜ DUYỆT
                                            </button> 
                                            </Link>:<></>}
                                            {(e.proposedStatus==1)?<Link>
                                            <button  className="btn btn-outline-success">
                                            SUCCESS
                                            </button> 
                                            </Link>:<></>}
                                            {(e.proposedStatus==2)?<Link to={"/create-proposed/"+e.contractId}>
                                            <button  className="btn btn-outline-success">
                                            PROPOSED
                                            </button> 
                                            </Link>:<></>}

                                            
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

export default ListNVLDProposed;
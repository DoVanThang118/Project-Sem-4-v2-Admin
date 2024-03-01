import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import UserContext from "../../store/context";
import React, { useContext, useState, useEffect } from "react";
import {get} from "../../services/feeback.service";
import { Link } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";




const ListFeedback = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const {state,dispatch} = useContext(UserContext);
  const [user, setUser] = useState([]);
  const[idde,setIdde] = useState(0);


  const getUser = async ()=>{
    dispatch({type:"SHOW_LOADING"});

    const feedback = await get();
    setUser(feedback);
    dispatch({type:"HIDE_LOADING"});
    console.log(feedback);

  }
 
  

  useEffect(()=>{
   getUser();
    
   },[]);
  
  



  return (
    <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
    <Box m="20px">
      <Header title="LIST FEEDBACK" subtitle="LIST FEEBACK" />

      <div className="container shadow">
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', padding:'24px'}}>

                <h1>ALL FEEDBACK </h1>
                </div>
                {/* <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:30, marginBottom:30}}>

                </div> */}

                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                
                <table className="table" style={{}} >
                    <thead>
                        <th style={{}}>STT</th>
                        <th style={{}}>Status</th>
                      
                        <th style={{}}>Provider</th>
                        <th style={{}}>Content Feedback</th>

                        
                        
                        <th style={{}}>Details</th>

                        
                        
                    </thead>
                    <tbody>
                        {
                            user.map((e,k)=>{
                                return (
                                    <tr key={k}>
                                        <td style={{}}>{k+1}</td> 
                                        <td style={{}}>{(e.isActive)?"Active":"Not"}</td>
                                        <td style={{}}>{e.user_provider.provider}</td>    
                                        <td style={{}}>{e.feedback}</td>    

                                        
                                        
                                        <td style={{}}>
                                            <button style={{}} className="btn btn-info">
                                            Active
                                            </button> 
                                            </td>
                                      
                                    </tr>
                                    )
                            })
                        }
                        
                    </tbody>
                </table>
                </div>
            </div>
       
     
    </Box>
    </main>
    </div>
  )
}

export default ListFeedback;
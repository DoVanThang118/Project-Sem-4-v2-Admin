import api from "./api";

export const get = async ()=>{
    try{
     const url = "manage-feedback/getall";
     const rs = await api.get(url);
     return rs.data;
    }catch(error){
        return [];
    }
 }




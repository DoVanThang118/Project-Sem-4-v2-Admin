import api from "./api";
import Swal from "sweetalert2";
const Alert = () =>{
    Swal.fire(
        'Success!',
        'You clicked the button!',
        'success'
      )
}
const AlertFail = () =>{
    Swal.fire(
        'Failed!',
        'Something went wrong!',
        'error'
      )
}
export const get = async ()=>{
    try{
     const url = "contracts";
     const rs = await api.get(url);
     return rs.data;
    }catch(error){
        return [];
    }
 }

 export const getactive = async ()=>{
    try{
     const url = "contracts/totalactive";
     const rs = await api.get(url);
     return rs.data;
    }catch(error){
        return [];
    }
 }
 export const getnotactive = async ()=>{
    try{
     const url = "contracts/totalnotactive";
     const rs = await api.get(url);
     return rs.data;
    }catch(error){
        return [];
    }
 }



export const getstatus = async(status)=>{
    try{
        const url = "contracts/getstatus?status="+status;
        const rs = await api.get(url);
        return rs.data;
       }catch(error){
           return [];
       }  
}
export const getcheckstatus = async(status)=>{
    try{
        const url = "contracts/check?status="+status;
        const rs = await api.get(url);
        return rs.data;
       }catch(error){
           return [];
       }  
}
export const getcheckone = async()=>{
    try{
        const url = "contracts/checkone";
        const rs = await api.get(url);
        return rs.data;
       }catch(error){
           return [];
       }  
}

export const getsearch = async(search)=>{
    try{
        const url = "contracts/search?search="+search;
        const rs = await api.get(url);
        return rs.data;
       }catch(error){
           return [];
       }  
}




export const getproposedstatus = async(status)=>{
    try{
        const url = "contracts/proposed?status="+status;
        const rs = await api.get(url);
        return rs.data;
       }catch(error){
           return [];
       }  
}
export const getproposedone = async()=>{
    try{
        const url = "contracts/proposedone";
        const rs = await api.get(url);
        return rs.data;
       }catch(error){
           return [];
       }  
}

 export const create_contract = async(contract) =>{
    const url = "contracts"
    try{
        const rs = await api.post(url,{customername: contract.customername ,address: contract.address , district:contract.district, city:contract.city, tel:contract.tel, email:contract.email, chukydongtien:contract.chukydongtien,packdataId:contract.packdataId, nhanvienbanhangId: contract.nhanvienbanhangId});
        Alert();
        return rs.data;
    }catch(error){
        AlertFail();
        return null;
    }
}


 export const tinhtong = async ()=>{
     try{
         const url = "contracts/total";
         const rs = await api.get(url);
         return rs.data;
     }catch(error){
         return 0;
     }
 }

 export const find = async(id)=>{
    try {
        const url = "contracts/get-by-id?id="+id;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return {};
    }
 }

 export const findcon = async(idd)=>{
    try {
        const url = "contracts/get-by-id?id="+idd;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return {};
    }
 }

 export const update_checkinstall = async(id,nhanvienlapdatId) =>{

    const url = "contracts/checkinstallation?id="+id+"&nhanvienlapdatId="+nhanvienlapdatId
    try{
        const rs = await api.put(url);
        Alert();
        return rs.data;
    }catch(error){
        AlertFail();
        return null;
    }
 }
 export const update_intallsuccess = async(id) =>{

    const url = "contracts/installsuccess?id="+id
    try{
        const rs = await api.put(url);
        Alert();
        return rs.data;
    }catch(error){
        AlertFail();
        return null;
    }
 }

 export const tong_month = async () =>{
     const url ="contracts/totalmonth";
     try{
        const rs = await api.get(url);
        return rs.data;
    }catch(error){
        return [];
    }
 }

 export const getagree = async ()=>{
     try{
         const url = "contracts/getcontract1";
         const rs = await api.get(url);
         return rs.data;

     }catch(error){
        return [];
    }
 }
 export const getdisagree = async ()=>{
    try{
        const url = "contracts/getcontract3";
        const rs = await api.get(url);
        return rs.data;

    }catch(error){
       return [];
   }
}


 export const getcontractpayment= async ()=>{
    try{
        const url = "contracts/getcontract2";
        const rs = await api.get(url);
        return rs.data;

    }catch(error){
       return [];
   }
}

export const contractdevi = async (id)=>{
    try{
        const url = "contracts/contractdevice?id="+id;
        const rs = await api.get(url);
        return rs.data;

    }catch(error){
       return [];
   }

}
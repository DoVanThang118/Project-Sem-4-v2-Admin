// import api from "./api";
// import Swal from "sweetalert2";
// const Alert = () =>{
//     Swal.fire(
//         'Success!',
//         'You clicked the button!',
//         'success'
//       )
// }
// const AlertFail = () =>{
//     Swal.fire(
//         'Failed!',
//         'Something went wrong!',
//         'error'
//       )
// }
//
//
// export const get = async ()=>{
//     try{
//      const url = "supplier";
//      const rs = await api.get(url);
//      return rs.data;
//     }catch(error){
//         return [];
//     }
//  }
//
//  export const find = async (id)=>{
//     try {
//         const url = "supplier/get-by-id?id="+id;
//         const rs = await api.get(url);
//         return rs.data;
//     } catch (error) {
//         return {};
//     }
// }
//
// export const create_brand = async(brand) =>{
//     const url = "supplier"
//     try{
//         const rs = await api.post(url,{name: brand.name,description: brand.description});
//         Alert();
//         return rs.data;
//     }catch(error){
//         AlertFail();
//         return {};
//     }
// }
// export const edit_brand = async(brand) =>{
//     const url = "supplier"
//     try{
//         const rs = await api.put(url,{id:brand.id, name: brand.name,description: brand.description, status:1});
//         Alert();
//         return {};
//     }catch(error){
//         AlertFail();
//         return null;
//     }
// }
// export const remove_brand = async (idde)=>{
//     try{
//         const url = "supplier?id="+idde;
//         const rs = await api.delete(url);
//         Alert();
//         return {};
//     }catch(error){
//         AlertFail();
//         return null;
//     }
//
// }

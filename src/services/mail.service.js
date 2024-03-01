import api from "./api";



export const sendmail = async(mail) =>{
    const url = "mail/sendemailusingtemplate"
    try{
        const rs = await api.post(url,{name: mail.name,email: mail.email,link:mail.link, content: mail.content});
        return rs.data;
    }catch(error){
        return null;
    }
}


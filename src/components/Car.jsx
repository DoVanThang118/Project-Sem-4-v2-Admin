import React from "react";
const Car = (props)=>{
    const {name,bienso,giathue1ngay} = props.item;
    return (
        <div>
            <p>Name: {name}</p>
            <p>Bien So: {bienso}</p>
            
        </div>
    )
}
export default Car;
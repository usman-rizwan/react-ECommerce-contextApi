import React from "react";
import {  Empty } from "antd";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const EmptyCart = ({ description ,class_name, show }) =>{
    return(
        <div>
<Empty description={description}  className={class_name}/>
<div className="flex justify-center items-center mt-5">

<Button style={{display:`${show}`}}  variant="flat"
        color="primary"> <Link to={'/'}>Back Home</Link> </Button>
</div>
        </div>
    )
} 
    
export default EmptyCart;

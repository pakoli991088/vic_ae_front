import vicLogo from "../../Image/vic_logo.jpg";
import React from "react";
import "./style.css"
import {Link} from "react-router-dom";

export const BrandImage = () => {
    return (
        <div className='container-div'>
            <div className="container img_div">
                <h1 className='company_name_text'>VICTORY SECURITIES AE SYSTEM</h1>
                <img className="img" src={vicLogo} alt="Italian Trulli"/>
                <div className='text-center'>
                    <h1><Link className="link-opacity-100" to="/login">PRESS HERE TO LOGIN 按此登入</Link></h1>
                </div>
            </div>
        </div>
    )
}
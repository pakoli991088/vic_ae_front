import vicLogo from "../../Image/vic_logo.jpg";
import React from "react";
import "./style.css"

export const BrandImage = () => {
    return (
        <div className="container img_div">
            <h1 className='company_name_text'>VICTORY SECURITIES AE SYSTEM</h1>
            <img className="img" src={vicLogo} alt="Italian Trulli"/>
        </div>
    )
}
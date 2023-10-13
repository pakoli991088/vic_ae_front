import vicLogo from "./image/biglogo.png";
import React from "react";
import "./style.css"

export const BrandImage = () => {
    return (
        <div className='container text-center'>
                <h1 className='company_name_text mt-5'>VICTORY SECURITIES AE SYSTEM</h1>
                <img className="img mt-5" src={vicLogo} alt="Italian Trulli"/>
                {/*<div className='text-center'>*/}
                {/*    <h1><Link className="link-opacity-100" to="/login">PRESS HERE TO LOGIN 按此登入</Link></h1>*/}
                {/*</div>*/}
        </div>
    )
}
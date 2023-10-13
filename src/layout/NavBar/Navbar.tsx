import companyLogo from "./image/small.png"
import React from "react";
import "./style.css"
import {Link} from "react-router-dom";

export const Navbar = () => {

    // const userName = "Pako Li"; // 将登录用户的名字放在这里
    return(

        <nav className="navbar navbar-expand-lg navbar-light  background-color-blue">
            <div className="container ">
                <a className="navbar-brand" href="#">
                    <img src={companyLogo} className="d-inline-block align-top" alt="Company Logo" />
                </a>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    {/*<ul className="navbar-nav">*/}
                    {/*        <li className='nav-item m-1'>*/}
                    {/*            <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>*/}
                    {/*        </li>*/}
                    {/*    <li className="nav-item dropdown">*/}
                    {/*        <a className="nav-link dropdown-toggle text-color-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                    {/*            waiting for fix*/}
                    {/*        </a>*/}
                    {/*        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                    {/*            <li><a className="dropdown-item" >Logout</a></li>*/}
                    {/*        </ul>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
            </div>
        </nav>

    )
}
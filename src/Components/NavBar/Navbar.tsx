import companyLogo from "../../Image/vic_logo.jpg";
import React from "react";
import "./style.css"

export const Navbar = () => {

    const userName = "Pako Li"; // 将登录用户的名字放在这里

    return(

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container background-color-blue">
                <a className="navbar-brand" href="#">
                    <img src={companyLogo} width="150" height="150" className="d-inline-block align-top" alt="Company Logo" />
                </a>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-color-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {userName}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
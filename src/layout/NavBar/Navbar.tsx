import companyLogo from "./image/20231016-093842.png";
import React, { useState } from "react";
import "./style.css";
import Cookies from "js-cookie";

export const Navbar = () => {
    const username = Cookies.get("username");
    const tempTokens = Cookies.get("tempTokens");
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        if (username) {
            // 清除 Cookies 中的 username 和 tempTokens
            Cookies.remove("username");
            Cookies.remove("tempTokens");
        }
        // 重定向到登录页面
        window.location.href = "/";
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light  background-color-blue">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={companyLogo} className="d-inline-block align-top" alt="Company Logo" />
                </a>
                {/*<div className="collapse navbar-collapse justify-content-end" id="navbarNav">*/}
                {/*    {username && tempTokens && (*/}
                {/*        <div className="btn-group">*/}
                {/*            <button*/}
                {/*                type="button"*/}
                {/*                className="m-2 btn btn-outline-light"*/}
                {/*                onClick={toggleDropdown}*/}
                {/*            >*/}
                {/*                {username}*/}
                {/*            </button>*/}
                {/*            {isDropdownOpen && (*/}
                {/*                <ul className="dropdown-menu">*/}
                {/*                    <li>*/}
                {/*                        <button className="dropdown-item" onClick={handleLogout}>*/}
                {/*                            Logout*/}
                {/*                        </button>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</div>*/}

                {username && tempTokens && (
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle background-color-blue button_hover" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        {username}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                        {/*<li><a className="dropdown-item" href="#">Another action</a></li>*/}
                        {/*<li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                    </ul>
                </div>
                )}
            </div>
        </nav>
    );
};

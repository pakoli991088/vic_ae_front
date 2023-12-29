// @ts-ignore
import companyLogo from "./image/ae_logo.png";
import React, {useState} from "react";
import "./style.css";
import Cookies from "js-cookie";

export const Navbar = () => {
    const username = Cookies.get("username");
    const tempTokens = Cookies.get("tempTokens");
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const today = new Date();
    const options = {timeZone: 'Asia/Hong_Kong'};
    const hkDateTime = today.toLocaleString('en-HK', {...options, day: '2-digit', month: '2-digit', year: 'numeric',});


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
            <div className="container d-flex">
                <a className="navbar-brand" href="#">
                    <img src={companyLogo} className="d-inline-block align-top custom_navbar" alt="Company Logo"/>
                </a>


                <span className="text-dark ms-auto  navbar_span">{hkDateTime}&nbsp;&nbsp;&nbsp;</span>


                {username && tempTokens && (
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle background-color-blue button_hover text-dark"
                                type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {username}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                            <li><a className="dropdown-item" href="/change-password" >Change password</a></li>
                            {/*<li><a className="dropdown-item" href="#">Another action</a></li>*/}
                            {/*<li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

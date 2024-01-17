// @ts-ignore
import companyLogo from "./image/ae_logo.png";
import React, {useEffect, useState} from "react";
import "./style.css";
import Cookies from "js-cookie";
import axios from "axios";

export const Navbar = () => {
    //test
    const [user, setUser] = useState(null);
    const [isAdmin,setIsAdmin] = useState(false);
    const username = Cookies.get("username");
    const token = Cookies.get("tempTokens");
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const today = new Date();
    const options = {timeZone: 'Asia/Hong_Kong'};
    const hkDateTime = today.toLocaleString('en-HK', {...options, day: '2-digit', month: '2-digit', year: 'numeric',});
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    const handleLogout = () => {
        if (username) {
            // 清除 Cookies 中的 username 和 tempTokens
            Cookies.remove("username");
            Cookies.remove("tempTokens");
            Cookies.remove("isAEFirstLogin")
        }
        // 重定向到登录页面
        window.location.href = "/";
    };

    useEffect(() => {
        if (token) {
            axios.post(`${apiBaseUrl}/user/verify-token`, {token})
                .then((response) => {
                    if (response.data.status === "success") {
                        setIsAdmin(response.data.data.roles.some((role: { name: string; }) => role.name === 'ROLE_ADMIN'));
                        console.log(response.data.data);
                    } else {
                        window.location.href = "/";
                    }
                })
        } else {
            window.location.href = "/";
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light  background-color-blue">
            <div className="container d-flex">
                <a className="navbar-brand" href="/margin-call">
                    <img src={companyLogo} className="d-inline-block align-top custom_navbar" alt="Company Logo"/>
                </a>


                <span className="text-dark ms-auto  navbar_span">{hkDateTime}&nbsp;&nbsp;&nbsp;</span>


                {username && token && (
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle background-color-blue button_hover text-dark"
                            type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {username}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                            <li><a className="dropdown-item" href="/change-password">Change password</a></li>
                            {isAdmin && (
                                <li><a className="dropdown-item" href="/reset-password">Reset Password</a></li>
                            )}
                            {/*<li><a className="dropdown-item" href="#">Another action</a></li>*/}
                            {/*<li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

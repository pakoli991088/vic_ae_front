import companyLogo from "../../Image/vic_logo.jpg";
import React from "react";
import "./style.css"
import { useOktaAuth } from "@okta/okta-react";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {Link} from "react-router-dom";

export const Navbar = () => {

    const userName = "Pako Li"; // 将登录用户的名字放在这里

    const {oktaAuth, authState} = useOktaAuth();

    if(!authState) {
        return <SpinnerLoading/>
    }

    const handleLogout = async() => oktaAuth.signOut();

    console.log(authState);

    return(

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container background-color-blue">
                <a className="navbar-brand" href="#">
                    <img src={companyLogo} width="150" height="150" className="d-inline-block align-top" alt="Company Logo" />
                </a>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">

                        {!authState.isAuthenticated ?
                            <li className='nav-item m-1'>
                                <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>
                            </li>
                            :
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-color-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {authState.idToken?.claims.name}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>

    )
}
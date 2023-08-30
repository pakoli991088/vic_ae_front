import React, {useRef} from "react";
import "./style.css";
import {BrandImage} from "../BrandImage/BrandImage";


export const LoginPage = () => {

    return (
        <div>
            <BrandImage/>
            <div className=''>
                <form className="login-form">
                    <div className="form-group ">
                        <label htmlFor="username">Email</label>
                        <input type="text" id="username" className="form-control narrow-input mt-2"
                               placeholder="Enter Email"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control narrow-input mt-2"
                               placeholder="Enter password"/>
                        <label htmlFor="forgot password" className='forgot_password mt-2'>forgot password ?
                            <a href='#'> click here</a>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-outline-secondary btn-lg mt-3">Login</button>
                    <a className='btn btn-outline-secondary btn-lg mt-3' href='#'>Register</a>
                </form>
            </div>
        </div>
    )
}
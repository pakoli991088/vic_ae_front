import {Navbar} from "../NavBar/Navbar";
import React, {useEffect} from "react";
import Cookies from "js-cookie";

export const ChangePasswordPage = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const token = Cookies.get('tempTokens');
        if (token) {

        } else {
            // window.location.href = '/'
        }
    }, []);

    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div className="container">
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-around">
                        <h1>Change password</h1>
                    </div>
                    <div className="changePasswordContainer">
                        <div className="changePasswordContent">
                            <div className="changePasswordLabelAndInputContainer">
                                <div className="changePasswordLabel">
                                    <label htmlFor="oldPassword" className="form-label " id="oldPassword">
                                        Old Password :&nbsp;
                                    </label>
                                    <label htmlFor="oldPassword" className="form-label " id="oldPassword">
                                        New Password :&nbsp;
                                    </label>
                                    <label htmlFor="oldPassword" className="form-label " id="oldPassword">
                                        Confirm New Password :&nbsp;
                                    </label>
                                </div>
                                <div className="changePasswordInput">
                                    <input type="password"/>
                                    <input type="password"/>
                                    <input type="password"/>
                                </div>
                            </div>

                            <div className="changePasswordButtonContainer">
                                <div className="changePasswordButton">
                                    <button type="reset" className="btn btn-primary">Reset</button>
                                </div>
                                <div className="changePasswordButton">
                                    <button type="button" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
import {Navbar} from "../NavBar/Navbar";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import showNotification from "../Utils/Notification";

export const ResetPasswordPage = () => {

    const [emailAddress , setEmailAddress] = useState("");
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [notificationMessage, setNotificationMessage] = useState("default error");
    const [showHandleSuccessAlert, setShowHandleSuccessAlert] = useState(false);
    const [showHandleErrorAlert, setShowHandleErrorAlert] = useState(false);

    const handleEmailAddressChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        setEmailAddress(value);
    };

    const handleResetButton = () => {
        setEmailAddress("");
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const token = Cookies.get('tempTokens');

        axios.post(`${apiBaseUrl}/user/reset-password`, {
            token : token,
            emailAddress : emailAddress,
        }).then((response) => {
            if (response.data.status === "success") {
                setNotificationMessage("Reset password successfully");
                setShowHandleSuccessAlert(true);
                handleResetButton();
            } else if (response.data.status === "failed") {
                setNotificationMessage(response.data.msg);
                setShowHandleErrorAlert(true);
                handleResetButton();
            } else {
                setNotificationMessage(response.data.msg);
                setShowHandleErrorAlert(true);
                handleResetButton();
            }
        })
    };

    useEffect(() => {
        if (showHandleErrorAlert) {
            handleErrorAlert();
            setShowHandleErrorAlert(false);
        }
        if (showHandleSuccessAlert) {
            handleSuccessAlert()
            setShowHandleSuccessAlert(false);
        }
    }, [notificationMessage, showHandleSuccessAlert, showHandleErrorAlert])

    const handleSuccessAlert = () => {
        showNotification({ type: 'success', message: notificationMessage })
    };
    const handleErrorAlert = () => {
        showNotification({ type: 'error', message: notificationMessage })
    };

    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div className="resetPasswordContainer">
                <h1>Reset Password</h1>
                <label htmlFor="resetEmailAddressLabel" className="form-label " id="oldPassword">
                    Email Address :&nbsp;
                </label>
                <input
                    className="resetPasswordInputField"
                    type="email"
                    id="resetEmailAddress"
                    name="resetEmailAddress"
                    value={emailAddress}
                    onChange={handleEmailAddressChange}
                    required
                />
                <div className="resetPasswordButtonContainer">
                    <button type="reset" className="btn btn-primary m-1" onClick={handleResetButton}>Reset</button>
                    <button type="button" className="btn btn-primary m-1" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}
import {Navbar} from "../NavBar/Navbar";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import showNotification from "../Utils/Notification";

export const ChangePasswordPage = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmNewPassword,setConfirmPassword] = useState('');
    const [notificationMessage, setNotificationMessage] = useState("default error");
    const [showHandleSuccessAlert, setShowHandleSuccessAlert] = useState(false);
    const [showHandleErrorAlert, setShowHandleErrorAlert] = useState(false);

    const handleOldPasswordChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
            setOldPassword(value);
    };
    const handleNewPasswordChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        setNewPassword(value);
    };
    const handleConfirmNewPasswordChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        setConfirmPassword(value);
    };

    const handleResetButton = () => {
        setOldPassword('')
        setNewPassword('');
        setConfirmPassword('');
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('oldPassword submitted:', oldPassword);
        console.log('newPassword submitted:', newPassword);
        console.log('confirmNewPassword submitted:', confirmNewPassword);
        if (newPassword.length < 8 || newPassword.length > 20) {
            setNotificationMessage("New password must be no less than 8 characters and no more than 20 characters in length");
            setShowHandleErrorAlert(true);
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setNotificationMessage("Confirm New Password must match New Password.");
            setShowHandleErrorAlert(true);
            return;
        }
    };

    useEffect(() => {
        const token = Cookies.get('tempTokens');
        if (token) {
            axios.post(`${apiBaseUrl}/user/verify-token`,{token})
                .then((response) => {
                    if(response.data.status !== "success") {
                        Cookies.remove('tempTokens');
                        setNotificationMessage(response.data.msg); //it will not show , because change page already ,will fix if i have time . by pako
                        setShowHandleErrorAlert(true); //it will not show , because change page already ,will fix if i have time by pako
                        window.location.href = '/'
                    }
                })
        } else {
            setNotificationMessage("please login"); //it will not show , because change page already ,will fix if i have time by pako
            setShowHandleErrorAlert(true); //it will not show , because change page already ,will fix if i have time by pako
            window.location.href = '/'
        }
    }, []);

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
                                    <label htmlFor="newPassword" className="form-label mt-3 " id="newPassword">
                                        New Password :&nbsp;
                                    </label>
                                    <span>&nbsp;</span>
                                    <label htmlFor="confirmNewPassword" className="form-label " id="confirmNewPassword">
                                        Confirm New Password :&nbsp;
                                    </label>
                                </div>
                                <div className="changePasswordInput">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={oldPassword}
                                        onChange={handleOldPasswordChange}
                                        pattern=".{8,20}"
                                        required
                                    />
                                    <input
                                        className="mt-3"
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                        pattern=".{8,20}"
                                        required
                                    />
                                    <span className="passwordMention">The password must be no less than 8 characters and no more than 20 characters in length</span>
                                    <input
                                        className="mt-1"
                                        type="password"
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        value={confirmNewPassword}
                                        onChange={handleConfirmNewPasswordChange}
                                        pattern=".{8,20}"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="changePasswordButtonContainer">
                                <div className="changePasswordButton">
                                    <button type="reset" className="btn btn-primary" onClick={handleResetButton}>Reset</button>
                                </div>
                                <div className="changePasswordButton">
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
import "./style.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import showNotification from "../../../Utils/Notification";

export const LoginForm = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    // 初始化 email 狀態
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const [notificationMessage,setNotificationMessage] = useState("default error")
    const [showHandleSuccessAlert , setShowHandleSuccessAlert] = useState(false);
    const [showHandleErrorAlert , setShowHandleErrorAlert] = useState(false);
    const handleSuccessAlert = () => {
        showNotification({type: 'success', message: notificationMessage})
    };
    const handleErrorAlert = () => {
        showNotification({type: 'error', message: notificationMessage})
    };

    // 檢查本地存儲中是否有 email，如果有，則將其設置為初始值
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        if(showHandleErrorAlert) {
            handleErrorAlert();
            setShowHandleErrorAlert(false);
        }
        if(showHandleSuccessAlert) {
            handleSuccessAlert()
            setShowHandleSuccessAlert(false);
        }
    },[notificationMessage,showHandleSuccessAlert,showHandleErrorAlert])

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            // 勾選了 "Check me out"，將 email 存儲到本地存儲
            localStorage.setItem("userEmail", email);
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 防止表單默認提交行為
        // 使用 Axios 發送 POST 請求到您的 API
        console.log(apiBaseUrl);
        axios.post(`${apiBaseUrl}/user/login`, {
            email: email,
            password: password,
        })
            .then((response) => {
                // console.log(response);
                // 登錄成功，處理響應
                if (response.data.status === "success") {
                    Cookies.set('isAEFirstLogin',response.data.data.isFirstLogin, {expires:1})
                    Cookies.set('tempTokens', response.data.data.tempTokens, { expires: 1 });
                    Cookies.set('username', response.data.data.name, { expires: 1 });
                    // 將 email 存儲到本地存儲，如果 "Remember me" 被勾選
                    const checkbox = document.getElementById("exampleCheck1") as HTMLInputElement;
                    if (checkbox.checked) {
                        localStorage.setItem("userEmail", email);
                    }
                    setNotificationMessage("login success");
                    setShowHandleSuccessAlert(true);
                    const isFirstLogin = Cookies.get('isAEFirstLogin');
                    if(isFirstLogin === "true") {
                        window.location.href = '/change-password';
                    } else {
                        window.location.href = '/margin-call';
                    }
                } else {
                    // when login fail set the latest error message
                    setNotificationMessage(response.data.msg);
                    setShowHandleErrorAlert(true);
                }
            })
            .catch((error) => {
                // 處理錯誤
                // setError("Sorry , system error !");
                setNotificationMessage("Sorry , system error !");
                setShowHandleErrorAlert(true);
            });
    };

    return (
        <form className="container mt-5 w-50" onSubmit={handleSubmit}>
            <div className="mb-3 text-center">
                <label htmlFor="exampleInputEmail1" className="form-label " id="email">
                    Email address
                </label>
                <div className="d-flex justify-content-center">
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email} // 將 email 與狀態關聯
                        onChange={handleEmailChange} // 在輸入變化時更新 email 狀態
                    />
                </div>
            </div>
            <div className="mb-3 text-center">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                </label>
                <div className="d-flex justify-content-center">
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
            </div>
            <div className="mb-3 form-check">
                <div className="d-flex justify-content-center">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handleCheckboxChange} // 在 checkbox 狀態變化時處理
                    />
                    <label className="form-check-label mx-2" htmlFor="exampleCheck1">
                        Remember Me
                    </label>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};

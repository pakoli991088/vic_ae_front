import "./style.css";
import {useEffect, useState} from "react";

export const LoginForm = () => {
    // 初始化 email 狀態
    const [email, setEmail] = useState("");

    // 檢查本地存儲中是否有 email，如果有，則將其設置為初始值
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            // 勾選了 "Check me out"，將 email 存儲到本地存儲
            localStorage.setItem("userEmail", email);
        }
    };

    return (
        <form className="container mt-5">
            <div className="mb-3 text-center">
                <label htmlFor="exampleInputEmail1" className="form-label" id="email">
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
                        Check me out
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

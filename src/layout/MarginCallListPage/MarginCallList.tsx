import React, {useEffect, useState} from 'react';
import "./style.css"
import {PopupForm} from "./Components/PopupForm/PopupForm";
import {SelectedData} from "../../types";
import Cookies from "js-cookie";
import axios from "axios";
import showNotification from "../Utils/Notification";

export const MarginCallList = () => {
    const data = [
        {
            notificationDate: '2022-05-03',
            acNo: 'M881326',
            acName: 'HIGH BEYOND HOLDINGS LIMITED',
            balanceAmount: '(6,024,512.74)',
            stockValue: '(3,772,179.79)',
            marginCallAmount: '1234.3214',
            followUpResult: '存錢',
            remark: 'DaphneDaphneDaphneDaphneDaphneDaphne',
            confirmDate: '5/3/2022'
        },
        {
            notificationDate: '2022-05-03',
            acNo: 'M881426',
            acName: 'LOW BEYOND HOLDINGS LIMITED',
            balanceAmount: '(5,024,512.74)',
            stockValue: '(2,772,179.79)',
            marginCallAmount: '-',
            followUpResult: '存款',
            remark: 'Daphne1',
            confirmDate: '5/3/2022'
        },
        // ...添加其他数据
    ];
    const [notificationMessage,setNotificationMessage] = useState("default error")
    const handleSuccessAlert = () => {
        showNotification({type: 'success', message: notificationMessage})
    };
    const handleErrorAlert = () => {
        showNotification({type: 'error', message: notificationMessage})
    };

    const [loading, setLoading] = useState(true);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<SelectedData | null>(null);
    const [viewOnly, setViewOnly] = useState(false);

    const openPopup = (data:SelectedData, isViewOnly:boolean) => {
        setSelectedData(data);
        setPopupOpen(true);
        setViewOnly(isViewOnly);
    };

    const closePopup = () => {
        setSelectedData(null);
        setPopupOpen(false);
    };

    useEffect(() => {
        // 验证 token
        const token = Cookies.get('tempTokens');
        if (token) {
            axios.post('http://localhost:8080/user/varify-token', { token })
                .then((response) => {
                    if (response.data.status === "success") {
                        console.log(response);
                        // 验证成功，获取数据
                        axios.get('YOUR_DATA_API_ENDPOINT')
                            .then((dataResponse) => {
                            })
                            .catch((error) => {
                                setNotificationMessage("get data error"); //未解決!!!
                                handleErrorAlert();   //未解決!!!
                                console.error('获取数据失败', error);
                            });
                    } else {
                        // 无效 token，重定向到登录页面或显示错误消息
                        // 你可以使用 react-router-dom 进行重定向
                        // 例如: history.push('/login') 或 window.location.href = '/login'
                        // 或显示错误消息并从 Cookie 中删除 token
                        Cookies.remove('tempTokens');
                        setLoading(false);
                        setNotificationMessage("Authentication failed , please login again"); //未解決!!!
                        handleErrorAlert();   //未解決!!!
                        window.location.href = '/'
                    }
                })
                .catch((error) => {
                    console.error('Token 验证失败', error);
                    setLoading(false);
                    setNotificationMessage("Authentication failed , Service Error"); //未解決!!!
                    handleErrorAlert();   //未解決!!!
                    window.location.href = '/'
                });
        } else {
            // 未找到 token，可能需要重定向到登录页面
            // 你可以使用 react-router-dom 进行重定向
            // 例如: history.push('/login') 或 window.location.href = '/login'
            setLoading(false);
            setNotificationMessage("Please login"); //未解決!!!
            handleErrorAlert();   //未解決!!!
            window.location.href = '/'
        }
    }, []);


    return (
        <div className="container">
            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>Notification Date</th>
                    <th>AC No</th>
                    <th>AC Name</th>
                    <th>Balance Amount</th>
                    <th>Stock Value</th>
                    <th>Margin Call Amount</th>
                    <th>Follow Up Result</th>
                    <th>Remark</th>
                    <th>Confirm Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => openPopup(item,true)}
                            >check</button>
                            <button type="button" className="btn btn-dark"
                                    onClick={() => openPopup(item,false)}
                            >reply</button>
                        </div>
                        </td>
                    </tr>
                ))}

                {/* Popup */}
                {isPopupOpen && selectedData !== null && (
                    <PopupForm data={selectedData} onClose={closePopup} viewOnly={viewOnly} />
                )}

                </tbody>
            </table>
        </div>
    );
};

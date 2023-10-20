import React, {useEffect, useState} from 'react';
import "./style.css"
import {PopupForm} from "./Components/PopupForm/PopupForm";
import {SelectedData} from "../../types";
import Cookies from "js-cookie";
import axios from "axios";
import showNotification from "../Utils/Notification";
import {MarginCallData} from "./MarginCallData";

export const MarginCallList = () => {
    const [data , setData] = useState<MarginCallData[]>([]);
    const [notificationMessage,setNotificationMessage] = useState("default error");
    // const [followUpResult , setFollowUpResult] = useState('');
    // const [remark , setRemark] = useState('');
    // const [confirmDate , setConfirmDate] = useState('');
    // const [loading, setLoading] = useState(true);
    const handleSuccessAlert = () => {
        showNotification({type: 'success', message: notificationMessage})
    };
    const handleErrorAlert = () => {
        showNotification({type: 'error', message: notificationMessage})
    };

    const [isPopupOpen, setPopupOpen] = useState(false);
    // const [selectedData, setSelectedData] = useState<SelectedData | null>(null);
    const [viewOnly, setViewOnly] = useState(false);

    const openPopup = (data:MarginCallData, isViewOnly:boolean) => {
        // setData(data);
        setPopupOpen(true);
        setViewOnly(isViewOnly);
    };
    const closePopup = () => {
        setData([]);
        setPopupOpen(false);
    };

    useEffect(() => {
        // 验证 token
        const token = Cookies.get('tempTokens');
        if (token) {
            axios.post('http://localhost:8080/user/verify-token', { token })
                .then((response) => {
                    if (response.data.status === "success") {
                        console.log(response);
                        // 验证成功，获取数据
                        axios.get('http://localhost:8080/margin-call/get/' + token)
                            .then((dataResponse) => {
                                console.log(dataResponse);
                                setData(dataResponse.data.data);
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
                        // setLoading(false);
                        setNotificationMessage("Authentication failed , please login again"); //未解決!!!
                        handleErrorAlert();   //未解決!!!
                        window.location.href = '/'
                    }
                })
                .catch((error) => {
                    console.error('Token 验证失败', error);
                    // setLoading(false);
                    setNotificationMessage("Authentication failed , Service Error"); //未解決!!!
                    handleErrorAlert();   //未解決!!!
                    window.location.href = '/'
                });
        } else {
            // 未找到 token，可能需要重定向到登录页面
            // 你可以使用 react-router-dom 进行重定向
            // 例如: history.push('/login') 或 window.location.href = '/login'
            // setLoading(false);
            setNotificationMessage("Please login"); //未解決!!!
            handleErrorAlert();   //未解決!!!
            window.location.href = '/'
        }
    }, []);

    useEffect(() => {

    },[data,notificationMessage])


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
                {data.map((item:MarginCallData, index) => (
                    <tr key={index}>
                        <td>{item.notificationDate}</td>
                        <td>{item.acNo}</td>
                        <td>{item.acName}</td>
                        <td>{item.balanceAmount.toString()}</td>
                        <td>{item.stockValue.toString()}</td>
                        <td>{item.guaranteedAmount.toString()}</td>
                        <td>{item.followUpResult?item.followUpResult:"請跟進"}</td>
                        <td>{item.remark ? item.remark:" N/A"}</td>
                        <td>{item.confirmDate? item.confirmDate : "尚未確認"}</td>
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
                {/*{isPopupOpen && data !== null && (*/}
                {/*    <PopupForm data={data} onClose={closePopup} viewOnly={viewOnly} />*/}
                {/*)}*/}

                </tbody>
            </table>
        </div>
    );
};

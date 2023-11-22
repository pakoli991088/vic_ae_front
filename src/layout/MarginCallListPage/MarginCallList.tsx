import React, { useEffect, useState } from 'react';
import "./style.css"
import { PopupForm } from "./Components/PopupForm/PopupForm";
import { SelectedData } from "../../types";
import Cookies from "js-cookie";
import axios from "axios";
import showNotification from "../Utils/Notification";
import { MarginCallData } from "./MarginCallData";
import { Navbar } from "../NavBar/Navbar";
import jsPDF from 'jspdf'
import autoTable, { CellInput, RowInput } from 'jspdf-autotable'
import './Components/font/NotoSansTC-Medium-normal'


import { url } from 'inspector';
import path from 'path';

export const MarginCallList = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [data, setData] = useState<MarginCallData[]>([]);
    const today = new Date().toISOString().substr(0, 10);
    const [notificationMessage, setNotificationMessage] = useState("default error");
    const [selectedData, setSelectedData] = useState<MarginCallData | null>(null);
    const [selectedFromDate, setSelectedFromDate] = useState(today);
    const [selectedToDate, setSelectedToDate] = useState(today);
    const [showHandleSuccessAlert, setShowHandleSuccessAlert] = useState(false);
    const [showHandleErrorAlert, setShowHandleErrorAlert] = useState(false);
    const [searchMarginACNo, setSearchMarginACNo] = useState<string>("");
    const [searchBarFollowUpResultType, setSearchBarFollowUpResultType] = useState("All");
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [viewOnly, setViewOnly] = useState(false);

    useEffect(() => {
    }
        , [])

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });

        // const myFont = '';


        // //     // add the font to jsPDF
        // doc.addFileToVFS("MyFont.ttf", myFont);
        // doc.addFont("MyFont.ttf", "MyFont", "normal");
        doc.setFont("NotoSansTC-Medium");


        const header = ['Notification Date', 'AC No', 'AC Name', 'Balance Amount', 'Stock Value', 'Margin Call Amount', 'Follow Up Result', 'Remark', 'Confirm Date'];
        const rowArr: RowInput[] = []
        for (const item of data) {
            let x: CellInput = [
                item.notificationDate ? item.notificationDate.toString() : "",
                item.acNo ? item.acNo.toString() : "",
                item.acName ? item.acName.toString() : "",
                item.balanceAmount ? item.balanceAmount.toString() : "",
                item.stockValue ? item.stockValue.toString() : "",
                item.guaranteedAmount ? item.guaranteedAmount.toString() : "",
                item.followUpResult ? decodeURI(encodeURI(item.followUpResult.toString())) : "",
                item.remark ? item.remark.toString() : "",
                item.confirmDate ? item.confirmDate.toString() : ""
            ];
            rowArr.push(x);
        }
        console.log(rowArr)
        // Or use javascript directly:
        autoTable(doc, {
            head: [header],
            body: rowArr,
            styles: {
                font: "NotoSansTC-Medium"
            }
        })
        doc.save('table.pdf')
    }

    const handleSuccessAlert = () => {
        showNotification({ type: 'success', message: notificationMessage })
    };
    const handleErrorAlert = () => {
        showNotification({ type: 'error', message: notificationMessage })
    };
    const openPopup = (data: MarginCallData, isViewOnly: boolean) => {
        setSelectedData(data);
        setPopupOpen(true);
        setViewOnly(isViewOnly);
    };
    const closePopup = () => {
        setPopupOpen(false);
    };
    const callGetDataAPi = () => {
        const token = Cookies.get('tempTokens');
        if (token) {
            axios.post(`${apiBaseUrl}/user/verify-token`, { token })
                .then((response) => {
                    if (response.data.status === "success") {
                        // console.log(response);  //show user information
                        // 验证成功，获取数据
                        let apiUrl;
                        if (searchMarginACNo === "") {
                            apiUrl = `${apiBaseUrl}/margin-call/get-margin-call/${token}/${selectedFromDate}/${selectedToDate}/${searchBarFollowUpResultType}`;
                        } else {
                            apiUrl = `${apiBaseUrl}/margin-call/get-margin-call/${token}/${selectedFromDate}/${selectedToDate}/${searchBarFollowUpResultType}/${searchMarginACNo}`;
                        }
                        axios.get(apiUrl)
                            .then((dataResponse) => {
                                if (dataResponse.data.status === "failed") {
                                    setNotificationMessage(dataResponse.data.msg);
                                    setShowHandleErrorAlert(true);
                                    console.log(searchBarFollowUpResultType);
                                    return;
                                }
                                setData(dataResponse.data.data);
                                console.log(dataResponse.data.data);
                            })
                            .catch((error) => {
                                setNotificationMessage(error.message);
                                setShowHandleErrorAlert(true);
                            });
                    } else {
                        // 无效 token，重定向到登录页面或显示错误消息
                        // 你可以使用 react-router-dom 进行重定向
                        // 例如: history.push('/login') 或 window.location.href = '/login'
                        // 或显示错误消息并从 Cookie 中删除 token
                        console.log("456");
                        Cookies.remove('tempTokens');
                        setNotificationMessage(response.data.msg);
                        setShowHandleErrorAlert(true);
                        window.location.href = '/'
                    }
                })
                .catch((error) => {
                    setNotificationMessage("Authentication failed , Service Error");
                    setShowHandleErrorAlert(true);
                    window.location.href = '/'
                });
        } else {

            {/*未找到 token，可能需要重定向到登录页面
            你可以使用 react-router-dom 进行重定向
            例如: history.push('/login') 或 window.location.href = '/login'*/
            }
            setNotificationMessage("Please login");
            setShowHandleErrorAlert(true);
            window.location.href = '/'
        }
    }

    useEffect(() => {
        callGetDataAPi();
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

    return (
        <div className="container">
            <Navbar />
            <div className='d-flex'>
                <div className="mt-2 mb-2 select-box p-2 d-flex justify-content-between w-100 flex-wrap">
                    <div className="d-flex">
                        <input type="date" value={selectedFromDate}
                            onChange={(e) => setSelectedFromDate(e.target.value)} />
                        <span>&nbsp;To&nbsp;</span>
                        <input type="date" value={selectedToDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setSelectedToDate(e.target.value)
                            }} />
                        <span>&nbsp;(dd/mm/yyyy)&nbsp;&nbsp;</span>
                    </div>
                    <div>
                        <label className="fw-bold">AC No&nbsp;&nbsp;</label>
                        <input type="text" value={searchMarginACNo} onChange={(e) => {
                            setSearchMarginACNo(e.target.value)
                        }} />
                    </div>
                    <div>
                        <label className="fw-bold">Follow up Result&nbsp;&nbsp;</label>
                        <select className="p-1" onChange={(e) => {
                            setSearchBarFollowUpResultType(e.target.value)
                        }}>
                            <optgroup>
                                <option>All</option>
                                <option>Not Followed</option>
                                <option>Followed</option>
                            </optgroup>
                        </select>
                    </div>

                    <div>
                        <button type="button" className="btn btn-primary" onClick={callGetDataAPi}>Inquire</button>
                    </div>
                    {data && data.length > 0 && (
                        <div>
                            <button type="button" className="btn btn-secondary " onClick={generatePDF}>Download PDF</button>
                        </div>
                    )}
                </div>


            </div>

            <table id="#my-table" className="table table-striped table-bordered table-hover">
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
                    {data && data.length > 0 ? data.map((item: MarginCallData, index) => (
                        <tr key={index}>
                            <td>{item.notificationDate}</td>
                            <td>{item.acNo}</td>
                            <td className="ac_name_width">{item.acName}</td>
                            <td>{item.balanceAmount.toLocaleString()}</td>
                            <td>{item.stockValue.toLocaleString()}</td>
                            <td>{item.guaranteedAmount.toLocaleString()}</td>
                            <td className={item.followUpResult ? 'text-primary fw-bold' : 'text-danger fw-bold'}>{item.followUpResult ? item.followUpResult : "Please follow"}</td>
                            <td className={item.remark ? 'text-success  fw-bold' : 'text-dark'}>{item.remark ? item.remark : ""}</td>
                            <td className={item.remark ? 'text-success  fw-bold confirm_date_td_width' : 'text-dark'}>{item.confirmDate ? item.confirmDate : ""}</td>
                            <td className="tdActionContainer" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-primary m-1"
                                        onClick={() => openPopup(item, true)}
                                    >Check
                                    </button>
                                    {item.followUpResult === null && (  // 检查 followUpResult 是否有值
                                        <button
                                            type="button"
                                            className="btn btn-dark m-1"
                                            onClick={() => openPopup(item, false)}
                                        >
                                            Reply
                                        </button>
                                    )}
                            </td>
                        </tr>
                    )) : null}

                    {/* Popup */}
                    {isPopupOpen && selectedData !== null && (
                        <PopupForm data={selectedData} onClose={closePopup} viewOnly={viewOnly} />
                    )}
                </tbody>
            </table>
        </div>
    );
};

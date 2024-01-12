import React, { useEffect, useState } from 'react';
import "./style.css"
import { ReplyPopupForm } from "./Components/PopupForm/ReplyPopupForm";
import Cookies from "js-cookie";
import axios from "axios";
import showNotification from "../Utils/Notification";
import { MarginCallData } from "./MarginCallData";
import { Navbar } from "../NavBar/Navbar";
import jsPDF from 'jspdf'
import autoTable, {Cell, CellInput, CellWidthType, Column, RowInput} from 'jspdf-autotable'
import './Components/font/NotoSansTC-Medium-normal'
import { url } from 'inspector';
import path from 'path';
import {CheckPopupForm} from "./Components/PopupForm/CheckPopupForm";

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
    const [isReplyPopupOpen, setReplyPopupOpen] = useState(false);
    const [isCheckPopupOpen, setCheckPopupOpen] = useState(false);
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

        const header = ['通知日期 Notif Date', '帳戶號碼 AC No', '帳戶名稱 AC Name', '結欠金額 Bal Amt', '股票市值 Stock Val', '追收保證金額 Margin Call Amt', 'AE跟進結果 AE f/u', 'AE備註 AE Remark','AE確認日期 AE Confirm Date','信貸/管理層跟進結果 Cr./MGT f/u','信貸/管理層備註 Cr./MGT Remark','信貸/管理層確認日期Cr./MGT Confirm Date'];
        const rowArr: RowInput[] = []
        const column = {
            width : 300,
        }
        for (const item of data) {
            let x: CellInput = [
                item.notificationDate ? item.notificationDate.toString() : "",
                item.acNo ? item.acNo.toString() : "",
                item.acName ? item.acName.toString() : "",
                item.balanceAmount ? item.balanceAmount.toLocaleString() : "",
                item.stockValue ? item.stockValue.toLocaleString() : "",
                item.guaranteedAmount ? item.guaranteedAmount.toLocaleString() : "",
                item.followUpResult ? decodeURI(encodeURI(item.followUpResult.toString())) : "",
                item.remark ? item.remark.toString() : "",
                item.confirmDate ? item.confirmDate.toString() : "",
                item.mgtFollowUpResult ? item.mgtFollowUpResult.toString() : item.creditFollowUpResult ? item.creditFollowUpResult.toString() :"",
                item.mgtFollowUpResult ? item.mgtRemark.toString() : item.creditFollowUpResult ? item.creditRemark.toString() : "",
                item.mgtFollowUpResult ? item.mgtFollowUpDate.toString() : item.creditFollowUpResult ? item.creditFollowUpDate.toString() : "" ,
            ];
            rowArr.push(x);
        }
        // Or use javascript directly:
        autoTable(doc, {
            head: [header],
            body: rowArr,
            columnStyles: {
                0: { // Define width for column 0
                    cellWidth: 22 // Set the width for column 0
                },
                1: { // Define width for column 1
                    cellWidth: 22 // Set the width for column 1
                },
                2: { // Define width for column 1
                    cellWidth: 22 // Set the width for column 1
                },
                3: { // Define width for column 1
                    cellWidth: 22 // Set the width for column 1
                },
                4: { // Define width for column 1
                    cellWidth: 22 // Set the width for column 1
                },
                5: { // Define width for column 1
                    cellWidth: 22 // Set the width for column 1
                },
                6: { // Define width for column 1
                    cellWidth: 22 // Set the width for column 1
                },
                7: { // Define width for column 1
                    cellWidth: 23 // Set the width for column 1
                },
                8: { // Define width for column 1
                    cellWidth: 23 // Set the width for column 1
                },
                9: { // Define width for column 1
                    cellWidth: 23 // Set the width for column 1
                },
                10: { // Define width for column 1
                    cellWidth: 23 // Set the width for column 1
                },
                11: { // Define width for column 1
                    cellWidth: 23 // Set the width for column 1
                },
                // Add more column widths as needed
            },
            styles: {
                font: "NotoSansTC-Medium",
                overflow: 'linebreak',
                fontSize : 8,
                cellWidth : "wrap",
            },

        })
        doc.save('table.pdf')
    }

    const handleSuccessAlert = () => {
        showNotification({ type: 'success', message: notificationMessage })
    };
    const handleErrorAlert = () => {
        showNotification({ type: 'error', message: notificationMessage })
    };
    const openReplyPopup = (data: MarginCallData, isViewOnly: boolean) => {
        setSelectedData(data);
        setReplyPopupOpen(true);
        setViewOnly(isViewOnly);
    };

    const openCheckPopup = (data: MarginCallData, isViewOnly: boolean) => {
        setSelectedData(data);
        setCheckPopupOpen(true);
        setViewOnly(isViewOnly);
    };
    const closeReplyPopup = () => {
        setReplyPopupOpen(false);
    };

    const closeCheckPopup = () => {
        setCheckPopupOpen(false);
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
                                    // console.log(searchBarFollowUpResultType);
                                    return;
                                }
                                setData(dataResponse.data.data);
                                // console.log(dataResponse.data.data);
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

            // {/*未找到 token，可能需要重定向到登录页面
            // 你可以使用 react-router-dom 进行重定向
            // 例如: history.push('/login') 或 window.location.href = '/login'*/
            // }
            setNotificationMessage("Please login");
            setShowHandleErrorAlert(true);
            window.location.href = '/'
        }
    }

    useEffect(() => {
        const isFirstLogin = Cookies.get('isAEFirstLogin');
        if(isFirstLogin === "true") {
            window.location.href = '/change-password';
        }
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
                    {data && data.length >0 ? data.map((item : MarginCallData , index) => {
                        console.log(data);
                      let trClassName = '';
                      if(item.consecutiveDays >2 && item.consecutiveDays < 5) {
                          trClassName = 'trBootstrapTableStripedBGYellow' ;
                      } else if (item.consecutiveDays > 4) {
                          trClassName = 'trBootstrapTableStripedBGRed';
                      } else {
                          trClassName = 'trBootstrapTableStripedBGWhite';
                      }
                      return (
                          <tr key={index}>
                              <td id={trClassName}>{item.notificationDate}</td>
                              <td id={trClassName}>{item.acNo}</td>
                              <td id={trClassName} className="ac_name_width">{item.acName}</td>
                              <td id={trClassName}>{item.balanceAmount.toLocaleString()}</td>
                              <td id={trClassName}>{item.stockValue.toLocaleString()}</td>
                              <td id={trClassName}>{item.guaranteedAmount.toLocaleString()}</td>
                              <td id={trClassName} className={item.followUpResult ? 'text-primary fw-bold' : 'text-danger fw-bold'}>{item.followUpResult ? item.followUpResult : "Please follow"}</td>
                              <td id={trClassName} className={item.remark ? 'text-success  fw-bold' : 'text-dark'}>{item.remark ? item.remark : ""}</td>
                              <td id={trClassName} className={item.remark ? 'text-success  fw-bold confirm_date_td_width' : 'text-dark'}>{item.confirmDate ? item.confirmDate : ""}</td>
                              <td id={trClassName} className="tdActionContainer" role="group" aria-label="Basic mixed styles example">
                                  <button type="button" className="btn btn-primary m-1"
                                          onClick={() => openCheckPopup(item, true)}
                                  >Check
                                  </button>
                                  {item.followUpResult === null && (  // check followUp != null
                                      <button
                                          type="button"
                                          className="btn btn-dark m-1"
                                          onClick={() => openReplyPopup(item, false)}
                                      >
                                          Reply
                                      </button>
                                  )}
                              </td>
                          </tr>
                      );
                    })
                    :null}

                    {/* Popup */}
                    {isCheckPopupOpen && selectedData !== null && (
                        <CheckPopupForm data={selectedData} onClose={closeCheckPopup} viewOnly={viewOnly}/>
                    )}
                    {isReplyPopupOpen && selectedData !== null && (
                        <ReplyPopupForm data={selectedData} onClose={closeReplyPopup} viewOnly={viewOnly} />
                    )}
                </tbody>
            </table>
        </div>
    );
};

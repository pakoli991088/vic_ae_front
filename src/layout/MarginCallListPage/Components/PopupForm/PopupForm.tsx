import React, { useEffect, useState } from "react";
import { SelectedData } from "../../../../types";
import { MarginCallData } from "../../MarginCallData";
import Cookies from "js-cookie";
import axios from "axios";
import showNotification from "../../../Utils/Notification";

type PopupFormProps = {
    data: MarginCallData;
    onClose: () => void;
    viewOnly: boolean;

};
export const PopupForm = ({ data, onClose, viewOnly }: PopupFormProps) => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const marginCallId = data.marginCallId;
    const updatedBy = Cookies.get("username");
    const today = new Date();
    const date = today.toISOString().substr(0, 10);

    const [reply, setReply] = useState('存款');
    const [followUpResult, setFollowUpResult] = useState('存款');

    const [remark, setRemark] = useState('');
    const [depositCurrency, setDepositCurrency] = useState('HKD');
    const [amount, setAmount] = useState('');
    const [stockNo, setStockNo] = useState('');
    const [stockQty, setStockQty] = useState('');
    const [mergeAcNo, setMergeAcNo] = useState('');
    const [guaranteedAssets, setGuaranteedAssets] = useState('');
    const [notificationMessage, setNotificationMessage] = useState("default error");
    const [showHandleSuccessAlert, setShowHandleSuccessAlert] = useState(false);
    const [showHandleErrorAlert, setShowHandleErrorAlert] = useState(false);

    useEffect(() => {
    }, [followUpResult, depositCurrency, amount, remark, stockNo, stockQty, mergeAcNo, guaranteedAssets]);

    const handleSuccessAlert = () => {
        showNotification({ type: 'success', message: notificationMessage })
    };
    const handleErrorAlert = () => {
        showNotification({ type: 'error', message: notificationMessage })
    };
    const handleSave = () => {
        const token = Cookies.get('tempTokens');
        if (token) {
            axios.post(`${apiBaseUrl}/user/verify-token`, { token })
                .then((response) => {
                    if (response.data.status === "success") {
                        axios.post(`${apiBaseUrl}/margin-call/update`, {
                            marginCallId: marginCallId,
                            updatedBy: updatedBy,
                            confirmDate: date,
                            followUpResult: followUpResult,
                            depositCurrency: depositCurrency,
                            amount: amount,
                            remark: remark,
                            stockNo: stockNo,
                            stockQty: stockQty,
                            mergeAcNo: mergeAcNo,
                            guaranteedAssets: guaranteedAssets
                        })
                            .then((dataResponse) => {
                                console.log("update successfully");
                                setNotificationMessage("updated success");
                                setShowHandleSuccessAlert(true);
                            })
                            .catch((error) => {
                                console.log("update failed");
                                setNotificationMessage("updated fail . " + error.get().message);
                                setShowHandleErrorAlert(true);
                            })
                    } else {
                        Cookies.remove('tempTokens');
                        setNotificationMessage("Authentication failed , please login again");
                        setShowHandleErrorAlert(true);
                        window.location.href = '/'
                    }
                });
        } else {
            setNotificationMessage("Please login");
            setShowHandleErrorAlert(true);
            window.location.href = '/';
        }
        onClose();
        // window.location.href = '/margin-call';
    };

    const handleReplyChange = (value: string) => {
        setReply(value);
        setFollowUpResult(value);
        resetFields(); // Reset all fields when reply is changed
    };

    const resetFields = () => {
        setDepositCurrency('');
        setAmount('');
        setStockNo('');
        setStockQty('');
        setMergeAcNo('');
        setGuaranteedAssets('');
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

    const renderAdditionalFields = () => {
        switch (reply) {
            case '存款':
                if (!viewOnly) {
                    return (
                        <div>
                            <div className="form-group">
                                <label className="fw-bold" htmlFor="depositCurrency">存款貨幣</label>
                                {/*<textarea className="form-control" rows={1} value={depositCurrency}*/}
                                {/*          onChange={(e) => setDepositCurrency(e.target.value)}/>*/}
                                <select
                                    id="depositCurrency"
                                    className="form-control"
                                    value={depositCurrency}
                                    onChange={(e) => setDepositCurrency(e.target.value)}
                                >
                                    <option value="HKD">HKD(港元)</option>
                                    <option value="CNY">CNY(人民幣)</option>
                                    <option value="USD">USD(美元)</option>
                                    <option value="MOP">MOP(澳門元)</option>
                                    <option value="TWD">TWD(新台幣)</option>
                                    <option value="JPY">JPY(日元)</option>
                                    <option value="KRW">KRW(韓元)</option>
                                    <option value="KRW">KRW(新加坡元)</option>
                                    <option value="GBP">GBP(英鎊)</option>
                                    <option value="EUR">EUR(歐元)</option>
                                    <option value="AUD">AUD(澳元)</option>
                                    <option value="NZD">NZD(紐西蘭元)</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <label className="fw-bold" htmlFor="amount">金額</label>
                                <textarea className="form-control" rows={1} value={amount}
                                    onChange={(e) => setAmount(e.target.value)} />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        // <div>
                        //     <div className="form-group">
                        //         <label>存款貨幣</label>
                        //         <p>{data.depositCurrency?data.depositCurrency: "N/A"}</p>
                        //     </div>
                        //     <div className="form-group">
                        //         <label>金額</label>
                        //         <textarea className="form-control" rows={1} value={amount}
                        //                   onChange={(e) => setAmount(e.target.value)}/>
                        //     </div>
                        // </div>
                        <div></div>
                    );
                }
            case '存貨':
            case '沽貨':
                return (
                    <div>
                        <div className="form-group">
                            <label className="mt-1 fw-bold" htmlFor="stockNo">股票號碼</label>
                            <textarea className="form-control" rows={1} value={stockNo}
                                onChange={(e) => setStockNo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="mt-1 fw-bold" htmlFor="stockQty">股數</label>
                            <textarea className="form-control" rows={1} value={stockQty}
                                onChange={(e) => setStockQty(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="mt-1 fw-bold" htmlFor="totalAmount">總金額</label>
                            <textarea className="form-control" rows={1} value={amount}
                                onChange={(e) => setAmount(e.target.value)} />
                        </div>
                    </div>
                );
            case '合併其他帳戶':
                return (
                    <div className="form-group">
                        <label className="mt-1 fw-bold" htmlFor="mergeAcNo">合併帳戶號碼</label>
                        <textarea className="form-control" rows={1} value={mergeAcNo}
                            onChange={(e) => setMergeAcNo(e.target.value)} />
                    </div>
                );
            case '擔保':
                return (
                    <div className="form-group ">
                        <label className="mt-1 fw-bold" htmlFor="guaranteeAssets">擔保資產</label>
                        <textarea className="form-control" rows={1} value={guaranteedAssets}
                            onChange={(e) => setGuaranteedAssets(e.target.value)} />
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Margin Call Record Details</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <label className="fw-bold" htmlFor="notificationDate">通知日期:</label>
                        <p id="notificationDate" className="fw-bold">{data.notificationDate}</p>
                        <label className="fw-bold" htmlFor="acNo">帳戶號碼:</label>
                        <p id="acNo" className="fw-bold">{data.acNo}</p>
                        <label className="fw-bold" htmlFor="acName">帳戶名稱:</label>
                        <p id="acName" className="fw-bold">{data.acName}</p>
                        <label className="fw-bold" htmlFor="balanceAmount">結欠金額:</label>
                        <p id="balanceAmount" className="fw-bold">{data.balanceAmount.toLocaleString()}</p>
                        <label className="fw-bold" htmlFor="stockValue">股票市值:</label>
                        <p id="stockValue" className="fw-bold" >{data.stockValue.toLocaleString()}</p>
                        <label className="fw-bold" htmlFor="guaranteeAmount">追收保證金額:</label>
                        <p id="guaranteeAmount" className="fw-bold">{data.guaranteedAmount.toLocaleString()}</p>
                        <div className="form-group">
                            <h5 className="modal-title">AE/Dealing Reply 回覆</h5>
                            {/*{viewOnly ? (*/}
                            {/*    <div></div>*/}
                            {/*) : null*/}
                            {/*}*/}
                        </div>
                        <div className="form-group">
                            <label className="fw-bold" htmlFor="formFollowUpResult">跟進結果</label>
                            {viewOnly ? (
                                <div>
                                    <div className="text-primary m-1 fw-bold ">{data.followUpResult ? data.followUpResult : ""}</div>
                                    {data.followUpResult && data.followUpResult === "存款" && (
                                        <div>
                                            <label className="fw-bold" htmlFor="formDepositCurrency">存款貨幣</label>
                                            <p className="m-1 text-primary fw-bold">{data.depositCurrency ? data.depositCurrency : ""}</p>
                                            <label className="fw-bold" htmlFor="formAmount">金額</label>
                                            <p className="m-1 text-primary fw-bold">{data.amount ? data.amount.toString() : ""}</p>
                                        </div>
                                    )}
                                    {data.followUpResult && (data.followUpResult === "存貨" || data.followUpResult === "沽貨") && (
                                        <div>
                                            <label className="fw-bold" htmlFor="formStockNo">股票號碼</label>
                                            <p className="m-1 text-primary fw-bold">{data.stockNo ? data.stockNo : ""}</p>
                                            <label className="fw-bold" htmlFor="formStockQty">股數</label>
                                            <p className="m-1 text-primary fw-bold">{data.stockQty ? data.stockQty : ""}</p>
                                            <label className="fw-bold" htmlFor="formTotalAmount">總金額</label>
                                            <p className="m-1 text-primary fw-bold">{data.amount ? data.amount.toString() : ""}</p>
                                        </div>
                                    )}
                                    {data.followUpResult && data.followUpResult === "合併其他帳戶" && (
                                        <div>
                                            <label className="fw-bold" htmlFor="formMergeAcNo">合併帳戶號碼</label>
                                            <p className="m-1 text-primary fw-bold">{data.mergeAcNo ? data.mergeAcNo : ""}</p>
                                        </div>
                                    )}
                                    {data.followUpResult && data.followUpResult === "擔保" && (
                                        <div>
                                            <label className="fw-bold" htmlFor="formGuranteeAssets">擔保資產</label>
                                            <p className="m-1 text-primary fw-bold">{data.guaranteedAssets ? data.guaranteedAssets : ""}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <select id="formFollowUpResult" className="form-control" value={reply}
                                    onChange={(e) => handleReplyChange(e.target.value)}>

                                    <option value="存款">存款</option>
                                    <option value="存貨">存貨</option>
                                    <option value="沽貨">沽貨</option>
                                    {/*<option value="跟進中">跟進中</option>*/}
                                    {/*<option value="觀察股價">觀察股價</option>*/}
                                    {/*<option value="股價上升">股價上升</option>*/}
                                    <option value="合併其他帳戶">合併其他帳戶</option>
                                    <option value="擔保">擔保</option>
                                    <option value="其他">其他</option>
                                    {/* ... 其他選項 ... */}
                                </select>
                            )}
                        </div>
                        {renderAdditionalFields()}
                        <div className="form-group">
                            <label className="fw-bold" htmlFor="remark">備註</label>
                            {viewOnly ? (
                                <p className="m-1 text-primary fw-bold">{data.remark ? data.remark : ""}</p>
                            ) : (
                                <textarea className="form-control" rows={3} value={remark}
                                    onChange={(e) => setRemark(e.target.value)} />
                            )}
                            {viewOnly ? (
                                <div>
                                    <label className="fw-bold" htmlFor="followUpPerson">跟進人</label>
                                    <p className="m-1 text-primary fw-bold">{data.aeConfirm ? data.aeConfirm : ""}</p>
                                </div>
                            ) : (
                                <div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>離開</button>
                        {!viewOnly && (
                            <button type="button" className="btn btn-primary" onClick={handleSave} >提交</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, {useState} from "react";
import {SelectedData} from "../../types";

type PopupFormProps = {
    data: SelectedData;
    onClose: () => void;
    viewOnly: boolean;

};
export const PopupForm = ({data, onClose, viewOnly}: PopupFormProps) => {

    const [reply, setReply] = useState('');
    const [followUpResult, setFollowUpResult] = useState('');
    const [remark, setRemark] = useState('');
    const [depositCurrency, setDepositCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [stockNumber, setStockNumber] = useState('');
    const [stockValue, setStockValue] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [guaranteedAsset, setGuaranteedAsset] = useState('');
    const handleSave = () => {
        // Perform save action here with form data
        // ...

        // Close the modal
        onClose();
    };
    const handleReplyChange = (value: string) => {
        setReply(value);
        resetFields(); // Reset all fields when reply is changed
    };

    const resetFields = () => {
        setDepositCurrency('');
        setAmount('');
        setStockNumber('');
        setStockValue('');
        setAccountNumber('');
        setGuaranteedAsset('');
    };

    const renderAdditionalFields = () => {
        switch (reply) {
            case '存款':
                return (
                    <div>
                        <div className="form-group">
                            <label>存款貨幣</label>
                            <textarea className="form-control" rows={1} value={depositCurrency}
                                      onChange={(e) => setDepositCurrency(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>金額</label>
                            <textarea className="form-control" rows={1} value={amount}
                                      onChange={(e) => setAmount(e.target.value)}/>
                        </div>
                    </div>
                );
            case '存貨':
            case '沽貨':
                return (
                    <div>
                        <div className="form-group">
                            <label>股票號碼</label>
                            <textarea className="form-control" rows={1} value={stockNumber}
                                      onChange={(e) => setStockNumber(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>股數或總金額</label>
                            <textarea className="form-control" rows={1} value={stockValue}
                                      onChange={(e) => setStockValue(e.target.value)}/>
                        </div>
                    </div>
                );
            case '合併其他帳戶':
                return (
                    <div className="form-group">
                        <label>合併帳戶號碼</label>
                        <textarea className="form-control" rows={1} value={accountNumber}
                                  onChange={(e) => setAccountNumber(e.target.value)}/>
                    </div>
                );
            case '擔保':
                return (
                    <div className="form-group">
                        <label>擔保資產</label>
                        <textarea className="form-control" rows={1} value={guaranteedAsset}
                                  onChange={(e) => setGuaranteedAsset(e.target.value)}/>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="modal fade show" style={{display: 'block'}} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Margin Call Record Details</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <label>通知日期:</label>
                        <p>{data.notificationDate}</p>
                        <label>帳戶號碼:</label>
                        <p>{data.acNo}</p>
                        <label>帳戶名稱:</label>
                        <p>{data.acName}</p>
                        <label>結欠金額:</label>
                        <p>{data.balanceAmount}</p>
                        <label>股票市值:</label>
                        <p>{data.stockValue}</p>
                        <label>追收保證金額:</label>
                        <p>{data.marginCallAmount}</p>
                        <div className="form-group">
                            <h5 className="modal-title">AE Reply 回覆</h5>
                            {viewOnly ? (
                                <div>{reply}</div>
                            ) : null
                            }
                        </div>
                        <div className="form-group">
                            <label>跟進結果</label>
                            {viewOnly ? (
                                <div>
                                    <div>{reply}</div>
                                    <p>{data.followUpResult}</p>
                                </div>
                            ) : (
                                <select className="form-control" value={reply}
                                        onChange={(e) => handleReplyChange(e.target.value)}>
                                    <option value="">請選擇</option>
                                    <option value="存款">存款</option>
                                    <option value="存貨">存貨</option>
                                    <option value="沽貨">沽貨</option>
                                    <option value="跟進中">跟進中</option>
                                    <option value="觀察股價">觀察股價</option>
                                    <option value="股價上升">股價上升</option>
                                    <option value="合併其他帳戶">合併其他帳戶</option>
                                    <option value="擔保">擔保</option>
                                    <option value="其他">其他</option>
                                    {/* ... 其他選項 ... */}
                                </select>
                            )}
                        </div>
                        {renderAdditionalFields()}
                        <div className="form-group">
                            <label>備註</label>
                            {viewOnly ? (
                                <p>{data.remark}</p>
                            ) : (
                                <textarea className="form-control" rows={3} value={remark}
                                          onChange={(e) => setRemark(e.target.value)}/>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>離開</button>
                        {!viewOnly && (
                            <button type="button" className="btn btn-primary" onClick={handleSave}>提交</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, {useState} from 'react';
import "./style.css"
import {Navbar} from "../NavBar/Navbar";
import {PopupForm} from "./Components/PopupForm/PopupForm";
import {SelectedData} from "../../types";

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

    return (
        <div>
            <Navbar/>
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
                        <td>{item.notificationDate}</td>
                        <td>{item.acNo}</td>
                        <td>{item.acName}</td>
                        <td>{item.balanceAmount}</td>
                        <td>{item.stockValue}</td>
                        <td>{item.marginCallAmount}</td>
                        <td>{item.followUpResult}</td>
                        <td>{item.remark}</td>
                        <td>{item.confirmDate}</td>
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

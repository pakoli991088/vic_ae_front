
export interface MarginCallData  {
    marginCallId:Number,
    notificationDate:String,
    acNo : String,
    acName : String,
    balanceAmount : Number,
    stockValue : Number,
    guaranteedAmount:Number,
    followUpResult:String,
    confirmDate:String,
    remark:String,
    updatedBy:String,

    depositCurrency: String,
    amount: Number,
    stockNo: String,
    stockQty: String,
    mergeAcNo: String,
    guaranteedAssets: String,

}

// export type SelectedData = {
//     notificationDate: String;
//     acNo: String;
//     acName: String;
//     balanceAmount: Number;
//     stockValue: Number;
//     marginCallAmount: Number;
//     followUpResult: String;
//     remark: String;
//     confirmDate: String;
// };
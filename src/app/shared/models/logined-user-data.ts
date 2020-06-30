export interface IloginedUserData {
    token?: string;
    clientRegisterResponse?: IClientRegisterResponse;
}
export interface IClientRegisterResponse {
    MessageText?: string;
    returnCode?: string;
    accountInfo?: IAccountInfo;
    clientInfo?: IClientInfo;
    cardInfo?: ICardInfo;
}
export interface IAccountInfo {
    accountNumber?: string;
    accountStatus?: string;
    acctCurrency?: string;
}
export interface ICardInfo {
    cardDesign: string;
    cardMaterial: string;
    cardNumber: string;
    cardStatus: string;
    expiryDate: string;
}
export interface IClientInfo {
    DoB: string;
    clientNumber: string;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    mobileNumber: string;
}

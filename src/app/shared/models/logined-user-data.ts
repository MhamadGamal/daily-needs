export interface IClientRegisterResponse {
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
    DoB?: string;
    clientNumber?: string;
    email?: string;
    firstName?: string;
    gender?: string;
    lastName?: string;
    mobileNumber?: string;
    lang?: string;
    shortName?: string;
    country?: string;
    registrationDate?: string;
}



export interface IloginedUserData {
    loginAuthenticationResponse?: LoginAuthenticationResponse;
}
export interface LoginAuthenticationResponse {
    MessageText?: string;
    returnCode?: string;
    accountInfo?: IAccountInfo;
    clientInfo?: IClientInfo;
}




export interface IUpdateClientInfoResponse {
    updateClientInfoResponse: UpdateClientInfoResponse;
}
export interface UpdateClientInfoResponse {
    MessageText?: string;
    returnCode?: string;
    clientInfo?: IClientInfo;
    ClientoptIn?: IClientoptIn[];
}
export interface IClientoptIn {
    Type?: string;
    status?: string;
}

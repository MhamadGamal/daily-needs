export interface IOrderInfo {
    invoiceNumber?: string;
    note?: string;
    orderDate?: string;
    orderID?: string;
    orderStatus?: IOrderStatus;
    restaurantOrderInfo?: IRestaurantOrderInfo;
}
export interface IOrderStatus {
    fireTimer?: string;
    orderStatusDate?: string;
    orderStatusID?: string;
    orderStatusName?: string;
}
export interface IRestaurantOrderInfo {
    restaurantBranchID?: string;
    restaurantBranchName?: string;
    orderRequireClientInfo?: IOrderRequireClientInfo;
}
export interface IOrderRequireClientInfo {
    accountNumber?: string;
    clientNumber?: string;
    groupNumber?: string;
}

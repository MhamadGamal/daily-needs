export interface IMenu {
    restaurantsItemsListResponse?: IRestaurantsItemsListResponse;
}
export interface IRestaurantsItemsListResponse {
    returnCode?: string;
    MessageText?: string;
    additionalData?: IAdditionalData;
    categoryType?: ICategoryType;
    restaurantInfo?: IRestaurantInfo;
    resturentItemsInfo: IresturentItemsInfo[];
}
export interface IAdditionalData {
    lang?: string;
    reservedData?: string;
    reservedData2?: string;
}
export interface ICategoryType {
    categoryTypeID?: string;
    catergoryTypeName?: string;
    categoriesInfo?: ICategoriesInfo[];
}
export interface ICategoriesInfo {
    categoryID?: string;
    catergoryName?: string;
    threeLevel?: boolean;
    attributes?: Iattributes[];
}
export interface Iattributes {
    attributeID?: string;
    attributeValue?: string;
}
export interface IRestaurantInfo {
    restaurantID?: string;
    restaurantName?: string;
    branchId?: string;
    geolocationLat?: string;
    geolocationLong?: string;
    clientNumber?: string;
    groupNumber?: string;
    accountCurrency?: string;
    accountNumber?: string;
    categoryIDs?: string;
    address?: IAddress;
    payment?: Ipayment;
    phones?: Iphones;
    branchCalender?: IbranchCalender;
    attributes?: Iattributes[];
    restaurantAdditonalData?: IrestaurantAdditonalData;
}

export interface IAddress {
    addressType?: string;
    addressValue?: string;
}
export interface Ipayment {
    paymentMethodName?: string;
    paymentMethodValue?: string;
}
export interface Iphones {
    phoneType?: string;
    phoneNumber?: string;
}
export interface IbranchCalender {
    calenderID?: string;
    calenderType?: string;
    fromHour?: string;
    fromMinute?: string;
    toHour?: string;
    toMinute?: string;
    restaurantBranchID?: string;
}
export interface IrestaurantAdditonalData {
    reservedData?: string;
}
export interface IresturentItemsInfo {
    itemID?: string;
    threeLevel?: boolean;
    cartItemsNum?: number;
    selectedTime?: number;
    itemName?: string;
    itemDesc?: string;
    isFavorite?: string;
    availStatus?: string;
    categoryIDs?: string | string[];
    attributes?: Iattributes[];
    prices?: Iprices;
}
export interface Iprices {
    priceNumber?: number;
    discountValue?: number;
    discountTypeID?: string;
    discountTypeName?: string;
    categoryName?: string;
    categoryID?: string;
    priceItemCategoryID?: string;
    maxExtraItemQuantity?: string;
    minExtraItemQuantity?: string;
}

import { IRestaurantInfo, IAdditionalData, Iprices, Iattributes } from './menu';

export interface IFavouriteItemsRs {
    getClientFavoriteItemsResponse: IgetClientFavoriteItemsResponse;
}
export interface IgetClientFavoriteItemsResponse {
    returnCode: string;
    MessageText: string;
    additionalInfo: IAdditionalData;
    favoriteItemTab: IfavoriteItemTab;
}
export interface IfavoriteItemTab {
    restaurantInfo: IRestaurantInfo;
    itemsTab: IitemsTab | Array<IitemsTab>
}
export interface IitemsTab {
    itemID: string;
    itemName: string;
    itemDesc: string;
    isFavorite: string;
    availStatus: string;
    categoryIDs: string;
    prices: Iprices;
    attributes: Array<Iattributes>;
}


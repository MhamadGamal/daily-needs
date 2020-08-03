import { MenuItemsService } from './menu-items.service';
import { IMenu, IresturentItemsInfo } from './../models/menu';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemsNum = 0;
  cartItems: Array<IresturentItemsInfo> = [];
  menu: IMenu;
  totalPrice = 0;
  shipping = 0;
  vat = 0;
  constructor(private menuItemsService: MenuItemsService) {
    this.menu = this.menuItemsService.menu;
    if (sessionStorage.getItem('cartItemsNum')) {
      this.cartItemsNum = Number(sessionStorage.getItem('cartItemsNum'));
    }
    if (sessionStorage.getItem('price')) {
      this.totalPrice = Number(sessionStorage.getItem('price'));
    }
    if (sessionStorage.getItem('vat')) {
      this.vat = Number(sessionStorage.getItem('vat'));
    }
    if (sessionStorage.getItem('shipping')) {
      this.shipping = Number(sessionStorage.getItem('shipping'));
    }
    if (sessionStorage.getItem('cartItems')) {
      this.cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    }
  }
  addToCart(id: string, itemNo: number) {
    debugger;
    if (id && Number(itemNo)) {
      this.menuItemsService.menu.restaurantsItemsListResponse.resturentItemsInfo.forEach((item: IresturentItemsInfo) => {
        if (item.itemID === id) {
          const time = new Date().getTime();
          this.totalPrice += (Number(itemNo) * Number(item.prices.priceNumber));
          const copy = Object.assign({}, item);
          copy.cartItemsNum = Number(itemNo);
          copy.selectedTime = time;
          this.cartItems.push(copy);
          this.cartItemsNum += copy.cartItemsNum;
        }
      });
      this.setcartItems();
    }
  }
  updateCartItem(id: string, itemNo: number, time: number) {
    if (id && Number(itemNo)) {
      this.totalPrice = 0;
      this.cartItemsNum = 0;
      this.cartItems.forEach((item: IresturentItemsInfo) => {
        if (item.itemID === id && item.selectedTime === time) {
          item.cartItemsNum = Number(itemNo);
        }
        this.totalPrice += (item.cartItemsNum * Number(item.prices.priceNumber));
        this.cartItemsNum += Number(item.cartItemsNum);
      });
      this.setcartItems();
    }
  }
  removeFromCart(id: string, time: number) {
    if (this.cartItemsNum > 0) {
      this.cartItems.forEach((_item: IresturentItemsInfo, i) => {
        if (_item.itemID === id && _item.selectedTime === time) {
          this.totalPrice -= (_item.cartItemsNum * Number(_item.prices.priceNumber));
          this.cartItemsNum -= _item.cartItemsNum;
          _item.cartItemsNum = 0;
          this.cartItems.splice(i, 1);
        }
      });
      this.setcartItems();
    }
  }
  setcartItems() {
    sessionStorage.setItem('cartItemsNum', String(this.cartItemsNum));
    sessionStorage.setItem('price', String(this.totalPrice));
    sessionStorage.setItem('vat', String(this.vat));
    sessionStorage.setItem('shipping', String(this.shipping));
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  resetCart() {
    this.cartItems = [];
    this.cartItemsNum = 0;
    this.totalPrice = 0;
    this.vat = 0;
    this.shipping = 0;
    sessionStorage.removeItem('cartItemsNum');
    sessionStorage.removeItem('price');
    sessionStorage.removeItem('vat');
    sessionStorage.removeItem('shipping');
    sessionStorage.removeItem('cartItems');
  }
}

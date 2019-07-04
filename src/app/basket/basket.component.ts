import { Component, OnInit } from '@angular/core';
import {HelperService} from '../helper.service';
import {BasketBook} from '../basketBook';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  private basket: {
    list: any,
    totalCount: number,
    totalPrice: number
  };

  constructor(private helper: HelperService) {
  }

  ngOnInit() {
    this.basket = this.helper.getBasket();
  }

  public delete(book: BasketBook) {
    this.basket.list.splice(this.basket.list.indexOf(book), 1);
    this.basket.totalPrice -= book.price;
    this.basket.totalCount--;
  }

  public minus(book: BasketBook) {
    book.count = book.count - 1;
    this.basket.totalPrice -= book.price;
    this.basket.totalCount--;
    if (book.count <= 0) {
      this.basket.list.splice(this.basket.list.indexOf(book), 1);
    }
  }

  public plus(book: BasketBook) {
    book.count++;
    this.basket.totalCount++;
    this.basket.totalPrice += book.price;
  }

}

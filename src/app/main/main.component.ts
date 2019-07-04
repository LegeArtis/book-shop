import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Book} from '../book';
import {HelperService} from '../helper.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  searchText;
  user: User;
  books: any;
  tempBook: Book;
  delete = false;
  basket: {
    list: any,
    totalCount: number,
    totalPrice: number
  };

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.books = this.helper.getBooks();
    this.basket = this.helper.getBasket();
    this.user = this.helper.getUser();
  }

  public edit(book: Book) {
    this.helper.tempBook = book;
  }

  public buy(book: Book) {
    this.helper.buy(book);
  }

  public onDelete(book: Book) {
    if (this.books.includes(book)) {
      this.helper.onDelete(book);
      this.delete = false;
      this.tempBook = null;
      this.books = this.helper.getBooks();
    }
  }

}

import { Injectable } from '@angular/core';
import {Book} from './book';
import {BasketBook} from './basketBook';
import {User} from './user';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private books =  [
    new Book('Оно', 2018, 'ужастик', 100),
    new Book('Мстители', 2019, 'фантастика', 150),
    new Book('Аль-Капоне', 1979, 'триллер', 200),
    new Book('Аль-Капоне', 1980, 'триллер', 200),
    new Book('Аль-Капоне', 1980, 'триллер', 250),
    new Book('Голубая лагуна', 1985, 'драмма', 90)
  ];
  private basket = {
    list: [],
    totalCount: 0,
    totalPrice: 0
  };
  private user: User;
  private users = [
    new User('admin', 'admin'),
    new User('user', 'user')
  ];
  private eventSubject = new BehaviorSubject<any>(undefined);
  // tslint:disable-next-line:variable-name
  private _tempBook: Book;

  getBooks(): [] {
    return this.sort(this.books);
  }

  getBasket() {
    return this.basket;
  }

  getUser(): User {
    return this.user;
  }

  getEvent(): BehaviorSubject<any> {
    return this.eventSubject;
  }

  triggerEvent(param: any) {
    this.eventSubject.next(param);
  }

  public onDelete(book: Book) {
    if (this.books.includes(book)) {
      console.log('try to delete');
      this.books.splice(this.books.indexOf(book), 1);
      console.log(this.books);
    }
  }

  public onEdit(form) {
      this.books.forEach((el: Book) => {
        if (el.name === this._tempBook.name &&
          el.description === this._tempBook.description &&
          el.year === this._tempBook.year &&
          el.price === this._tempBook.price) {
          el.name = form.name;
          el.description = form.description;
          el.year = form.year;
          el.price = form.price;
        }
      });
      this._tempBook = null;
  }


  get tempBook(): Book {
    return this._tempBook;
  }

  set tempBook(value: Book) {
    this._tempBook = value;
  }

  public add(book) {
      this.books.push(book);
  }

  private sort(books) {
   return  books.sort((a: Book, b: Book) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      if (b.price === a.price) {
        if (a.year < b.year) {
          return  1;
        } else {
          return -1;
        }
      }
    });
  }

  public buy(book: Book) {
    if (this.basket.list.length === 0) {
      const basketBook = new BasketBook(book.name, book.year, book.description, book.price, 1);
      this.basket.list.push(basketBook);
      this.basket.totalCount++;
      this.basket.totalPrice += book.price;
    } else {
      const check = this.basket.list.reduce(((previousValue, currentValue: BasketBook) => {
        if (currentValue.name === book.name &&
          currentValue.price === book.price &&
          currentValue.description === book.description &&
          currentValue.year === book.year) {
          currentValue.count++;
          this.basket.totalCount++;
          this.basket.totalPrice += book.price;
          return true;
        }
        return previousValue;
      }), false);

      if (!check) {
        const basketBook = new BasketBook(book.name, book.year, book.description, book.price, 1);
        this.basket.list.push(basketBook);
        this.basket.totalCount++;
        this.basket.totalPrice += book.price;
      }
    }
  }

  public onLogIn(loginForm) {
    this.users.forEach((el) => {
      if (el.login === loginForm.login && el.password === loginForm.pass) {
        this.user = el;
        this.triggerEvent(el);
        console.log('User log in');
      }
    });
  }

  constructor() { }
}

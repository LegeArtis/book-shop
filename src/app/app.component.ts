import {Component, OnInit} from '@angular/core';
import {Book} from './book';
import {User} from './user';
import {BasketBook} from './basketBook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books = [];
  users = [
    new User('admin', 'admin'),
    new User('user', 'user')
  ];
  loginWindow = false;
  user: User;
  error = false;
  addBookWindow = false;
  tempBook: Book;
  edit = false;
  delete = false;
  searchText;
  basketWindow = false;
  basket = {
    list: [],
    totalCount: 0,
    totalPrice: 0
  };

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
          console.log('+1?');
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

  public onLogIn(loginForm) {
    this.users.forEach((el) => {
      if (el.login === loginForm.login && el.password === loginForm.pass) {
        this.user = el;
        console.log('User log in');
        this.loginWindow = false;
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 1500);
      }
    });
  }

  public onDelete(book: Book) {
    if (this.books.includes(book)) {
      console.log('try to delete');
      this.books.splice(this.books.indexOf(book), 1);
      this.tempBook = null;
      console.log(this.books);
    }
  }

  public add(form) {
    if (form.name.trim() !== '' || form.description.trim() !== '') {
      const book = new Book(form.name, form.year, form.description, form.price);
      console.log(book);
      this.books.push(book);
      this.sort();
    } else {
      console.log('ROGUE!');
    }
  }

  public onEdit(form) {
    if (form.name.trim() !== '' || form.description.trim() !== '') {
      this.books.forEach((el: Book) => {
        if (el.name === this.tempBook.name &&
          el.description === this.tempBook.description &&
          el.year === this.tempBook.year &&
          el.price === this.tempBook.price) {
          el.name = form.name;
          el.description = form.description;
          el.year = form.year;
          el.price = form.price;
        }
      });
      this.tempBook = null;
      this.sort();
    } else {
      console.log('ROGUE!');
    }
  }

  private sort() {
    this.books.sort((a: Book, b: Book) => {
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


  ngOnInit(): void {
    this.books =  [
      new Book('Оно', 2018, 'ужастик', 100),
      new Book('Мстители', 2019, 'фантастика', 150),
      new Book('Аль-Капоне', 1979, 'триллер', 200),
      new Book('Аль-Капоне', 1980, 'триллер', 200),
      new Book('Аль-Капоне', 1980, 'триллер', 250),
      new Book('Голубая лагуна', 1985, 'драмма', 90)
    ];
    this.sort();
  }
}


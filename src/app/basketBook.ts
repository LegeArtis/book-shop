import {Book} from './book';

export class BasketBook extends Book {
  count = 0;


  constructor(name, year, description, price, count: number) {
    super(name, year, description, price);
    this.count = count;
  }
}

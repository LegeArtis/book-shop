import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {HelperService} from './helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books = [];
  user: User;
  basket: {
    list: any,
    totalCount: number,
    totalPrice: number
  };


  constructor(private helper: HelperService) {
  }

  ngOnInit(): void {
    this.basket = this.helper.getBasket();
    this.helper.getEvent().subscribe((user: User) => {
      if (user !== undefined) {
        console.log('Opp');
        this.user = user;
      }
    });
  }











}


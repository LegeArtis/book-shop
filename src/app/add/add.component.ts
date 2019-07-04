import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {HelperService} from '../helper.service';
import {User} from '../user';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  user: User;
  addOk = false;

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.user = this.helper.getUser();
  }

  public add(form) {
    if (form.name.trim() !== '' || form.description.trim() !== '') {
      const book = new Book(form.name, form.year, form.description, form.price);
      this.helper.add(book);
      this.addOk = true;
      setTimeout(() => {
        this.addOk = false;
      }, 1000);
      console.log(book);
    } else {
      console.log('ROGUE!');
    }
  }

}

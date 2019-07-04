import { Component, OnInit } from '@angular/core';
import {HelperService} from '../helper.service';
import {Book} from '../book';
import {Router} from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  book: Book;
  user: User;

  constructor(private helper: HelperService,
              private router: Router) { }

  ngOnInit() {
    this.book = this.helper.tempBook;
    this.user = this.helper.getUser();
  }

  public onEdit(form) {
    if (form.name.trim() !== '' || form.description.trim() !== '') {
      this.helper.onEdit(form);
      this.router.navigateByUrl('/');
    } else {
      console.log('ROGUE!');
    }
  }

}

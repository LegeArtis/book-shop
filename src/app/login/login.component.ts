import { Component, OnInit } from '@angular/core';
import {HelperService} from '../helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;

  constructor(private helper: HelperService,
              private router: Router) { }

  ngOnInit() {
  }

  public onLogIn(loginForm) {
    this.helper.onLogIn(loginForm);
    if (!this.helper.getUser()) {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 1500);
    } else {
      this.router.navigateByUrl('/');
    }
  }

}

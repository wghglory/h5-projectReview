import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  // selector: 'app-login',  // use router, so this is not required
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  inputType: string = 'password';
  username: string = '';
  password: string = '';

  constructor(private _router: Router, private _loginService: LoginService) {}

  clearUsername(): void {
    this.username = '';
  }
  clearPassword(): void {
    this.password = '';
  }
  togglePassword(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }
  tryLogin(): void {
    if (this.username !== '' && this.password !== '') {
      this._loginService.postLogin(this.username, this.password).subscribe((res) => {
        if (res.code === 0 && res.info === 'login successfully') {
          // 跳到首页
          this._router.navigate(['/']);
        }
      }, (error) => (this.errorMessage = <any>error));
    }
  }
  ngOnInit() {}
}

import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLogin: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.currentLoggedIn.subscribe(isLogin => this.isLogin = isLogin);
    if (this.authService.isLoggedIn()) {
      this.authService.checkLogin(true);
      this.router.navigate(['home']);
    }
    else {
      this.authService.checkLogin(false);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.userService.getUser().subscribe({
        next: (res) => {
          const user = res.find((u: any) => {
            return u.email === this.loginForm.value.email && u.password === this.loginForm.value.password;
          })
          if (user) {
            alert("Login successfull");
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            localStorage.setItem("token", "fake-token");
            this.authService.checkLogin(true);
            this.loginForm.reset();
            this.router.navigate(['home']);
          } else {
            this.authService.checkLogin(false);
            alert("User Not Found");
          }
        },
        error: () => {
          alert("Server side Failed");
        }
      });
    }

  }
  
  redirectToSignUp(): void {
    this.router.navigate(['signUp']);
  }

}
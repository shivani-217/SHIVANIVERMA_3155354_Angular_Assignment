import { UserService } from './../../../features/user/services/user.service';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../features/interfaces/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;
  user: User;
  constructor(private router: Router, private authService: AuthService, private userService: UserService,
    public translate: TranslateService) { }


  ngOnInit(): void {
    this.checkLogin();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      this.authService.checkLogin(true);
    }
    this.authService.currentLoggedIn.subscribe(isLogin => this.isLogin = isLogin);
  }


  goto(route: string) {
    this.router.navigateByUrl(route);
  }


  addPrimeMembership() {
    if (localStorage.getItem('loggedInUser')) {
      localStorage.setItem('primeMember', "true");
      alert("Prime Membership added");
    }
  }


  logout(): void {
    this.authService.logout();
  }

}


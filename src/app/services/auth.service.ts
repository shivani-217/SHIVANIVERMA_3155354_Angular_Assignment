import { Router } from '@angular/router';
import { UserService } from './../features/user/services/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentLoggedIn = this.loggedIn.asObservable();

  constructor(private router: Router, private userService: UserService) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() != null ? true : false;
  }

  checkLogin(isLogin: boolean) {
    this.loggedIn.next(isLogin);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('watchedList');
    localStorage.removeItem('favList');
    this.router.navigate(['login']);
  }





  // login({email,password}:any): Observable<any>{
  //   console.log(email);
  //   console.log(password);
  //   let user: any;
  //   this.userService.getUser().subscribe({
  //     next: (res)=>{
  //          user = res.find((u:any)=>{
  //         return u.email === email && u.password === password;
  //       })
  //       console.log(user);
  //     },
  //     error:()=>{
  //       alert("api down");
  //     }
  //   })
  //   console.log(user);
  //   if(user){
  //     console.log("check user",user);
  //     localStorage.setItem("token","fake-token");
  //     return of(user);
  //   }
  //   else{
  //     return throwError(()=>new Error('Failed to login'));
  //   }

  // }

  // login({ email, password}:any): Observable<any>{
  // let user= User;undefined;
  //   this.userService.getUser().subscribe({
  //     next: (res)=>{
  //       user = res.find((u:any)=>{
  //         return u.email === email && u.password === password;
  //       })
  //     },error:()=>{
  //           alert("incorrec");
  //     });
  //     if(user){
  //       this.setToken('jwt-token');
  //       return of({name:user.name, email:user.email});
  //     }

  // }

  //   this.userService.getUser().subscribe({
  //     next: (res)=>{
  //       const user = res.find((u:any)=>{
  //         return u.email === email && u.password === password;
  //       })
  //       if(user){
  //         this.setToken('jwt-token');
  //       }
  //       return of({name:user.name, email:user.email});
  //     },error:()=>{
  //       return throwError(new Error('Failed to login'));
  //     }
  //   })



  // }
}
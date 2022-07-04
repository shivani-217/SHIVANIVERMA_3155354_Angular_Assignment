import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApiUrl = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) { }

  registerUser(data: any) {
    return this.http.post<any>(this.baseApiUrl, data);
  }

  getUser() {
    return this.http.get<any>(this.baseApiUrl);
  }

}

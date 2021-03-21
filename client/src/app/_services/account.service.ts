import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { clear } from 'node:console';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl =environment.apiUrl;
private currentUserSource = new ReplaySubject<User>(1);
currentUsers$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }
  
  login(model:any){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

registor(model:any){
    return this.http.post(this.baseUrl+'account/register', model).pipe(
      map((user:User)=>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
}

  setCurrentUser(user:User){
this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}

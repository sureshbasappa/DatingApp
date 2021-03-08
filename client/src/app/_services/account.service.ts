import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';




@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl ='https://localhost:5001/api/';
private currentUserSource = new ReplaySubject<User>(1);
currentUsers$ = this.currentUserSource.asObservable();





  constructor(private http:HttpClient) { }
  
  login(model:User){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response:any)=>{
        const User = response;
        if(User){
          localStorage.setItem('User', JSON.stringify(User));
          this.currentUserSource.next(User);
          console.log(User);
        }
      })
    )
  }

registor(model:any){
    return this.http.post(this.baseUrl+'account/register', model).pipe(
      map((user:any)=>{
        if(user){
          localStorage.setItem('User', JSON.stringify(user))
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
    this.currentUserSource.next();
  }

}

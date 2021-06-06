import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isSuccsesfulLogin = false;
  private isLoggedIn$: BehaviorSubject<any> = new BehaviorSubject(false);
  currentUsername: any;

  constructor() { }

  login(username: any, password: any){
    if( username !== 'no' && password !== 'no'){
      this.currentUsername = username;
      this.isSuccsesfulLogin = true
      this.isLoggedIn$.next(true);
    }else{
      this.currentUsername = null;
      this.isSuccsesfulLogin = false
      this.isLoggedIn$.next(false);
    }
    return this.isSuccsesfulLogin;
  }

  logout(){
    this.isLoggedIn$.next(false);
  }

  isLoggedIn(){
    return this.isLoggedIn$.asObservable();
  }

  getCurrentUsername(){
    return this.currentUsername;
  }
}

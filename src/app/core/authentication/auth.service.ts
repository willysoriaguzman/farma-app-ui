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

  login(username: string, password: string){
    if( username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin'){
      this.currentUsername = username;
      this.isSuccsesfulLogin = true

      this.isLoggedIn$.next(true);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
    }else{
      this.currentUsername = null;
      this.isSuccsesfulLogin = false
      sessionStorage.setItem('isLoggedIn', 'false');
      this.isLoggedIn$.next(false);
    }
    return this.isSuccsesfulLogin;
  }

  logout(){
    this.isLoggedIn$.next(false);
    sessionStorage.clear();
  }

  isLoggedIn(){
    const loggedValue = sessionStorage.getItem('isLoggedIn');
    if(loggedValue)
      this.isLoggedIn$.next(JSON.parse(loggedValue));
    else
      this.isLoggedIn$.next(false);

    return this.isLoggedIn$.asObservable();
  }

  getCurrentUsername(){
    const username = sessionStorage.getItem('username');
    this.currentUsername = username ? username : null;
    return this.currentUsername;
  }
}

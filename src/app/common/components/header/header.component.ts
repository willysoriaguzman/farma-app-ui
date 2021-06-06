import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  username = null;

  constructor(private logger: NGXLogger,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.logger.trace('Header Init');
    this.auth.isLoggedIn().subscribe( data => {
      this.isLoggedIn = data;
      if(data){
        this.username = this.auth.currentUsername;
      }
    });
  }

  logout(){
    this.auth.logout();
  }

}

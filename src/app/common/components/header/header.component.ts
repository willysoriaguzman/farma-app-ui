import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  isLoggedIn = false;
  username = null;

  constructor(private logger: NGXLogger,
    private auth: AuthService,
    private router: Router) { 
      this.logger.trace('Header const');
    }
  ngAfterViewInit(): void {
    this.logger.trace('Header After Init');
  }

  ngOnInit(): void {
    this.logger.trace('Header Init');
    this.auth.isLoggedIn().subscribe( data => {
      this.isLoggedIn = data;
      if(data){
        this.logger.trace('Header Init subscribe');
        this.username = this.auth.getCurrentUsername();
      }
    });
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

}

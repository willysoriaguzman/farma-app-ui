import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router,
    private logger: NGXLogger) { }

  ngOnInit(): void {
    this.logger.trace('Home ngOninit');
    if(!this.auth.isSuccsesfulLogin){
      // this.router.navigate(['/']);
    }
  }

}

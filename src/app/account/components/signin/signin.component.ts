import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from "ngx-logger";
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private logger: NGXLogger, 
    private router: Router,
    private auth: AuthService) { 
    this.error = null;
  }

  ngOnInit(): void {
    this.auth.logout();
  }

  onSubmit() {
    this.logger.debug('INFO: submit()', this.form.get('username')?.value);
    if(this.auth.login(this.form.get('username')?.value, this.form.get('password')?.value)){
      this.router.navigate(['/dashboard']);
    }else{
      this.error = 'Credenciales incorrectas.'
    }
    
    // if (this.form.valid) {
    //   this.logger.debug('INFO: submit()', this.form.value);
    //   this.submitEM.emit(this.form.value);
    // }
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  constructor() { 
    this.error = null;
  }

  ngOnInit(): void {
  }
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

}

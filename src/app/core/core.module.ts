import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from '../common/components/header/header.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularMaterialModule,
  ],
  exports:[
    HeaderComponent
  ]
})
export class CoreModule { }

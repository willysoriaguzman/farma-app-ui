import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from '../common/components/header/header.component';
import { AngularMaterialModule } from '../angular-material.module';
import { HighlightPipe } from '../common/Pipes/highlight.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
  ]
})
export class CoreModule { }

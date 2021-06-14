import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }

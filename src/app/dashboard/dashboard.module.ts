import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonLocalModule } from '../common/common.module';
import { HighlightPipe } from '../common/Pipes/highlight.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    CommonLocalModule,
    DashboardRoutingModule,
    AngularMaterialModule
  ],
  exports:[ProductComponent]

})
export class DashboardModule { }

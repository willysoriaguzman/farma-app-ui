import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { HighlightPipe } from './Pipes/highlight.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { StockOnlyPipe } from './Pipes/stock-only.pipe';


@NgModule({
  declarations: [
    HighlightPipe,
    StockOnlyPipe,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    CommonRoutingModule
  ],
  exports:[
    HighlightPipe,
    StockOnlyPipe,
  ]
})
export class CommonLocalModule { }

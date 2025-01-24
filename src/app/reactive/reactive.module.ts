import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReactiveRoutingModule } from './reactive-routing.module';
import { BasicPagesComponent } from './pages/basic-page/basic-pages.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';
import { SelectorPageComponent } from './pages/countries-pages/pages/selector-page/selector-page.component';



@NgModule({
  declarations: [
    BasicPagesComponent,
    DynamicPageComponent,
    SwitchesPageComponent,
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveModule { }

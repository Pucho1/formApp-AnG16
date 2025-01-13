import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicPagesComponent } from './pages/basic-page/basic-pages.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'basics', component: BasicPagesComponent},
      {path: 'dynamic', component: DynamicPageComponent},
      {path: 'switches', component: SwitchesPageComponent},
      {path: '**', redirectTo: 'basic'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveRoutingModule { }

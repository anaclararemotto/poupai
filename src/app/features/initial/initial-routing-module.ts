import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Initial } from './initial/initial';

const routes: Routes = [
  { path: '', component: Initial }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialRoutingModule { }

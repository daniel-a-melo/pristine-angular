
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SomeComponent } from './some/some.component';

const someRoutes: Routes = [
  { path: 'some',  component: SomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(someRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SomeRoutingModule { }

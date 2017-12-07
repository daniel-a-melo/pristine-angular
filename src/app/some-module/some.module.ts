import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SomeRoutingModule } from './some-routing.module';
import { SharedModule } from 'app/shared/share.module';
import { SomeComponent } from './some/some.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SomeRoutingModule
  ],
  declarations : [
    SomeComponent
  ]
})
export class SomeModule { }

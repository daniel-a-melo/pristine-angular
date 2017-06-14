import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SomeRoutingModule } from './some-routing.module';
import { SharedModule } from 'app/shared/share.module';
import { SomeComponent } from './some/some.component';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    SharedModule,
    SomeRoutingModule
  ],
  declarations : [
    SomeComponent
  ]
})
export class SomeModule { }

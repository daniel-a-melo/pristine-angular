import { NgModule, ErrorHandler } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from 'app/app.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/share.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { SomeModule } from 'app/some-module/some.module';



const applicationModules = [
  CoreModule,
  SharedModule,
  SomeModule
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ...applicationModules,
    // As the app routing module contains the 'catch-all' route, it should be the last module loaded
    AppRoutingModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

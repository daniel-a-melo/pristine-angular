import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from 'app/shared/capitalize-pipe';


@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
  ],
  declarations: [
      CapitalizePipe
  ],
  exports : [
      CapitalizePipe
  ]
})
export class SharedModule { }

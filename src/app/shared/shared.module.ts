import { MyMaterialModule } from './mymaterial.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  exports: [
    MyMaterialModule
  ]
})
export class SharedModule { }

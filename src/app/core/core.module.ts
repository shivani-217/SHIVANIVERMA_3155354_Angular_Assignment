import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader } from '@ngx-translate/http-loader';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule
  ],
  exports:[
    HeaderComponent,
    SearchComponent,
    TranslateModule
  ]
})
export class CoreModule { }

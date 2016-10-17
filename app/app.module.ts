import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http'

import { AppComponent }   from './app.component';
import { PrimeComponent } from './prime.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    PrimeComponent
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

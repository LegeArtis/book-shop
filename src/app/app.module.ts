import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { BasketComponent } from './basket/basket.component';
import { SearchDirective } from './search.directive';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AddComponent,
    EditComponent,
    LoginComponent,
    MainComponent,
    BasketComponent,
    SearchDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

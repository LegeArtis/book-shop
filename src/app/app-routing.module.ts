import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {BasketComponent} from './basket/basket.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: MainComponent},
  { path: 'edit', component: EditComponent},
  { path: 'add', component: AddComponent},
  { path: 'basket', component: BasketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

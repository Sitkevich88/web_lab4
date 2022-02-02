import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainAuthComponent} from "./components/main-auth/main-auth.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MainAppComponent} from "./components/main-app/main-app.component";

const routes: Routes = [
  { path: 'login', component: MainAuthComponent},
  { path: 'app', component: MainAppComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

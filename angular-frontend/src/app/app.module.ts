import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainAuthComponent } from './components/main-auth/main-auth.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { AreaHitFormComponent } from './components/area-hit-form/area-hit-form.component';
import { AreaHitTableComponent } from './components/area-hit-table/area-hit-table.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainAuthComponent,
    RegistrationComponent,
    NotFoundComponent,
    MainAppComponent,
    AreaHitFormComponent,
    AreaHitTableComponent,
    LogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

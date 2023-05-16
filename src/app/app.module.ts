import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const EXTERNAL = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
];
const QUIZZ_APP = [DashboardComponent];

@NgModule({
  declarations: [AppComponent],
  imports: [EXTERNAL, QUIZZ_APP],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

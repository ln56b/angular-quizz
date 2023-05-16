import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizzListComponent } from './quizz-list/quizz-list.component';

const EXTERNAL = [BrowserModule, AppRoutingModule, HttpClientModule];
const QUIZZ_APP = [QuizzListComponent];

@NgModule({
  declarations: [AppComponent],
  imports: [EXTERNAL, QUIZZ_APP],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

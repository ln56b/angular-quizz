import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuizzFormComponent } from './components/quizz-form/quizz-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'quizz/edit/:id',
    component: QuizzFormComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

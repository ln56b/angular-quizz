import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuizzFormComponent } from './components/quizz-form/quizz-form.component';
import { QuizzCardComponent } from './components/quizz-card/quizz-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'quizz/:id',
    component: QuizzCardComponent,
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

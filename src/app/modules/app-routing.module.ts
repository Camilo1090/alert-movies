import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../components/app/app.component';
// import { HeroesComponent } from './heroes.component';
// import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: AppComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

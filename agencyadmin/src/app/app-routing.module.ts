import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioFormComponent } from './portfolio/portfolio-form/portfolio-form.component';
import { PortfolioFormResolver } from './portfolio/portfolio-form/PortfolioForm.resolver';
import { HomeComponent } from './home/home.component';
import { PortfolioViewComponent } from './portfolio/portfolio-view/portfolio-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio-view', component: PortfolioViewComponent },
  { path: 'portfolio-details/:id', component: PortfolioFormComponent, resolve: {portfolio : PortfolioFormResolver} },
  { path: 'portfolio-new', component: PortfolioFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

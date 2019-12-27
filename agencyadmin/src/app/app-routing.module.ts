import { PortfolioService } from './services/portfolio/portfolio-service.service';
import { PortfolioEditComponent } from './portfolio/portfolio-edit/portfolio-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioViewComponent } from './portfolio/portfolio-view/portfolio-view.component';
import { PortfolioResolver } from './portfolio/portfolio-edit/portfolio.resolver';
import { NewPortfolioComponent } from './portfolio/new-portfolio/new-portfolio.component';
import { PortfolioFormComponent } from './forms/portfolio-form/portfolio-form.component';
import { PortfolioFormResolver } from './forms/portfolio-form/PortfolioForm.resolver';

const routes: Routes = [
  { path: '', component: PortfolioViewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio-view', component: PortfolioViewComponent },
  { path: 'new-portfolio', component: NewPortfolioComponent },
  { path: 'portfolio-details/:id', component: PortfolioEditComponent, resolve: {portfolio : PortfolioResolver} },
  { path: 'portfolio-management', component: PortfolioFormComponent },  
  { path: 'portfolio-management/:id', component: PortfolioFormComponent, resolve: {portfolio : PortfolioFormResolver} }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

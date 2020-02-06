import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioFormComponent } from './app-components/agency/portfolio/portfolio-form/portfolio-form.component';
import { PortfolioFormResolver } from './app-components/agency/portfolio/portfolio-form/PortfolioForm.resolver';
import { HomeComponent } from './app-components/admin-layout/home/home.component';
import { PortfolioViewComponent } from './app-components/agency/portfolio/portfolio-view/portfolio-view.component';
import { ServiceViewComponent } from './app-components/agency/service/service-view/service-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio-view', component: PortfolioViewComponent },
  { path: 'service-view', component: ServiceViewComponent },
  { path: 'portfolio-details/:id', component: PortfolioFormComponent, resolve: {portfolio : PortfolioFormResolver} },
  { path: 'portfolio-new', component: PortfolioFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

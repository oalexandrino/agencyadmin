import { ServiceFormResolver } from './app-components/agency/service/service-form/ServiceForm.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioFormComponent } from './app-components/agency/portfolio/portfolio-form/portfolio-form.component';
import { PortfolioFormResolver } from './app-components/agency/portfolio/portfolio-form/PortfolioForm.resolver';
import { HomeComponent } from './app-components/admin-layout/home/home.component';
import { PortfolioViewComponent } from './app-components/agency/portfolio/portfolio-view/portfolio-view.component';
import { ServiceViewComponent } from './app-components/agency/service/service-view/service-view.component';
import { ServiceFormComponent } from './app-components/agency/service/service-form/service-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio-view', component: PortfolioViewComponent },
  { path: 'portfolio-view/:id', component: PortfolioFormComponent, resolve: {portfolio : PortfolioFormResolver} },
  { path: 'portfolio-new', component: PortfolioFormComponent },
  { path: 'service-new', component: ServiceFormComponent },
  { path: 'service-view', component: ServiceViewComponent },
  { path: 'service-view/:id', component: ServiceFormComponent, resolve: { service: ServiceFormResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

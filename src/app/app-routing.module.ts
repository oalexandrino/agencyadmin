import { AboutFormComponent } from './app-components/agency/about/about-form/about-form.component';
import { ServiceFormResolver } from './app-components/agency/service/service-form/ServiceForm.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioFormComponent } from './app-components/agency/portfolio/portfolio-form/portfolio-form.component';
import { PortfolioFormResolver } from './app-components/agency/portfolio/portfolio-form/PortfolioForm.resolver';
import { HomeComponent } from './app-components/admin-layout/home/home.component';
import { PortfolioViewComponent } from './app-components/agency/portfolio/portfolio-view/portfolio-view.component';
import { ServiceViewComponent } from './app-components/agency/service/service-view/service-view.component';
import { ServiceFormComponent } from './app-components/agency/service/service-form/service-form.component';
import { AboutViewComponent } from './app-components/agency/about/about-view/about-view.component';
import { AboutFormResolver } from './app-components/agency/about/about-form/AboutForm.resolver';
import { TeamViewComponent } from './app-components/agency/team/team-view/team-view.component';
import { TeamFormComponent } from './app-components/agency/team/team-form/team-form.component';
import { TeamFormResolver } from './app-components/agency/team/team-form/TeamForm.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio-new', component: PortfolioFormComponent },
  { path: 'portfolio-view', component: PortfolioViewComponent },
  { path: 'portfolio-view/:id', component: PortfolioFormComponent, resolve: {portfolio : PortfolioFormResolver} },
  { path: 'team-members-new', component: TeamFormComponent },
  { path: 'team-members-view', component: TeamViewComponent },
  { path: 'team-members-view/:email', component: TeamFormComponent, resolve: { teamMember: TeamFormResolver } },
  { path: 'about-new', component: AboutFormComponent },
  { path: 'about-view', component: AboutViewComponent },
  { path: 'about-view/:id', component: AboutFormComponent, resolve: { about: AboutFormResolver } },
  { path: 'service-new', component: ServiceFormComponent },
  { path: 'service-view', component: ServiceViewComponent },
  { path: 'service-view/:id', component: ServiceFormComponent, resolve: { service: ServiceFormResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

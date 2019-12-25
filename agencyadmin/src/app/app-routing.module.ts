import { PortfolioService } from './services/portfolio/portfolio-service.service';
import { PortfolioEditComponent } from './portfolio/portfolio-edit/portfolio-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioViewComponent } from './portfolio/portfolio-view/portfolio-view.component';
import { PortfolioResolver } from './portfolio/portfolio-edit/portfolio.resolver';

const routes: Routes = [
  { path: '', component: PortfolioViewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio-view', component: PortfolioViewComponent },
  { path: 'portfolio-details/:id', component: PortfolioEditComponent, resolve: {data : PortfolioResolver} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

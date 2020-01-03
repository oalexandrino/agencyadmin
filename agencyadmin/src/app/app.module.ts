// import main itens
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxNavbarModule  } from 'ngx-bootstrap-navbar';


// import GUI Angular material modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';

// import application`s modules
import { NewPortfolioComponent } from './portfolio/new-portfolio/new-portfolio.component';
import { PortfolioViewComponent } from './portfolio/portfolio-view/portfolio-view.component';
import { PortfolioEditComponent } from './portfolio/portfolio-edit/portfolio-edit.component';
import { NewServiceComponent } from './service/new-service/new-service.component';
import { ServiceViewComponent } from './service/service-view/service-view.component';
import { ServiceEditComponent } from './service/service-edit/service-edit.component';
import { TeamEditComponent } from './team/team-edit/team-edit.component';
import { TeamViewComponent } from './team/team-view/team-view.component';
import { TeamNewComponent } from './team/team-new/team-new.component';
import { AboutNewComponent } from './about/about-new/about-new.component';
import { AboutEditComponent } from './about/about-edit/about-edit.component';
import { AboutViewComponent } from './about/about-view/about-view.component';
import { SettingsEditComponent } from './settings/settings-edit/settings-edit.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// Import firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { PortfolioService } from './services/portfolio/portfolio-service.service';
import { TeamServiceService } from './services/team/team-service.service';
import { OurServicesService } from './services/ourservices/ourservices-service.service';
import { SettingsService } from './services/settings/settings-service.service';
import { AboutService } from './services/about/about-service.service';

import { PortfolioFormComponent } from './forms/portfolio-form/portfolio-form.component';
import { CardAgencywebsiteItemsComponent } from './card-agencywebsite-items/card-agencywebsite-items.component';
import { DeleteMsgComponent } from './modals/delete-msg/delete-msg.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    NewPortfolioComponent,
    PortfolioViewComponent,
    PortfolioEditComponent,
    NewServiceComponent,
    ServiceViewComponent,
    ServiceEditComponent,
    TeamEditComponent,
    TeamViewComponent,
    TeamNewComponent,
    AboutNewComponent,
    AboutEditComponent,
    AboutViewComponent,
    SettingsEditComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    PortfolioFormComponent,
    CardAgencywebsiteItemsComponent,
    DeleteMsgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFirestoreModule.enablePersistence(),
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    NgxNavbarModule,
    ModalModule.forRoot(),
    MatGridListModule,
      ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ DeleteMsgComponent ],
  providers: [PortfolioService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

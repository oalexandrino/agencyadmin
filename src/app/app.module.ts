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
import {MatExpansionModule} from '@angular/material/expansion';
import {
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule } from '@angular/material';

// import application`s modules
import { NewPortfolioComponent } from './app-components/agency/portfolio/new-portfolio/new-portfolio.component';
import { PortfolioViewComponent } from './app-components/agency/portfolio/portfolio-view/portfolio-view.component';
import { PortfolioFormComponent } from './app-components/agency/portfolio/portfolio-form/portfolio-form.component';
import { NewServiceComponent } from './app-components/agency/service/new-service/new-service.component';
import { ServiceViewComponent } from './app-components/agency/service/service-view/service-view.component';
import { ServiceEditComponent } from './app-components/agency/service/service-edit/service-edit.component';
import { TeamEditComponent } from './app-components/agency/team/team-edit/team-edit.component';
import { TeamViewComponent } from './app-components/agency/team/team-view/team-view.component';
import { TeamNewComponent } from './app-components/agency/team/team-new/team-new.component';
import { AboutNewComponent } from './app-components/agency/about/about-new/about-new.component';
import { AboutEditComponent } from './app-components/agency/about/about-edit/about-edit.component';
import { AboutViewComponent } from './app-components/agency/about/about-view/about-view.component';
import { SettingsEditComponent } from './app-components/agency/settings/settings-edit/settings-edit.component';
import { HomeComponent } from './app-components/admin-layout/home/home.component';
import { NavbarComponent } from './app-components/admin-layout/navbar/navbar.component';
import { SidebarComponent } from './app-components/admin-layout/sidebar/sidebar.component';
import { DeleteMsgComponent } from './app-components/admin-layout/modals/delete-msg/delete-msg.component';
import { CardAgencywebsiteItemsComponent } from './app-components/admin-layout/card-agencywebsite-items/card-agencywebsite-items.component';

// Import firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { PortfolioService } from './app-services/db/firebase/portfolio/portfolio-service.service';


import { ModalModule } from 'ngx-bootstrap/modal';
import { FirebaseAgencyWebSiteService } from './app-services/db/firebase/FirebaseAgencyWebSiteService.service';

@NgModule({
  declarations: [
    AppComponent,
    NewPortfolioComponent,
    PortfolioViewComponent,
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
    MatListModule,
    MatSlideToggleModule,
    MatTabsModule,
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
      ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ DeleteMsgComponent ],
  providers: [PortfolioService, FirebaseAgencyWebSiteService, MatDatepickerModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

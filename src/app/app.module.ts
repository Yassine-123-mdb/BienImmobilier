import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeroComponent } from './pages/home/hero/hero.component';
import { AnnoncesComponent } from './pages/home/annonces/annonces.component';
import { HomeComponent } from './pages/home/home/home.component';
import { SearchBarComponent } from './pages/home/search-bar/search-bar.component';
import { WhyChooseUsComponent } from './pages/home/why-choose-us/why-choose-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/connexion/login/login.component';
import { RegisterComponent } from './pages/connexion/register/register.component';
import { DetailsComponent } from './pages/BienImmobilier/details/details.component';
import { FavorisComponent } from './pages/favoris/favoris/favoris.component';
import { ReservationComponent } from './pages/BienImmobilier/reservation/reservation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/profile/sidebar/sidebar.component';
import { InfoPersonnelComponent } from './pages/profile/info-personnel/info-personnel.component';
import { MessangesComponent } from './pages/profile/messanges/messanges.component';
import { ListeReservationComponent } from './pages/profile/reservation/reservation.component';
import { ProprietaireDashComponent } from './pages/proprietaire/proprietaire-dash/proprietaire-dash.component';
import { AddAnnonceComponent } from './pages/BienImmobilier/add-annonce/add-annonce.component';
import { ListeAnnoncesComponent } from './pages/proprietaire/liste-annonces/liste-annonces.component';
import { StatistiquesComponent } from './pages/proprietaire/statistiques/statistiques.component';
import { Sidebar2Component } from './pages/proprietaire/sidebar2/sidebar2.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    AnnoncesComponent,
    HomeComponent,
    SearchBarComponent,
    WhyChooseUsComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DetailsComponent,
    FavorisComponent,
    ReservationComponent,
    ProfileComponent,
    SidebarComponent,
    InfoPersonnelComponent,
    MessangesComponent,
    ListeReservationComponent,
    ProprietaireDashComponent,
    AddAnnonceComponent,
    ListeAnnoncesComponent,
    StatistiquesComponent,
    Sidebar2Component
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule, // Ajoutez ce module
    ToastrModule.forRoot(),
    MatCardModule,
    FontAwesomeModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

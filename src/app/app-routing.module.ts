import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/connexion/login/login.component';
import { RegisterComponent } from './pages/connexion/register/register.component';
import { DetailsComponent } from './pages/BienImmobilier/details/details.component';
import { FavorisComponent } from './pages/favoris/favoris/favoris.component';
import { ReservationComponent } from './pages/BienImmobilier/reservation/reservation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InfoPersonnelComponent } from './pages/profile/info-personnel/info-personnel.component';
import { MessangesComponent } from './pages/profile/messanges/messanges.component';
import { ListeReservationComponent } from './pages/profile/reservation/reservation.component';
import { AddAnnonceComponent } from './pages/BienImmobilier/add-annonce/add-annonce.component';
import { ListeAnnoncesComponent } from './pages/proprietaire/liste-annonces/liste-annonces.component';
import { ProprietaireDashComponent } from './pages/proprietaire/proprietaire-dash/proprietaire-dash.component';
import { StatistiquesComponent } from './pages/proprietaire/statistiques/statistiques.component';


const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'details-bien/:id', component: DetailsComponent }, // 🔥 Ajout de l'ID pour afficher un bien spécifique
  { path: 'favoris', component: FavorisComponent },

  { path: 'add-bien', component:AddAnnonceComponent },
  { path: 'list-bien', component:ListeAnnoncesComponent },

  {
    path: 'proprietaire',
    component: ProprietaireDashComponent,
    children: [
      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'annonces', component: ListeAnnoncesComponent },
      /*{ path: 'reservations', component: ReservationsComponent },
      { path: 'profil', component: ProfilComponent },*/
      { path: '', redirectTo: 'statistiques', pathMatch: 'full' },
    ],
  },

  // 🌟 Sous-routes pour le profil
  { 
    path: 'profile', component: ProfileComponent, 
    children: [
      { path: 'info', component: InfoPersonnelComponent },
      {path:'message' , component: MessangesComponent},
      {path:'reservations' , component: ListeReservationComponent}
      // 🔥 Redirection vers info par défaut
    ] 
  },

  { path: '', redirectTo: 'accueil', pathMatch: 'full' }, // 🔥 Correction de l'orthographe de "acceuil" → "accueil"
  { path: '**', redirectTo: 'accueil' } // 🔥 Gère les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

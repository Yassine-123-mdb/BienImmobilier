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
import { AddAnnonceComponent } from './pages/proprietaire/add-annonce/add-annonce.component';
import { ListeAnnoncesComponent } from './pages/proprietaire/liste-annonces/liste-annonces.component';
import { ProprietaireDashComponent } from './pages/proprietaire/proprietaire-dash/proprietaire-dash.component';
import { StatistiquesComponent } from './pages/proprietaire/statistiques/statistiques.component';
import { AbonnementComponent } from './pages/proprietaire/abonnement/abonnement.component';
import { ReservationsComponent } from './pages/proprietaire/reservations/reservations.component';
import { ProfileProprietaireComponent } from './pages/proprietaire/profile-proprietaire/profile-proprietaire.component';
import { PaiementComponent } from './pages/proprietaire/paiement/paiement.component';
import { DashAdminComponent } from './pages/Admin/dash-admin/dash-admin.component';
import { StatistiquesAdminComponent } from './pages/Admin/statistiques-admin/statistiques-admin.component';
import { UtilisateursAdminComponent } from './pages/Admin/utilisateurs-admin/utilisateurs-admin.component';
import { PaiementsAdminComponent } from './pages/Admin/paiements-admin/paiements-admin.component';
import { GestionAnnoncesComponent } from './pages/Admin/gestion-annonces/gestion-annonces.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';


const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'details-bien/:id', component: DetailsComponent }, // 🔥 Ajout de l'ID pour afficher un bien spécifique
  { path: 'favoris', component: FavorisComponent },

  
  { path: 'list-bien', component:ListeAnnoncesComponent },

  {
    path: 'proprietaire',
    component: ProprietaireDashComponent,
    children: [
      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'annonces', component: ListeAnnoncesComponent },
      { path: 'abonnement', component: AbonnementComponent },
      { path: 'add-bien', component:AddAnnonceComponent },
      

      { path: 'paiement', component: PaiementComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'profile', component: ProfileProprietaireComponent },
      {path:'message' , component: MessangesComponent},
      { path: '', redirectTo: 'statistiques', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: DashAdminComponent,
    children: [
      { path: 'statistiques-admin', component: StatistiquesAdminComponent },
      {path : 'utilisateurs', component:UtilisateursAdminComponent},
      {path : 'paiements-admin', component:PaiementsAdminComponent},
      {path : 'gestion-annonces', component:GestionAnnoncesComponent},
      { path: '', redirectTo: 'statistiques-admin', pathMatch: 'full' },
      // �� Redirection vers info par défaut
    ]  },

  // 🌟 Sous-routes pour le profil
  { 
    path: 'profile', component: ProfileComponent, 
    children: [
      { path: 'info', component: InfoPersonnelComponent },
      {path:'message' , component: MessangesComponent},
      {path:'reservations' , component: ListeReservationComponent},
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      // 🔥 Redirection vers info par défaut
    ] 
  },

  { path: '', redirectTo: 'accueil', pathMatch: 'full' }, // 🔥 Correction de l'orthographe de "acceuil" → "accueil"
  { path: '**', redirectTo: 'accueil' } // 🔥 Gère les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

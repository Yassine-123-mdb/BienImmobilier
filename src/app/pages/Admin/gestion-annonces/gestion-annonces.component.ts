import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annonce } from '../../../models/Annonce';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.component.html',
  styleUrls: ['./gestion-annonces.component.css']
})
export class GestionAnnoncesComponent implements OnInit {
  public annonces: Annonce[] = []; // Liste des annonces
  public annoncesFiltrees: Annonce[] = []; // Liste des annonces filtrées
  public filtreStatut: string = 'Tous';
  public filtreCategorie: string = 'Tous';
  public filtreTitre: string = '';

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.chargerAnnonces();
  }

  // Charger les annonces depuis une API ou un service
  chargerAnnonces(): void {
    // Exemple de données statiques (remplacer par un appel API)
    this.annonces = [
      {
        id: 1,
        titre: 'Belle maison à vendre',
        description: 'Maison spacieuse avec jardin',
        region: 'Île-de-France',
        ville: 'Paris',
        adresse: '123 Rue de Paris',
        prix: 500000,
        category: 'maison',
        disponible: 'Disponible',
        operation: 'Vente',
        dateAjout: new Date(),
        images: ['assets/appart4.jpg'],
        localisation: 'Paris, France',
        surface: 150,
        mapUrl: 'https://maps.google.com',
        nombresChambres: 4,
        nombresPieces: 6,
        nombresSallesDeBain: 2,
        climatiseur: true,
        jardin: true,
        garage: true,
        chauffage: true,
        balcon: false,
        vueSurMer: false,
        statutAdmin: 'En attente',
        proprietaire: {
          nom: 'Jean Dupont',
          photo: 'https://via.placeholder.com/50',
          telephone: '0123456789',
          email: 'jean.dupont@example.com'
        }
      },{
      id: 1,
      titre: 'Belle maison à vendre',
      description: 'Maison spacieuse avec jardin',
      region: 'Île-de-France',
      ville: 'Paris',
      adresse: '123 Rue de Paris',
      prix: 500000,
      category: 'maison',
      disponible: 'Disponible',
      operation: 'Vente',
      dateAjout: new Date(),
      images: ['assets/appart4.jpg'],
      localisation: 'Paris, France',
      surface: 150,
      mapUrl: 'https://maps.google.com',
      nombresChambres: 4,
      nombresPieces: 6,
      nombresSallesDeBain: 2,
      climatiseur: true,
      jardin: true,
      garage: true,
      chauffage: true,
      balcon: false,
      vueSurMer: false,
      statutAdmin: 'En attente',
      proprietaire: {
        nom: 'Jean Dupont',
        photo: 'https://via.placeholder.com/50',
        telephone: '0123456789',
        email: 'jean.dupont@example.com'
      }
    },
      
      // Ajouter d'autres annonces ici...
    ];
    this.annoncesFiltrees = this.annonces;
  }

  // Appliquer les filtres
  appliquerFiltre(): void {
    this.annoncesFiltrees = this.annonces.filter(annonce => {
      const correspondStatut = this.filtreStatut === 'Tous' || annonce.statutAdmin === this.filtreStatut;
      const correspondCategorie = this.filtreCategorie === 'Tous' || annonce.category === this.filtreCategorie;
      const correspondTitre = annonce.titre.toLowerCase().includes(this.filtreTitre.toLowerCase());
      return correspondStatut && correspondCategorie && correspondTitre;
    });
  }

  // Obtenir la couleur du badge en fonction du statut
  getBadgeColor(statut: string): string {
    switch (statut) {
      case 'Approuvé':
        return 'success';
      case 'Refusé':
        return 'danger';
      case 'En attente':
        return 'warning';
      default:
        return 'secondary';
    }
  }

  // Voir les détails de l'annonce
  voirDetails(annonceId: number): void {
    this.router.navigate(['details-annonce', annonceId]);
  }

  // Modifier le statut de l'annonce
  modifierStatut(annonceId: number, nouveauStatut: string): void {
    const annonce = this.annonces.find(a => a.id === annonceId);
    if (annonce) {
      annonce.statutAdmin = nouveauStatut;
      this.toastr.success(`Statut modifié à "${nouveauStatut}"`, 'Succès');
      this.appliquerFiltre(); // Re-filtrer après modification
    }
  }

  // Modifier l'annonce
  modifierAnnonce(annonceId: number): void {
    this.router.navigate(['modifier-annonce', annonceId]);
  }
}
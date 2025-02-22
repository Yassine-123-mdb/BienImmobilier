import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css'],
})
export class ListeAnnoncesComponent implements OnInit {
  // Données simulées des annonces
  annonces = [
    {
      id: '1',
      titre: 'Appartement moderne',
      description: 'Un appartement spacieux et lumineux en plein centre-ville.',
      ville: 'Tunis',
      adresse: 'Avenue Habib Bourguiba',
      prix: 250000,
      type: 'Appartement',
      dateAjout: new Date(),
      disponible: true,
      transaction: 'vendre', // Ajout du type de transaction
      surface: 120, // Surface en m²
      chambres: 3, // Nombre de chambres
      etages: 2, // Nombre d'étages
      images: ['assets/appart4.jpg'],
    },
    {
      id: '2',
      titre: 'Villa de luxe',
      description: 'Une villa moderne avec piscine et jardin.',
      ville: 'Hammamet',
      adresse: 'Rue des Palmiers',
      prix: 500000,
      type: 'Villa',
      dateAjout: new Date(),
      disponible: false,
      transaction: 'louer', // Ajout du type de transaction
      surface: 300, // Surface en m²
      chambres: 5, // Nombre de chambres
      etages: 1, // Nombre d'étages
      images: ['assets/appart3.jpg'],
    },
  ];

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Vous pouvez charger les annonces depuis une API ici
    this.loadAnnonces();
  }

  // Simuler le chargement des annonces
  loadAnnonces(): void {
    // Ici, vous pouvez appeler une API pour récupérer les annonces
    console.log('Annonces chargées avec succès');
  }

  // Modifier une annonce
  modifierAnnonce(id: string): void {
    this.router.navigate(['/modifier-annonce', id]);
    this.toastr.info('Redirection vers la modification de l\'annonce', 'Information');
  }

  // Supprimer une annonce avec confirmation
  supprimerAnnonce(id: string): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');
    if (confirmation) {
      this.annonces = this.annonces.filter((annonce) => annonce.id !== id);
      this.toastr.success('Annonce supprimée avec succès', 'Succès');
    } else {
      this.toastr.warning('Suppression annulée', 'Annulation');
    }
  }

  // Voir les détails d'une annonce
  voirDetails(id: string): void {
    this.router.navigate(['/details-annonce', id]);
    this.toastr.info('Redirection vers les détails de l\'annonce', 'Information');
  }

  // Publier une nouvelle annonce
  publierAnnonce(): void {
    this.router.navigate(['/publier-annonce']);
    this.toastr.info('Redirection vers la publication d\'une annonce', 'Information');
  }
  /*loadAnnonces(): void {
    this.annonceService.getAnnonces().subscribe(
      (data) => {
        this.annonces = data;
        this.toastr.success('Annonces chargées avec succès', 'Succès');
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des annonces', 'Erreur');
      }
    );
  }*/
}

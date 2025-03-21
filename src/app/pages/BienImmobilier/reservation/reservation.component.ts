import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  // Objet pour stocker les données de réservation
  reservation = {
    dateDebut: '',
    dateFin: '',
  };

  // Détails du bien
  bien = {
    id: '1',
    titre: 'Appartement moderne',
    description: 'Un appartement spacieux et lumineux en plein centre-ville.',
    prix: 1000,
    localisation: 'Tunis, Avenue Habib Bourguiba',
  };

  // Variables pour le calcul du prix total
  duree: number = 0;
  prixTotal: number = 0;

  // Variables de validation
  dateDebutInvalide: boolean = false;
  dateFinInvalide: boolean = false;
  formValide: boolean = false;

  // Date d'aujourd'hui pour la validation
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du bien depuis l'URL
    const bienId = this.route.snapshot.paramMap.get('id');
    if (bienId) {
      // Charger les détails du bien (simulation)
      this.bien.id = bienId;
    }
  }

  // Calculer la durée et le prix total
  calculerPrixTotal(): void {
    if (this.reservation.dateDebut && this.reservation.dateFin) {
      const dateDebut = new Date(this.reservation.dateDebut);
      const dateFin = new Date(this.reservation.dateFin);

      // Validation des dates
      this.dateDebutInvalide = dateDebut < new Date(this.today);
      this.dateFinInvalide = dateFin <= dateDebut;

      if (!this.dateDebutInvalide && !this.dateFinInvalide) {
        const diffTime = dateFin.getTime() - dateDebut.getTime();
        this.duree = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.prixTotal = this.duree * this.bien.prix;
        this.formValide = true;
      } else {
        this.formValide = false;
      }
    } else {
      this.formValide = false;
    }
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.formValide) {
      console.log('Réservation :', this.reservation);
      this.toastr.success('Réservation confirmée avec succès !', 'Succès');
      this.router.navigate(['/details-bien', this.bien.id]);
    } else {
      this.toastr.error('Veuillez vérifier les dates saisies.', 'Erreur');
    }
  }
}
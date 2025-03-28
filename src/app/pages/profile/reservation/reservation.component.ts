import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from '../../../models/Reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ListeReservationComponent implements OnInit {
  public reservations: Reservation[] = [];

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.chargerReservations();
  }

  /** Charge les réservations depuis le localStorage ou initialise des données de test */
  chargerReservations(): void {
    const reservationsData = localStorage.getItem('reservations');
   /*  if (reservationsData) {
      this.reservations = JSON.parse(reservationsData);
    } else {
      this.reservations = [
        {
          id: 1,
          titre: 'Réservation Maison',
          dateDebut: new Date('2025-02-20'),
          dateFin: new Date('2025-02-22'),
          statut: 'Confirme',
          adress: 'Tunis, Centre-ville',
id        },
        {
          id: 2,
          titre: 'Réservation Appartement',
          dateDebut: new Date('2025-02-25'),
          dateFin: new Date('2025-02-28'),
          statut: 'En attente',
          localisation: 'Sidi Bou Said, Tunis',
          locataire: {} as any,
          bienImmobilier: {} as any,
        },
        {
          id: 3,
          titre: 'Réservation Villa',
          dateDebut: new Date('2025-03-01'),
          dateFin: new Date('2025-03-05'),
          statut: 'Annule',
          localisation: 'La Marsa, Tunis',
          locataire: {} as any, 
        }
      ];
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    } */
  }

  /** Redirige vers les détails d'un bien immobilier */
  voirDetails(bienId: number): void {
    this.router.navigate(['details-bien', bienId]);
  }

  /** Annule une réservation et met à jour le localStorage */
  annuler(reservationId: number): void {
    this.reservations = this.reservations.filter((reservation) => reservation.id !== reservationId);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    this.toastr.success('Réservation annulée avec succès', 'Succès');
  }
}

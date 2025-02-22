import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from '../../../models/Reservation'; // Vous devrez créer ce modèle

@Component({
  selector: 'app-reservations',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ListeReservationComponent implements OnInit {
  public reservations: Reservation[] = [
    new Reservation('1', 'Réservation Maison', '2025-02-20', '2025-02-22', 'Confirmée', 'Tunis, La Marsa', 'bien1'),
    new Reservation('2', 'Réservation Appartement', '2025-02-25', '2025-02-28', 'En attente', 'Tunis, Sidi Bou Said', 'bien2'),
    new Reservation('3', 'Réservation Villa', '2025-03-01', '2025-03-05', 'Rejetée', 'Tunis, Carthage', 'bien3')
  ]; // Liste des réservations

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.chargerReservations();
  }

  chargerReservations(): void {
    const reservationsData = localStorage.getItem('reservations');
    if (reservationsData) {
      this.reservations = JSON.parse(reservationsData);
    }
  }

  // Voir les détails de la réservation
  voirDetails(bienId: string): void {
    this.router.navigate(['details-bien', bienId]);
  }

  // Annuler une réservation
  annuler(reservationId: string): void {
    this.reservations = this.reservations.filter(
      (reservation) => reservation.id !== reservationId
    );
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    this.toastr.success('Réservation annulée', 'Succès');
  }
}

import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { AuthService } from '../../../services/auth.service';
import { Reservation } from '../../../models/Reservation';
declare var window: any;

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  reservationsFiltrees: Reservation[] = [];

  filtres = [
    { label: 'Toutes', value: 'toutes' },
    { label: 'En attente', value: 'EN_ATTENTE' },
    { label: 'Confirmées', value: 'CONFIRMEE' },
    { label: 'Refusées', value: 'REFUSEE' },
    { label: 'Annulées', value: 'ANNULEE' },
    { label: 'Terminées', value: 'TERMINEE' },
  ];

  filtreActif: string = 'toutes';
  selectedReservationId: number | null = null;
  commentaireRefus: string = '';

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.reservationService.getReservationsByProprietaire().subscribe((res) => {
      console.log(res);
      this.reservations = res;
      
      this.filtrerReservations();
    });
  }

  changerFiltre(filtre: string): void {
    this.filtreActif = filtre;
    this.filtrerReservations();
  }

  filtrerReservations(): void {
    this.reservationsFiltrees =
      this.filtreActif === 'toutes'
        ? this.reservations
        : this.reservations.filter((r) => r.statut === this.filtreActif);
  }

  accepterReservation(id: number): void {
    this.reservationService.accepter(id).subscribe(() => {
      alert('Réservation acceptée.');
      this.fetchReservations();
    });
  }

  // Ouvrir le modal de refus
  ouvrirRefusModal(reservation: any): void {
    this.selectedReservationId = reservation.id;
    this.commentaireRefus = '';
    const modal = new window.bootstrap.Modal(document.getElementById('refusModal'));
    modal.show();
  }

  // Confirmer refus
  confirmerRefus(): void {
    if (this.selectedReservationId) {
      this.reservationService.refuser(this.selectedReservationId, this.commentaireRefus).subscribe(() => {
        alert('Réservation refusée.');
        this.fetchReservations();
        this.selectedReservationId = null;
        this.fermerModal();
      });
    }
  }

  // Fermer le modal
  fermerModal(): void {
    const modal = document.getElementById('modalRefus') as HTMLDialogElement;
    modal?.close(); // Ferme le modal
  }

  voirDetails(reservation: Reservation): void {
    alert(`Détails : `);
  }
}

import { Component, OnInit } from '@angular/core';

interface Reservation {
  id: number;
  bien: { titre: string };
  client: { nom: string };
  dateDebut: Date;
  dateFin: Date;
  prix: number;
  statut: 'en_attente' | 'termine' | 'annule';
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [
    {
      id: 1,
      bien: { titre: 'Appartement moderne' },
      client: { nom: 'Ahmed Ben Ali' },
      dateDebut: new Date('2023-10-01'),
      dateFin: new Date('2023-10-10'),
      prix: 1200,
      statut: 'en_attente',
    },
    {
      id: 2,
      bien: { titre: 'Villa de luxe' },
      client: { nom: 'Fatma Bouazizi' },
      dateDebut: new Date('2023-09-15'),
      dateFin: new Date('2023-09-20'),
      prix: 2500,
      statut: 'termine',
    },
    {
      id: 3,
      bien: { titre: 'Studio cosy' },
      client: { nom: 'Mohamed Trabelsi' },
      dateDebut: new Date('2023-08-01'),
      dateFin: new Date('2023-08-05'),
      prix: 800,
      statut: 'termine',
    },
  ];

  filtres = [
    { label: 'Toutes', value: 'toutes' },
    { label: 'En attente', value: 'en_attente' },
    
    { label: 'Terminées', value: 'termine' },
    { label: 'Annulées', value: 'annule' },
  ];

  filtreActif: string = 'toutes';
  reservationsFiltrees: Reservation[] = [];

  ngOnInit(): void {
    this.filtrerReservations();
  }

  changerFiltre(filtre: string): void {
    this.filtreActif = filtre;
    this.filtrerReservations();
  }

  filtrerReservations(): void {
    if (this.filtreActif === 'toutes') {
      this.reservationsFiltrees = this.reservations;
    } else {
      this.reservationsFiltrees = this.reservations.filter(
        (r) => r.statut === this.filtreActif
      );
    }
  }

  accepterReservation(id: number): void {
    const reservation = this.reservations.find((r) => r.id === id);
    if (reservation) {
      reservation.statut = 'termine';
      alert('Réservation acceptée avec succès !');
    }
  }

  refuserReservation(id: number): void {
    const reservation = this.reservations.find((r) => r.id === id);
    if (reservation) {
      reservation.statut = 'annule';
      alert('Réservation refusée avec succès !');
    }
  }

  voirDetails(reservation: Reservation): void {
    alert(`Détails de la réservation : ${reservation.bien.titre}`);
  }
}
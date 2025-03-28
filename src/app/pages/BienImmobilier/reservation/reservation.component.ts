import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BienImmobilier } from '../../../models/BienImmobilier';
import { AnnonceService } from '../../../services/AnnonceService.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  bien= new BienImmobilier ();
  isLoading: boolean = true;
  reservationDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private annonceService: AnnonceService
  ) {}

  ngOnInit(): void {
    const bienId = this.route.snapshot.paramMap.get('id');
    if (bienId) {
      this.loadBien(parseInt(bienId));
    }
  }

  loadBien(id: number): void {
    this.annonceService.getAnnonceById(id).subscribe({
      next: (data) => {
        this.bien = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du bien:', err);
        this.isLoading = false;
      }
    });
  }

  reserver(): void {
    if (!this.reservationDate) {
      alert('Veuillez choisir une date de réservation.');
      return;
    }

    console.log('Réservation confirmée pour:', this.bien?.titre, 'à la date:', this.reservationDate);
    alert(`Votre réservation pour ${this.bien?.titre} a été confirmée pour le ${this.reservationDate}`);
    this.router.navigate(['/']);
  }
}

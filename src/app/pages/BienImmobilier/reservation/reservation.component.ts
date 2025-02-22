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

  // ID du bien à réserver (récupéré depuis l'URL)
  bienId?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du bien depuis l'URL
    this.bienId = this.route.snapshot.paramMap.get('id')!;
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.reservation.dateDebut && this.reservation.dateFin) {
      // Vérifier que la date de fin est après la date de début
      if (new Date(this.reservation.dateFin) < new Date(this.reservation.dateDebut)) {
       alert('Verifier la date')
      }
      console.log('Réservation :', this.reservation);

      // Rediriger vers la page d'accueil ou de détails
      this.router.navigate(['/details-bien', this.bienId]);

      // Envoyer les données de réservation (simulation)
     
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Abonnement } from '../../../models/abonnements';
import { Router } from '@angular/router';


@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css'],
})
export class AbonnementComponent implements OnInit {
  constructor(private router : Router ) {
    
  }
  abonnementActuel: Abonnement | null = null; // Simuler un abonnement actuel
  abonnementsDisponibles: Abonnement[] = [
    { id: 1, type: 'Gratuit', nbrAnnonceAutorisees: 2, dateExpiration: new Date(), prix: 0 },
    { id: 2, type: 'Standard', nbrAnnonceAutorisees: 10, dateExpiration: new Date(), prix: 50 },
    { id: 3, type: 'Premium', nbrAnnonceAutorisees: -1, dateExpiration: new Date(), prix: 100 }, // -1 = illimité
  ];

  ngOnInit(): void {
    // Simuler la récupération de l'abonnement actuel
    this.abonnementActuel = {
      id: 1,
      type: 'Standard',
      nbrAnnonceAutorisees: 10,
      dateExpiration: new Date('2025-12-31'),
      prix: 50,
    };
  }

  // Choisir un nouvel abonnement
  choisirAbonnement(abonnement: Abonnement): void {
    if (abonnement.type === this.abonnementActuel?.type) return; // Ne rien faire si l'abonnement est déjà actif
    console.log('Abonnement choisi :', abonnement);
    // Ici, vous pouvez rediriger vers une page de paiement ou mettre à jour l'abonnement
    alert(`Vous avez choisi l'abonnement ${abonnement.type}`);
    this.router.navigate(['/proprietaire/paiement']);
  }

  // Obtenir l'icône correspondant au type d'abonnement
  getIconForAbonnement(type: string): string {
    switch (type) {
      case 'Gratuit':
        return 'bi-gift';
      case 'Standard':
        return 'bi-star';
      case 'Premium':
        return 'bi-award';
      default:
        return 'bi-credit-card';
    }
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],
})
export class PaiementComponent {
  // Mode de paiement sélectionné
  modePaiement: 'carte' | 'virement' = 'carte';

  // Objet pour stocker les informations de paiement
  paiement = {
    numeroCarte: '',
    dateExpiration: '',
    cvv: '',
  };

  // Choisir un mode de paiement
  choisirModePaiement(mode: 'carte' | 'virement'): void {
    this.modePaiement = mode;
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.modePaiement === 'carte') {
      console.log('Paiement par carte :', this.paiement);
      alert('Paiement par carte effectué avec succès !');
    } else {
      console.log('Paiement par virement');
      alert('Instructions pour le virement envoyées.');
    }
  }
}
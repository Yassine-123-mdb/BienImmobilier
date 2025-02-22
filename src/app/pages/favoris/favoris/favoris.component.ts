import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bien } from '../../../models/Bien';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css'],
})
export class FavorisComponent implements OnInit {
  public favoris: Bien[] = []; // Appliquer le type Bien[] au tableau favoris

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.chargerFavoris();
  }

  chargerFavoris(): void {
    const favorisData = localStorage.getItem('favoris');
    if (favorisData) {
      this.favoris = JSON.parse(favorisData);
    }
  }

  // Retirer un bien des favoris
  retirerDesFavoris(bienId: string): void {
    this.favoris = this.favoris.filter((bien) => bien.id !== bienId);
    localStorage.setItem('favoris', JSON.stringify(this.favoris));
    this.toastr.success('Bien retiré des favoris', 'Succès');
  }

  // Accéder à la page de détails du bien
  voirDetails(bienId: string): void {
    this.router.navigate(['details-bien', bienId]);
  }

  // Réserver un bien
  reserver(bienId: string): void {
    const bien = this.favoris.find((f) => f.id === bienId);
    if (bien) {
      if (bien.etat === 'Disponible') {
        this.toastr.success('Réservation effectuée avec succès', 'Succès');
        bien.etat = 'Non disponible'; // Mettre à jour l'état
      } else {
        this.toastr.error('Ce bien n\'est pas disponible', 'Erreur');
      }
    }
  }
}
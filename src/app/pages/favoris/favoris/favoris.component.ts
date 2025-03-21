import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annonce } from '../../../models/Annonce';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css'],
})
export class FavorisComponent implements OnInit {
  public favoris: Annonce[] = []; // Liste des favoris

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.chargerFavoris();
  }

  // Charger les favoris depuis le localStorage
  chargerFavoris(): void {
    const favorisData = localStorage.getItem('favoris');
    if (favorisData) {
      this.favoris = JSON.parse(favorisData);
    }
  }

  // Retirer un bien des favoris
  retirerDesFavoris(bienId: number): void {
    this.favoris = this.favoris.filter((bien) => bien.id !== bienId);
    localStorage.setItem('favoris', JSON.stringify(this.favoris));
    this.toastr.success('Bien retiré des favoris', 'Succès');
  }

  // Accéder à la page de détails du bien
  voirDetails(bienId: number): void {
    this.router.navigate(['details-bien', bienId]);
  }

  // Réserver un bien
  reserver(bienId: number): void {
    const bien = this.favoris.find((f) => f.id === bienId);
    if (bien) {
      if (bien.disponible === 'Disponible') {
        this.toastr.success('Réservation effectuée avec succès', 'Succès');
        bien.disponible = 'Non Disponible'; // Mettre à jour l'état
      } else {
        this.toastr.error('Ce bien n\'est pas disponible', 'Erreur');
      }
    }
  }
}
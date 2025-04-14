import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnnonceService } from '../../../services/AnnonceService.service';
import { BienImmobilier } from '../../../models/BienImmobilier';
import { ImageService } from '../../../services/image-service.service';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css'],
})
export class ListeAnnoncesComponent implements OnInit {
  annonces: BienImmobilier[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private annonceService: AnnonceService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadAnnonces();
  }

  loadAnnonces(): void {
    this.annonceService.getAnnonceByPropietaire().subscribe(
      (data) => {
        this.annonces = data;
        this.annonces.forEach(bien => {
          if (bien.id) {
            this.imageService.loadImages(bien.id).subscribe(images => {
              bien.images = images;
              bien.imageUrls = images.map(img => this.imageService.getImageUrl(img.idImage!));
            });
        }});
        this.toastr.success('Annonces chargées avec succès', 'Succès');
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des annonces', 'Erreur');
        console.error(error);
      }
    );
  }

  modifierAnnonce(id: number): void {
    this.router.navigate(['/modifier-annonce', id]);
    this.toastr.info('Redirection vers la modification de l\'annonce', 'Information');
  }

  supprimerAnnonce(id: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');
    if (confirmation) {
      this.annonces = this.annonces.filter((annonce) => annonce.id !== id);
      this.toastr.success('Annonce supprimée avec succès', 'Succès');
    } else {
      this.toastr.warning('Suppression annulée', 'Annulation');
    }
  }

  voirDetails(id: number): void {
    this.router.navigate(['/details-annonce', id]);
    this.toastr.info('Redirection vers les détails de l\'annonce', 'Information');
  }

  publierAnnonce(): void {
    this.router.navigate(['/publier-annonce']);
    this.toastr.info('Redirection vers la publication d\'une annonce', 'Information');
  }
}

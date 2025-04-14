import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BienImmobilier } from '../../../models/BienImmobilier';
import { AnnonceService } from '../../../services/AnnonceService.service';
import { ImageService } from '../../../services/image-service.service';
import { AvisService } from '../../../services/avis.service';
import { Avis } from '../../../models/Avis';
import { Utilisateur } from '../../../models/Utilisateur';
import { AuthService } from '../../../services/auth.service';
import { AvisRequestDTO } from '../../../models/AvisRequestDTO';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  bien!: BienImmobilier;
  imagePrincipaleIndex = 0;
  safeMapUrl!: SafeResourceUrl;
  messages: { sender: string, text: string }[] = [];
  newMessage: string = "";
  imageUrls: string[] = [];
  
  // Avis et commentaires
  avis: Avis[] = [];
  averageRating: number = 0;
  newRating: number = 0;
  newComment: string = "";
  currentUser!: Utilisateur | null;

  constructor(
    private sanitizer: DomSanitizer,
    private annonceService: AnnonceService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private avisService: AvisService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadAnnonceDetails(id);
    this.loadAvis(id);
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }

  loadAnnonceDetails(id: number): void {
    this.annonceService.getAnnonceById(id).subscribe({
      next: (bien) => {
        this.bien = bien; 
        this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.generateMapUrl(bien.localisation)
        );
        this.loadImages(bien.id!);    
      },
      error: (err) => console.error('Erreur lors du chargement des détails:', err)
    });
  }

  loadImages(bienId: number): void {
    this.imageService.loadImages(bienId).subscribe({
      next: (images) => {
        this.imageUrls = images.map(img => 
          this.imageService.getImageUrl(img.idImage!)
        );
        if (this.bien.imageUrls && this.bien.imageUrls.length > 0) {
          this.imageUrls = this.bien.imageUrls;
        }
      },
      error: (err) => console.error('Erreur lors du chargement des images:', err)
    });
  }

  loadAvis(bienId: number): void {
    this.avisService.getAvisByBienId(bienId).subscribe({
      next: (avis) => {
        this.avis = avis;
        console.log(avis);
        this.calculateAverageRating();
      },
      error: (err) => console.error('Erreur lors du chargement des avis:', err)
    });
  }

  calculateAverageRating(): void {
    if (this.avis.length === 0) {
      this.averageRating = 0;
      return;
    }
    const sum = this.avis.reduce((total, avis) => total + avis.note, 0);
    this.averageRating = sum / this.avis.length;
  }

  generateMapUrl(localisation: string): string {
    const [lat, lng] = localisation.split(',');
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1500.${lat}!2d${lng}!3d${lat},${lng}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1620000000000!5m2!1sen!2stn`;
  }

  get attributsActifs(): { nom: string, icone: string, prop: string }[] {
    return [
      { nom: 'Climatiseur', icone: 'bi bi-snow', prop: 'climatiseur' },
      { nom: 'Jardin', icone: 'bi bi-tree', prop: 'jardin' },
      { nom: 'Garage', icone: 'bi bi-car-front', prop: 'garage' },
      { nom: 'Piscine', icone: 'bi bi-water', prop: 'piscine' },
      { nom: 'Balcon', icone: 'bi bi-house', prop: 'balcon' },
      { nom: 'Vue sur mer', icone: 'bi bi-eye', prop: 'vueSurMer' },
      { nom: 'Wifi', icone: 'bi bi-wifi', prop: 'wifi' }
    ].filter(attr => (this.bien as any)[attr.prop]);
  }

  get imagePrincipale(): string {
    return this.imageUrls[this.imagePrincipaleIndex] || 'assets/default-image.jpg';
  }

  changerImagePrincipale(index: number): void {
    if (index >= 0 && index < this.imageUrls.length) {
      this.imagePrincipaleIndex = index;
    }
  }

  envoyerMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: "Moi", text: this.newMessage });
      this.newMessage = "";
      setTimeout(() => {
        this.messages.push({ sender: "Propriétaire", text: "Merci pour votre message !" });
      }, 1000);
    }
  }

  submitAvis(): void {
    if (!this.currentUser || this.newRating === 0 || !this.newComment.trim()) {
      return;
    }
  
    const avisRequest: AvisRequestDTO = {
      note: this.newRating,
      commentaire: this.newComment,
      bienImmobilierId: this.bien.id!
    };
  
    this.avisService.createAvis(avisRequest).subscribe({
      next: (avis) => {
        this.avis.unshift(avis);
        this.calculateAverageRating();
        this.newRating = 0;
        this.newComment = "";
      },
      error: (err) => console.error('Erreur lors de la création de l\'avis:', err)
    });
  }

  ajouterAuxFavoris(): void {
    const favoris: BienImmobilier[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    const index = favoris.findIndex(f => f.id === this.bien.id);

    if (index === -1) {
      favoris.push(this.bien);
    } else {
      favoris.splice(index, 1);
    }

    localStorage.setItem('favoris', JSON.stringify(favoris));
  }

  isFavoris(): boolean {
    const favoris: BienImmobilier[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    return favoris.some(f => f.id === this.bien.id);
  }
}
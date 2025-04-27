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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  bien!: BienImmobilier;
  imagePrincipaleIndex = 0;
  safeMapUrl!: SafeResourceUrl;
  messages: { sender: string, text: string, time: Date }[] = [];
  newMessage: string = "";
  imageUrls: string[] = [];
  imagePath: string = 'assets/default-avatar.png';
  avis: Avis[] = [];
  averageRating: number = 0;
  newRating: number = 0;
  newComment: string = "";
  currentUser!: Utilisateur | null;
  showChat: boolean = false;
  private subs = new Subscription();

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
    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private loadUserImage(): void {
    if (!this.bien.proprietaire?.id) return;

    this.subs.add(
      this.imageService.getUserImage(this.bien.proprietaire?.id).subscribe({
        next: (imageBlob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePath = reader.result as string;
          };
          reader.readAsDataURL(imageBlob);
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l\'image de profil', err);
          this.imagePath = 'assets/default-avatar.png';
        }
      })
    );
  }

  loadAnnonceDetails(id: number): void {
    const localisation = "36.8065,10.1815";
    this.subs.add(
      this.annonceService.getAnnonceById(id).subscribe({
        next: (bien) => {
          this.bien = bien; 
          this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            
            this.generateMapUrl(localisation)
          );
          this.loadImages(bien.id!);
          this.loadUserImage();
        },
        error: (err) => console.error('Erreur lors du chargement des détails:', err)
      })
    );
  }

  loadImages(bienId: number): void {
    this.subs.add(
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
      })
    );
  }

  loadAvis(bienId: number): void {
    this.subs.add(
      this.avisService.getAvisByBienId(bienId).subscribe({
        next: (avis) => {
          this.avis = avis;
          this.calculateAverageRating();
        },
        error: (err) => console.error('Erreur lors du chargement des avis:', err)
      })
    );
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
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyAiml2zVwKsXBCeKHAoiK3Js_a3A52_6KA&center=${lat},${lng}&zoom=15`;
    
  }
  

  get imagePrincipale(): string {
    return this.imageUrls[this.imagePrincipaleIndex] || 'assets/default-image.jpg';
  }

  changerImagePrincipale(index: number): void {
    if (index >= 0 && index < this.imageUrls.length) {
      this.imagePrincipaleIndex = index;
    }
  }

  openChat(): void {
    this.showChat = true;
    // Message de bienvenue
    if (this.messages.length === 0) {
      this.messages.push({
        sender: 'Propriétaire',
        text: 'Bonjour, comment puis-je vous aider ?',
        time: new Date()
      });
    }
  }

  envoyerMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ 
        sender: "Moi", 
        text: this.newMessage,
        time: new Date()
      });
      this.newMessage = "";
      
      // Réponse automatique après 1 seconde
      setTimeout(() => {
        this.messages.push({ 
          sender: "Propriétaire", 
          text: "Merci pour votre message, je vous répondrai dès que possible.",
          time: new Date()
        });
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
  
    this.subs.add(
      this.avisService.createAvis(avisRequest).subscribe({
        next: (avis) => {
          this.avis.unshift(avis);
          this.calculateAverageRating();
          this.newRating = 0;
          this.newComment = "";
        },
        error: (err) => console.error('Erreur lors de la création de l\'avis:', err)
      })
    );
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

  shouldShowAmenities(): boolean {
    return this.bien.categorie?.nom !== 'TERRAIN' && (
      !!this.bien.climatiseur || 
      !!this.bien.jardin || 
      !!this.bien.garage || 
      !!this.bien.piscine || 
      !!this.bien.balcon || 
      !!this.bien.vueSurMer || 
      !!this.bien.wifi || 
      !!this.bien.meuble
    );
  }
  
}
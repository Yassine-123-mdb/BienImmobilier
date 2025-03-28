import { Component, OnInit,Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { BienImmobilier } from '../../../models/BienImmobilier';
import { AnnonceService } from '../../../services/AnnonceService.service';
import { ImageService } from '../../../services/image-service.service';

@Injectable({
  providedIn: 'root', 
})
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

  constructor(
    private sanitizer: DomSanitizer,
    private annonceService: AnnonceService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadAnnonceDetails(id);
  }

  loadAnnonceDetails(id: number): void {
    this.annonceService.getAnnonceById(id).subscribe({
      next: (bien) => {
        this.bien = bien; 
        console.log(bien);
        this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.generateMapUrl(bien.localisation));
        
        // Charger les images
        this.loadImages(bien.id!);    
      },
      error: (err:any) => console.error('Erreur lors du chargement des détails:', err)
    });
  }
  ajouterAuxFavoris( ): void {
   
    const favoris: BienImmobilier[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    const index = favoris.findIndex(f => f.id === this.bien.id);

    if (index === -1) {
      favoris.push(this.bien);
    } else {
      favoris.splice(index, 1);
    }

    localStorage.setItem('favoris', JSON.stringify(favoris));
  }


  loadImages(bienId: number): void {
    this.imageService.loadImages(bienId).subscribe({
      next: (images) => {
        this.imageUrls = images.map(img=> 
          this.imageService.getImageUrl(img.idImage!)
        );
        // Si le bien a déjà des imageUrls (depuis l'API), on les utilise
        if (this.bien.imageUrls && this.bien.imageUrls.length > 0) {
          this.imageUrls = this.bien.imageUrls;
        }
      },
      error: (err) => console.error('Erreur lors du chargement des images:', err)
    });
  }

  generateMapUrl(localisation: string): string {
    const [lat, lng] = localisation.split(',');
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1500.${lat}!2d${lng}!3d${lat},${lng}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1620000000000!5m2!1sen!2stn`;
  }

  get attributsActifs(): { nom: string, icone: string }[] {
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

  get imagePrincipale() {
    return this.imageUrls[this.imagePrincipaleIndex] || 'assets/default-image.jpg';
  }

  changerImagePrincipale(index: number) {
    if (index >= 0 && index < this.imageUrls.length) {
      this.imagePrincipaleIndex = index;
    }
  }

  envoyerMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: "Moi", text: this.newMessage });
      this.newMessage = "";
      setTimeout(() => {
        this.messages.push({ sender: "Propriétaire", text: "Merci pour votre message !" });
      }, 1000);
    }
  }

  

 
  isFavoris(): boolean {
    const favoris: BienImmobilier[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    return favoris.some(f => f.id === this.bien.id);
  }
}
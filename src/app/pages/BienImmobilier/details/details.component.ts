import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Annonce } from '../../../models/Annonce';
import { tree } from 'd3';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  bien: Annonce = {
    id: 7,
    titre: "Magnifique Villa à Tunis",
    description: "Superbe villa avec piscine et jardin à vendre à Tunis.",
    region: "Tunis",
    ville: "Tunis",
    adresse: "Rue de la Mer",
    prix: 500000,
    category: "maison",
    disponible: 'Disponible',
    operation: 'Vente',
    dateAjout: new Date(),
    
    images: [
      "assets/appart2.jpg",
      "assets/appart3.jpg",
      "assets/appart4.jpg"
    ],
    localisation: "36.8065,10.1815",
    surface: 200,
    nombresChambres: 4,
    nombresPieces: 6,
    nombresSallesDeBain: 2,
    climatiseur: true,
    jardin: true,
    garage: true,
    chauffage: true,
    balcon: true,
    vueSurMer: true,
    wifi: true,
    statutAdmin: 'En attente',
    nombresEtages: 2, // Spécifique aux appartements
    mapUrl: "https://www.google.com/maps/embed?...", // Ajouté ici
    proprietaire: {
      nom: "Yassine Meddeb",
      photo: "assets/yassine.jpg", // Optionnel
      telephone: "+216 98 123 456",
      email: "ahmed@example.com"
    },
  };

  imagePrincipaleIndex = 0;
  safeMapUrl: SafeResourceUrl;
  messages: { sender: string, text: string }[] = [];
  newMessage: string = "";

  constructor(private sanitizer: DomSanitizer) {
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.bien.mapUrl);
  }
  get attributsActifs(): { nom: string, icone: string }[] {
    return [
      { nom: 'Climatiseur', icone: 'bi bi-snow' },
      { nom: 'Jardin', icone: 'bi bi-tree' },
      { nom: 'Garage', icone: 'bi bi-car-front' },
      { nom: 'Chauffage', icone: 'bi bi-thermometer' },
      { nom: 'Balcon', icone: 'bi bi-house' },
      { nom: 'vueSurMer', icone: 'bi bi-eye' },
      { nom: 'wifi', icone: 'bi bi-wifi' }
    ].filter(attr => (this.bien as any)[attr.nom.toLowerCase().replace(/\s/g, '')]);
  }
  

  get imagePrincipale() {
    return this.bien.images[this.imagePrincipaleIndex];
  }

  changerImagePrincipale(index: number) {
    if (index >= 0 && index < this.bien.images.length) {
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

  ajouterAuxFavoris(): void {
    const favoris: Annonce[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    const index = favoris.findIndex(f => f.id === this.bien.id);

    if (index === -1) {
      favoris.push(this.bien);  // Ajouter le bien aux favoris
    } else {
      favoris.splice(index, 1);  // Retirer le bien des favoris
    }

    localStorage.setItem('favoris', JSON.stringify(favoris));  // Sauvegarder dans localStorage
  }

  isFavoris(): boolean {
    const favoris: Annonce[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    return favoris.some(f => f.id === this.bien.id);
  }
}
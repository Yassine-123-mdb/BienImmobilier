import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Bien } from '../../../models/Bien';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  bien: Bien = {
    id: '7',
    titre: "Magnifique Villa à Tunis",
    prix: 500000,
    description: "Superbe villa avec piscine et jardin à vendre à Tunis.",
    type: "Maison",
    localisation: "Tunis, Tunisie",
    surface: 200,
    chambres: 4,
    etages: 2,
    etat: 'Non disponible',
    transaction: 'louer',
    images: [
      "assets/appart2.jpg",
      "assets/appart3.jpg",
      "assets/appart4.jpg"
    ],
    mapUrl: "https://www.google.com/maps/embed?...",
    proprietaire: {
      nom: "Yassine Meddeb",
      photo: "assets/yassine.jpg",
      telephone: "+216 98 123 456",
      email: "ahmed@example.com"
    }
  };

  imagePrincipaleIndex = 0;
  safeMapUrl: SafeResourceUrl;
  messages: { sender: string, text: string }[] = [];
  newMessage: string = "";

  constructor(private sanitizer: DomSanitizer) {
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.bien.mapUrl);
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
    // Définir le type de favoris comme un tableau de Bien
    const favoris: Bien[] = JSON.parse(localStorage.getItem('favoris') || '[]');
  
    // Vérifier si le bien est déjà dans la liste des favoris
    if (!favoris.find((f: Bien) => f.id === this.bien.id)) {
      favoris.push(this.bien);  // Ajouter le bien à la liste
      localStorage.setItem('favoris', JSON.stringify(favoris));  // Sauvegarder dans localStorage
      console.log('Bien ajouté aux favoris');
    } else {
      console.log('Ce bien est déjà dans vos favoris');
    }
  }
}

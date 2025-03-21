import { Component } from '@angular/core';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent {
  annonce: any = {
    titre: '',
    description: '',
    region: '',
    ville: '',
    adresse: '',
    prix: null,
    disponible: true,
    typeTransaction: 'Vente', // Par défaut
    dateAjout: new Date(),
    localisation: '',
    surface: null,
    nombresChambres: null,
    nombresPieces: null,
    nombresEtages: null,
    nombresSalleDeBain: null,
    climatiseur: false,
    jardin: false,
    garage: false,
    chauffage: false,
    balcon: false,
    vueSurMer: false,
    images: [] // Tableau pour stocker les images sélectionnées
  };

  // Méthode pour gérer la sélection des fichiers
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          this.annonce.images.push(reader.result as string); // Ajouter l'image au tableau
        };
      }
    }
  }

  // Méthode pour supprimer une image
  removeImage(index: number) {
    this.annonce.images.splice(index, 1);
  }

  // Méthode pour déclencher l'input de fichier
  triggerFileInput() {
    document.getElementById('file-input')?.click();
  }

  // Méthode pour obtenir les emplacements vides d'images
  getEmptyImageSlots(): number[] {
    const maxImages = 10;
    const emptySlots = maxImages - this.annonce.images.length;
    return Array(emptySlots).fill(0);
  }

  // Méthode pour soumettre le formulaire
  onSubmit() {
    console.log('Annonce soumise :', this.annonce);
    // Ici, vous pouvez ajouter la logique pour envoyer les données au backend
  }
  showDetails(): boolean {
    return this.annonce.categorie !== 'Terrain';
  }
  onCategoryChange() {
    // Réinitialiser les valeurs spécifiques aux catégories
    if (this.annonce.categorie === 'Terrain') {
      this.annonce.nombresChambres = null;
      this.annonce.nombresPieces = null;
      this.annonce.nombresEtages = null;
      this.annonce.nombresSalleDeBain = null;
    }
  }
}
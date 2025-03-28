import { Component } from '@angular/core';
import { AnnonceService } from '../../../services/AnnonceService.service';
import { BienImmobilier } from '../../../models/BienImmobilier';
import { Categorie } from '../../../models/Categorie';
import { Utilisateur } from '../../../models/Utilisateur';
import { Gouvernorat } from '../../../models/Gouvernorat';
import { Commune } from '../../../models/Commune';
import { Image } from '../../../models/Image';
import { Reservation } from '../../../models/Reservation';
import { CategorieWrapper } from '../../../models/CategorieWrapper';
import { ImageService } from '../../../services/image-service.service';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent {
  
  annonce: BienImmobilier = this.initAnnonce();

  Listcategories! : Categorie[];
  newCat!: Categorie;
  uploadedImages: File[] = []; // Remplace uploadedImage par un tableau
  myImages: string[] = [];
  isImageUpdated: Boolean=false;
  imagePath: any;
  constructor(private annonceService: AnnonceService, private imageServiceService:ImageService) {}

  ngOnInit(): void {
    this.annonceService.listeCategorie().subscribe(
      (response: any) => {
        // Handle both direct array response and wrapped response
        if (Array.isArray(response)) {
          this.Listcategories = response;
        } else if (response._embedded && response._embedded.categorie) {
          this.Listcategories = response._embedded.categorie;
        } else {
          console.error('Unexpected response structure:', response);
          this.Listcategories = [];
        }
        console.log('Categories loaded:', this.Listcategories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.Listcategories = [];
      }
    );
  }

  /** Initialise un objet vide pour l'annonce */
  private initAnnonce(): BienImmobilier {
    return {
    
      titre: '',
      description: '',
      adresse: '',  
      prix: 0,
      disponible: true,
      typeTransaction: '',
      dateAjout: new Date(),
      surface: 0,
      localisation: '',
      nombresChambres: 0,
      nombresPieces: 0,
      nombresSalledebain: 0,
      jardin: false,
      garage: false,
      climatiseur: false,
      piscine: false,
      balcon: false,
      vueSurMer: false,
      nombresEtages: 0,
      superficie: 0,
      constructible: false,
      isVerifieAdmin: false,
      // categorie supprimé ici
      // // À remplir dynamiquement avec l'utilisateur connecté
      images: [],
      /* gouvernorat: {} as Gouvernorat, // À remplir dynamiquement
      commune: {} as Commune, // À remplir dynamiquement
      avis: [],
      reservations: [],
      utilisateursFavoris: [], */
    };
  }

  /** Gère la sélection des fichiers et les convertit en Base64 */
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      // Reset si nécessaire
      
      
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.uploadedImages.push(file); // Conserve les fichiers originaux
        
        const reader = new FileReader();
        reader.onload = () => {
          const newImage: Image = {
            name: file.name,
            type: file.type,
            image: (reader.result as string).split(',')[1],
            preview: reader.result as string
          };
          this.annonce.images.push(newImage);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  onAddImagesPhone() {
    // Uploader toutes les images immédiatement après sélection
    this.uploadedImages.forEach((file, index) => {
      // Vérifie si l'image n'a pas déjà été uploadée
      if (!this.annonce.images.some(img => img.name === file.name)) {
        this.imageServiceService.uploadImage(file, file.name)
          .subscribe((img: Image) => {
            this.annonce.images.push(img);
            console.log('Image pré-uploadée:', img);
          });
      }
    });
  }
  
  /** Convertit un fichier en Base64 et l'ajoute à la liste */
  
  onSubmit(): void {
    const annonceToSend = {...this.annonce};
    delete annonceToSend.id;
    annonceToSend.categorie = this.newCat;
  
    this.annonceService.ajouterAnnonce(annonceToSend).subscribe(
      (createdAnnonce: BienImmobilier) => {
        console.log('Annonce créée avec succès:', createdAnnonce);
        
        if (createdAnnonce.id && this.annonce.images.length > 0) {
          this.associateAllImagesWithBien(createdAnnonce.id);
        }
      },
      (error) => {
        console.error('Erreur création annonce:', error);
      }
    );
  }
  
  private associateAllImagesWithBien(bienId: number): void {
    // Convertir les images base64 en Blob
    this.annonce.images.forEach(image => {
      if (image.preview) {
        const blob = this.dataURItoBlob(image.preview);
        const file = new File([blob], image.name, { type: image.type });
        
        this.imageServiceService.uploadImageForBien(
          file, 
          image.name, 
          bienId
        ).subscribe(
          (associatedImg: Image) => {
            console.log('Image associée avec succès:', associatedImg);
          },
          (error :any) => {
            console.error('Erreur association image:', error);
          }
        );
      }
    });
  }
  
  // Helper pour convertir base64 en Blob
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ab], { type: mimeString });
  }
  
  removeImage(index: number): void {
    this.annonce.images.splice(index, 1);
  }

  /** Ouvre la boîte de dialogue pour sélectionner des fichiers */
  triggerFileInput(): void {
    document.getElementById('file-input')?.click();
  }

  /** Retourne le nombre d'emplacements d'images disponibles */
  getEmptyImageSlots(): number[] {
    const maxImages = 10;
    return Array(maxImages - this.annonce.images.length).fill(0);
  }

  /** Met à jour l'affichage des champs en fonction de la catégorie */
  onCategoryChange(): void {
    if (this.annonce.categorie && this.annonce.categorie.id === 1) {
      this.resetNonApplicableFields();
    }
  }

  /** Réinitialise les champs non applicables aux terrains */
  private resetNonApplicableFields(): void {
    this.annonce.nombresChambres = 0;
    this.annonce.nombresPieces = 0;
    this.annonce.nombresSalledebain = 0;
    this.annonce.nombresEtages = 0;
  }

  /** Affiche les détails d'un bien immobilier */
  showDetails(): boolean {
    return this.annonce.categorie ? this.annonce.categorie.nom !== 'TERRAIN' : true;
  }

  /** Affiche uniquement les détails d'un terrain */
  showTerrainDetails(): boolean {
    return this.annonce.categorie ? this.annonce.categorie.nom === 'TERRAIN' : false;
  }

  /** Soumet l'annonce au service */
  
}
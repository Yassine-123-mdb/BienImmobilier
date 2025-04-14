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
import { GoverneratCommuneService } from '../../../services/governerat-commune.service';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent {
  
  annonce: BienImmobilier = this.initAnnonce();

  Listcategories!: Categorie[];
  newCat!: Categorie;
  uploadedImages: File[] = [];
  myImages: string[] = [];
  isImageUpdated: Boolean = false;
  imagePath: any;

  gouvernorats: Gouvernorat[] = [];
  communes: Commune[] = [];
  selectedComId!: number;
  selectedGouvernoratId!: number;

  constructor(
    private annonceService: AnnonceService, 
    private imageServiceService: ImageService, 
    private gouvcommunService: GoverneratCommuneService
  ) {}

  ngOnInit(): void {
    this.annonceService.listeCategorie().subscribe(
      (response: any) => {
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
    
    this.loadGouvernorats();
  }

  private initAnnonce(): BienImmobilier {
    return {
      titre: '',
      description: '',
      adresse: '',  
      prix: 0,
      disponible: true,
      typeTransaction: '',
      typeLocation: '',
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
      wifi: false,
      meuble: false,
      chargesIncluses: false,
      statutJuridique: '',
      ascenseur: false,
      interphone: false,
      nombresEtages: 0,
      superficie: 0,
      constructible: false,
      isVerifieAdmin: false,
      images: [],
    };
  }

  private loadGouvernorats(): void {
    this.gouvcommunService.getAllGouvernorats().subscribe(
      (data: Gouvernorat[]) => this.gouvernorats = data,
      (error) => console.error('Erreur lors du chargement des gouvernorats', error)
    );
  }

  
 
  onGouvernoratChange(): void {
    if (this.selectedGouvernoratId) {
      this.gouvcommunService.getCommunesByGouvernorat(this.selectedGouvernoratId).subscribe(
        (data: Commune[]) => this.communes = data,
        (error) => console.error('Erreur lors du chargement des communes', error)
      );
    } else {
      this.communes = [];
    }
  }
  
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImages = [];
      
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.uploadedImages.push(file);
        
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
    this.uploadedImages.forEach((file, index) => {
      if (!this.annonce.images.some(img => img.name === file.name)) {
        this.imageServiceService.uploadImage(file, file.name)
          .subscribe((img: Image) => {
            this.annonce.images.push(img);
            console.log('Image pré-uploadée:', img);
          });
      }
    });
  }
  
  onSubmit(): void {
    
  
    this.gouvcommunService.getCommuneById(this.selectedComId).subscribe(
      (data: Commune) => {
        this.annonce.commune = data;

        const annonceToSend = {
          ...this.annonce,
          commune: this.annonce.commune,
          categorie: this.newCat
        };
  
        console.log('Annonce à envoyer:', annonceToSend);
  
        delete annonceToSend.id;
        delete annonceToSend.communeDetails;
  
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
      },
      (error: any) => {
        console.error('Erreur lors du chargement de la commune:', error);
      }
    );
  }
  
  private associateAllImagesWithBien(bienId: number): void {
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
          (error: any) => {
            console.error('Erreur association image:', error);
          }
        );
      }
    });
  }
  
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

  triggerFileInput(): void {
    document.getElementById('file-input')?.click();
  }

  getEmptyImageSlots(): number[] {
    const maxImages = 10;
    return Array(maxImages - this.annonce.images.length).fill(0);
  }

  onCategoryChange(): void {
    if (this.annonce.categorie && this.annonce.categorie.id === 1) {
      this.resetNonApplicableFields();
    }
  }

  private resetNonApplicableFields(): void {
    this.annonce.nombresChambres = 0;
    this.annonce.nombresPieces = 0;
    this.annonce.nombresSalledebain = 0;
    this.annonce.nombresEtages = 0;
  }
}
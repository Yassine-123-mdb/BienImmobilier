import { Component, OnInit } from '@angular/core';
import { BienImmobilier } from '../../../models/BienImmobilier';
import { Router } from '@angular/router';
import { AnnonceService } from '../../../services/AnnonceService.service';
import { ImageService } from '../../../services/image-service.service';
import { Gouvernorat } from '../../../models/Gouvernorat';
import { Commune } from '../../../models/Commune';
import { GoverneratCommuneService } from '../../../services/governerat-commune.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  constructor(private router: Router, private annonceService: AnnonceService,private imageService: ImageService, private gouvcommunService:GoverneratCommuneService) {}
  EstAfficher = false;
  EstSelectGover = false;
  gouvernorats: Gouvernorat[] = [];
  communes: Commune[] = [];
  selectedGouvernoratId: number | "" = "";
  selectedComId: number | "" = "";

    
  service = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  servicesData = [
    {
      image: 'assets/rent.svg',
      title: 'Louer',
      content: 'Notre service pour la location.',
      link: '/service1',
      btn: 'En savoir plus'
    },
    {
      image: 'assets/buy.svg',
      title: 'Acheter',
      content: "Notre service pour l'Acheté.",
      link: '/service2',
      btn: 'En savoir plus'
    },
    {
      image: 'assets/sell.svg',
      title: 'Vendre',
      content: 'Notre service pour la Vendre.',
      link: '/service3',
      btn: 'En savoir plus'
    },
    // Ajoutez d'autres services ici
  ];

  annonces: BienImmobilier[] = [];
  paginatedAnnonces: BienImmobilier[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;
  pageNumbers: number[] = [];

  keyword: string = '';
  selectedCategory: string = '';
  
  typeTransaction: string = '';
  showAdvancedFilters: boolean = false;

  nombrePieces = [1, 2, 3, 4, 5];
  nombreChambres = [1, 2, 3, 4];
  nombreSallesDeBain = [1, 2, 3];
  etages = [1, 2, 3, 4, 5];

  selectedFilters: any = {
    prixMax: 1000000,
    surfaceMin: 0,
    operation: '',
    pieces: null,
    chambres: null,
    sallesDeBain: null,
    etages: null,
    surface: null,
  };

  ngOnInit() {
    this.loadGouvernorats();
  }

  loadAnnonces() {
    const filters = {
      typeTransaction: this.typeTransaction,
      keyword: this.keyword,
      categorie: this.selectedCategory,
      gouvernorat: Number(this.selectedGouvernoratId)|| null,
      commune: Number(this.selectedComId)||null,
      ...this.selectedFilters
    };
    console.log(filters);

    this.annonceService.searchBiens(filters, this.currentPage - 1, this.itemsPerPage).subscribe(response => {
      this.annonces = response.content;
      this.EstAfficher =true;
      console.log(this.annonces);
      this.annonces.forEach(bien => {
        if (bien.id) {
          this.imageService.loadImages(bien.id).subscribe(images => {
            bien.images = images;
            bien.imageUrls = images.map(img => this.imageService.getImageUrl(img.idImage!));
          });
      }});
      this.totalPages = response.totalPages;
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.paginatedAnnonces = this.annonces;
    });
  }

  applyFilters() {
    this.loadAnnonces();
  }
 loadGouvernorats(): void {
      this.gouvcommunService.getAllGouvernorats().subscribe(
        (data: Gouvernorat[]) => this.gouvernorats = data,
        (error) => console.error('Erreur lors du chargement des gouvernorats', error)
      );
    }

  onGouvernoratChange(): void {
      if (this.selectedGouvernoratId) {
        this.EstSelectGover=true;
        this.applyFilters();
        this.gouvcommunService.getCommunesByGouvernorat(this.selectedGouvernoratId).subscribe(
          (data: Commune[]) => this.communes = data,
          (error) => console.error('Erreur lors du chargement des communes', error)
        );
      } else {
        this.communes = [];
      }
    }
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadAnnonces();
  }

  toggleFilters() {
    if (!this.selectedCategory) {
      alert("Veuillez sélectionner une catégorie avant d'appliquer des filtres !");
      return;
    }
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  toggleFavoris(annonce: BienImmobilier) {
    const favoris: BienImmobilier[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    const index = favoris.findIndex(f => f.id === annonce.id);
    if (index === -1) {
      favoris.push(annonce);
    } else {
      favoris.splice(index, 1);
    }
    localStorage.setItem('favoris', JSON.stringify(favoris));
  }

  isFavoris(annonce: BienImmobilier): boolean {
    const favoris: BienImmobilier[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    return favoris.some(f => f.id === annonce.id);
  }

  reserver(annonce: BienImmobilier) {
    alert(`Réservation de l'annonce : ${annonce.titre}`);
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/details-bien', id]);
  }
}

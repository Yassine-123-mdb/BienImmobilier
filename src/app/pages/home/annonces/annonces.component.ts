import { Component, OnInit } from '@angular/core';
import { Annonce } from '../../../models/Annonce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  constructor(private router: Router) {}
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

  // Données des services
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

  annonces: Annonce[] = [
    {
      id: 1,
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: 350000,
      images: ['assets/appartement1.jfif'],
      category: 'appartement',
      region: 'tunis',
      ville: 'La Marsa',
      adresse: 'Rue de la Mer',
      disponible: 'Disponible',
      operation: 'Vente',
      dateAjout: new Date(),
      localisation: '36.8065,10.1815',
      surface: 120,
      nombresPieces: 3,
      nombresChambres: 2,
      nombresEtages: 2,
      climatiseur: true,
      jardin: false,
      garage: true,
      chauffage: true,
      balcon: true,
      mapUrl:'',
      vueSurMer: true,
      statutAdmin: 'En attente',
      proprietaire: { // Ajout du propriétaire
        nom: 'John Doe',
        photo: 'assets/john.jpg', // Optionnel
        telephone: '+216 98 123 456',
        email: 'john.doe@example.com'
      }
    },
    {
      id: 2,
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: 850000,
      images: ['assets/villa1.jfif'],
      category: 'maison',
      region: 'nabeul',
      ville: 'Hammamet',
      adresse: 'Rue des Palmiers',
      disponible: 'Non Disponible',
      operation: 'Location',
      dateAjout: new Date(),
      localisation: '36.4000,10.6167',
      mapUrl:'',
      surface: 300,
      nombresPieces: 5,
      nombresChambres: 4,
      nombresSallesDeBain: 3,
      climatiseur: true,
      jardin: true,
      garage: true,
      chauffage: false,
      balcon: false,
      vueSurMer: false,
      statutAdmin: 'En attente',
      proprietaire: { // Ajout du propriétaire
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg', // Optionnel
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
      }},
      {
      id: 1,
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: 350000,
      images: ['assets/appartement1.jfif'],
      category: 'appartement',
      region: 'tunis',
      ville: 'La Marsa',
      adresse: 'Rue de la Mer',
      disponible: 'Disponible',
      operation: 'Vente',
      dateAjout: new Date(),
      localisation: '36.8065,10.1815',
      surface: 120,
      nombresPieces: 3,
      nombresChambres: 2,
      nombresEtages: 2,
      climatiseur: true,
      jardin: false,
      garage: true,
      chauffage: true,
      balcon: true,
      mapUrl:'',
      vueSurMer: true,
      statutAdmin: 'En attente',
      proprietaire: { // Ajout du propriétaire
        nom: 'John Doe',
        photo: 'assets/john.jpg', // Optionnel
        telephone: '+216 98 123 456',
        email: 'john.doe@example.com'
      }
    },
    {
      id: 4,
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: 850000,
      images: ['assets/villa1.jfif'],
      category: 'maison',
      region: 'nabeul',
      ville: 'Hammamet',
      adresse: 'Rue des Palmiers',
      disponible: 'Disponible',
      operation: 'Location',
      dateAjout: new Date(),
      localisation: '36.4000,10.6167',
      mapUrl:'',
      surface: 300,
      nombresPieces: 5,
      nombresChambres: 4,
      nombresSallesDeBain: 3,
      climatiseur: true,
      jardin: true,
      garage: true,
      chauffage: false,
      balcon: false,
      vueSurMer: false,
      statutAdmin: 'En attente',
      proprietaire: { // Ajout du propriétaire
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg', // Optionnel
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
      }
    },
    {
      id: 5,
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: 350000,
      images: ['assets/appartement1.jfif'],
      category: 'appartement',
      region: 'tunis',
      ville: 'La Marsa',
      adresse: 'Rue de la Mer',
      disponible: 'Disponible',
      operation: 'Vente',
      dateAjout: new Date(),
      localisation: '36.8065,10.1815',
      surface: 120,
      nombresPieces: 3,
      nombresChambres: 2,
      nombresEtages: 2,
      climatiseur: true,
      jardin: false,
      garage: true,
      chauffage: true,
      balcon: true,
      mapUrl:'',
      vueSurMer: true,
      statutAdmin: 'En attente',
      proprietaire: { // Ajout du propriétaire
        nom: 'John Doe',
        photo: 'assets/john.jpg', // Optionnel
        telephone: '+216 98 123 456',
        email: 'john.doe@example.com'
      }
    },
    {
      id: 6,
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: 850000,
      images: ['assets/villa1.jfif'],
      category: 'maison',
      region: 'nabeul',
      ville: 'Hammamet',
      adresse: 'Rue des Palmiers',
      disponible: 'Non Disponible',
      operation: 'Location',
      dateAjout: new Date(),
      localisation: '36.4000,10.6167',
      mapUrl:'',
      surface: 300,
      nombresPieces: 5,
      nombresChambres: 4,
      nombresSallesDeBain: 3,
      climatiseur: true,
      jardin: true,
      garage: true,
      chauffage: false,
      balcon: false,
      vueSurMer: false,
      statutAdmin: 'En attente',
      proprietaire: { // Ajout du propriétaire
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg', // Optionnel
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
      }
    },{
      id: 7,
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: 350000,
      images: ['assets/appartement1.jfif'],
      category: 'appartement',
      region: 'tunis',
      ville: 'La Marsa',
      adresse: 'Rue de la Mer',
      disponible: 'Disponible',
      operation: 'Vente',
      dateAjout: new Date(),
      localisation: '36.8065,10.1815',
      surface: 120,
      nombresPieces: 3,
      nombresChambres: 2,
      nombresEtages: 2,
      climatiseur: true,
      jardin: false,
      garage: true,
      chauffage: true,
      balcon: true,
      mapUrl:'',
      vueSurMer: true,
      statutAdmin: 'En attente',
      proprietaire: { // Ajout du propriétaire
        nom: 'John Doe',
        photo: 'assets/john.jpg', // Optionnel
        telephone: '+216 98 123 456',
        email: 'john.doe@example.com'
      }
    },
    {
      id: 8,
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: 850000,
      images: ['assets/villa1.jfif'],
      category: 'maison',
      region: 'nabeul',
      ville: 'Hammamet',
      adresse: 'Rue des Palmiers',
      disponible: 'Non Disponible',
      operation: 'Location',
      dateAjout: new Date(),
      localisation: '36.4000,10.6167',
      mapUrl:'',
      surface: 300,
      nombresPieces: 5,
      nombresChambres: 4,
      nombresSallesDeBain: 3,
      climatiseur: true,
      jardin: true,
      garage: true,
      chauffage: false,
      balcon: false,
      vueSurMer: false,
      statutAdmin: 'En attente',
      proprietaire: { // Ajout du propriétaire
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg', // Optionnel
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
      }},
      {
        id: 8,
        titre: 'Appartement à La Marsa',
        description: 'Magnifique appartement avec vue sur mer.',
        prix: 350000,
        images: ['assets/appartement1.jfif'],
        category: 'appartement',
        region: 'tunis',
        ville: 'La Marsa',
        adresse: 'Rue de la Mer',
        disponible: 'Disponible',
        operation: 'Vente',
        dateAjout: new Date(),
        localisation: '36.8065,10.1815',
        surface: 120,
        nombresPieces: 3,
        nombresChambres: 2,
        nombresEtages: 2,
        climatiseur: true,
        jardin: false,
        garage: true,
        chauffage: true,
        balcon: true,
        mapUrl:'',
        statutAdmin: 'En attente',
        vueSurMer: true,
        proprietaire: { // Ajout du propriétaire
          nom: 'John Doe',
          photo: 'assets/john.jpg', // Optionnel
          telephone: '+216 98 123 456',
          email: 'john.doe@example.com'
        }
      },
      {
        id: 10,
        titre: 'Villa à Hammamet',
        description: 'Villa luxueuse avec piscine.',
        prix: 850000,
        images: ['assets/villa1.jfif'],
        category: 'maison',
        region: 'nabeul',
        ville: 'Hammamet',
        adresse: 'Rue des Palmiers',
        disponible: 'Disponible',
        operation: 'Location',
        dateAjout: new Date(),
        localisation: '36.4000,10.6167',
        mapUrl:'',
        surface: 300,
        nombresPieces: 5,
        nombresChambres: 4,
        nombresSallesDeBain: 3,
        climatiseur: true,
        jardin: true,
        garage: true,
        chauffage: false,
        balcon: false,
        vueSurMer: false,
        statutAdmin: 'Apprové',
        proprietaire: { // Ajout du propriétaire
          nom: 'Jane Smith',
          photo: 'assets/jane.jpg', // Optionnel
          telephone: '+216 98 654 321',
          email: 'jane.smith@example.com'
        }}
    // Ajoutez d'autres annonces ici...
  ];

  paginatedAnnonces: Annonce[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;
  pageNumbers: number[] = [];

  // Filtres
  keyword: string = '';
  selectedCategory: string = '';
  selectedRegion: string = '';
  showAdvancedFilters: boolean = false;

  // Options pour les filtres avancés
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
    this.applyFilters();
  }

  // Appliquer les filtres
  applyFilters() {
    let filteredAnnonces = this.annonces.filter(annonce => {
      const matchesKeyword = annonce.titre.toLowerCase().includes(this.keyword.toLowerCase()) ||
                             annonce.description.toLowerCase().includes(this.keyword.toLowerCase());
      const matchesCategory = this.selectedCategory ? annonce.category === this.selectedCategory : true;
      const matchesRegion = this.selectedRegion ? annonce.region === this.selectedRegion : true;
      const matchesPrix = annonce.prix <= this.selectedFilters.prixMax;
      const matchesSurface = annonce.surface ? annonce.surface >= this.selectedFilters.surfaceMin : true;
      const matchesOperation = this.selectedFilters.operation ? annonce.operation === this.selectedFilters.operation : true;
      const matchesPieces = this.selectedFilters.pieces ? annonce.nombresPieces === this.selectedFilters.pieces : true;
      const matchesChambres = this.selectedFilters.chambres ? annonce.nombresChambres === this.selectedFilters.chambres : true;
      const matchesSallesDeBain = this.selectedFilters.sallesDeBain ? annonce.nombresSallesDeBain === this.selectedFilters.sallesDeBain : true;
      const matchesEtages = this.selectedFilters.etages ? annonce.nombresEtages === this.selectedFilters.etages : true;

      return matchesKeyword && matchesCategory && matchesRegion && matchesPrix && matchesSurface && matchesOperation && matchesPieces && matchesChambres && matchesSallesDeBain && matchesEtages;
    });

    this.totalPages = Math.ceil(filteredAnnonces.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginatedAnnonces = filteredAnnonces.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  // Changer de page
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilters();
  }

  // Afficher/masquer les filtres avancés
  toggleFilters() {
    if (!this.selectedCategory) {
      alert("Veuillez sélectionner une catégorie avant d'appliquer des filtres !");
      return;
    }
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  // Ajouter/retirer des favoris
  toggleFavoris(annonce: Annonce) {
    const favoris: Annonce[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    const index = favoris.findIndex(f => f.id === annonce.id);

    if (index === -1) {
      favoris.push(annonce);  // Ajouter l'annonce aux favoris
    } else {
      favoris.splice(index, 1);  // Retirer l'annonce des favoris
    }

    localStorage.setItem('favoris', JSON.stringify(favoris));  // Sauvegarder dans localStorage
  }

  // Vérifier si une annonce est dans les favoris
  isFavoris(annonce: Annonce): boolean {
    const favoris: Annonce[] = JSON.parse(localStorage.getItem('favoris') || '[]');
    return favoris.some(f => f.id === annonce.id);
  }

  // Réserver une annonce
  reserver(annonce: Annonce) {
    alert(`Réservation de l'annonce : ${annonce.titre}`);
  }
  navigateToDetails(id: number) {
    this.router.navigate(['/details-bien', id]);
  }
}
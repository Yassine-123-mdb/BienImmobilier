import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annonce } from '../../../models/Annonce';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  OnInit(): void {  
    this.activeCategory('maison')
  }
  constructor(private router: Router) {}
  
  
  config = {
    slidesToShow: 4, // Afficher 4 cartes par ligne
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200, // Pour les écrans moyens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, // Pour les tablettes
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480, // Pour les mobiles
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
 
  galleryFilter = 'maison';
  filterredImages: Annonce[] = [];

  list: Annonce[] = [
    {
      id: 1,
      titre: 'Villa de luxe à louer',
      description: 'Belle villa avec jardin et piscine.',
      region: 'Île-de-France',
      ville: 'Paris',
      adresse: '118-11 Sutphin Blvd, Jamaica, NY 11434',
      prix: 3850,
      category: 'maison',
      disponible: 'Disponible',
      operation: 'Location',
      dateAjout: new Date(),
      images: ['assets/appart2.jpg'],
      localisation: '118-11 Sutphin Blvd, Jamaica, NY 11434',
      surface: 250,
      mapUrl: 'https://www.google.com/maps?q=118-11+Sutphin+Blvd',
      statutAdmin: 'Validée',
      nombresChambres: 4,
      nombresSallesDeBain: 3,
      jardin: true,
      garage: true,
      chauffage: true,
      proprietaire: {
        nom: 'John Doe',
        telephone: '0123456789',
        email: 'john.doe@example.com',
      },
    },
    {
      id: 2,
      titre: 'Duplex avec garage à vendre',
      description: 'Magnifique duplex avec garage.',
      region: 'New York',
      ville: 'Kings Park',
      adresse: '21 Pulaski Road, Kings Park, NY 11754',
      prix: 200410,
      category: 'maison',
      disponible: 'Disponible',
      operation: 'Vente',
      dateAjout: new Date(),
      images: ['assets/appart3.jpg'],
      localisation: '21 Pulaski Road, Kings Park, NY 11754',
      surface: 180,
      mapUrl: 'https://www.google.com/maps?q=21+Pulaski+Road',
      statutAdmin: 'Validée',
      nombresChambres: 3,
      nombresSallesDeBain: 2,
      garage: true,
      proprietaire: {
        nom: 'Jane Smith',
        telephone: '0987654321',
        email: 'jane.smith@example.com',
      },
    },
    {
      id: 1,
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: 350000,
      images: ['assets/appart3.jpg'],
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
      mapUrl: '',
      vueSurMer: true,
      statutAdmin: 'En attente',
      proprietaire: {
        nom: 'John Doe',
        photo: 'assets/john.jpg',
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
      mapUrl: '',
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
      proprietaire: {
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg',
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
      }
    },
    
  ];

  // Filtre les annonces en fonction de la catégorie sélectionnée
  activeCategory(category: string) {
    this.galleryFilter = category;
    this.filterredImages = this.topOfferData.filter(x => x.category === this.galleryFilter);
  }


  // Données des annonces
  topOfferData:Annonce[] = [
    {
      id: 1,
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: 350000,
      images: ['assets/appart5.jpg'],
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
      mapUrl: '',
      vueSurMer: true,
      statutAdmin: 'En attente',
      proprietaire: {
        nom: 'John Doe',
        photo: 'assets/john.jpg',
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
      mapUrl: '',
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
      proprietaire: {
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg',
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
      }
    },
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
      mapUrl: '',
      vueSurMer: true,
      statutAdmin: 'En attente',
      proprietaire: {
        nom: 'John Doe',
        photo: 'assets/john.jpg',
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
      mapUrl: '',
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
      proprietaire: {
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg',
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
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
      mapUrl: '',
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
      proprietaire: {
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg',
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
      }
    },
    {
      id: 2,
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: 850000,
      images: ['assets/appart2.jpg'],
      category: 'maison',
      region: 'nabeul',
      ville: 'Hammamet',
      adresse: 'Rue des Palmiers',
      disponible: 'Non Disponible',
      operation: 'Location',
      dateAjout: new Date(),
      localisation: '36.4000,10.6167',
      mapUrl: '',
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
      proprietaire: {
        nom: 'Jane Smith',
        photo: 'assets/jane.jpg',
        telephone: '+216 98 654 321',
        email: 'jane.smith@example.com'
      }
    },
    // Ajoutez d'autres annonces ici
  ];
  
  navigateToDetails(id: number) {
    this.router.navigate(['/details-bien', id]);
  }
  toggleFavori(offre: any, event: Event) {
    event.stopPropagation();
    offre.favori = !offre.favori;
  }
  avigateToDetails(id: number) {
    this.router.navigate(['/details-bien', id]);
  }

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
  reserver(annonce: Annonce) {
    alert(`Réservation de l'annonce : ${annonce.titre}`);
  }

}
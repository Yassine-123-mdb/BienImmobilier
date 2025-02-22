import { Component, OnInit } from '@angular/core';

interface Annonce {
  titre: string;
  description: string;
  prix: string;
  image: string;
}

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  annonces: Annonce[] = [  // Déclaration explicite du type
    {
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: '350 000',
      image: 'assets/appartement1.jfif'
    },
    {
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: '850 000',
      image: 'assets/villa1.jfif'
    },
    {
      titre: 'Terrain à Tunis',
      description: 'Studio moderne et bien situé.',
      prix: '120 000',
      image: 'assets/terrain.jfif'
    },
    {
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: '350 000',
      image: 'assets/appartement1.jfif'
    },
    {
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: '850 000',
      image: 'assets/villa1.jfif'
    },
    {
      titre: 'Terrain à Tunis',
      description: 'Studio moderne et bien situé.',
      prix: '120 000',
      image: 'assets/terrain.jfif'
    },
    {
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: '350 000',
      image: 'assets/appartement1.jfif'
    },
    {
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: '850 000',
      image: 'assets/villa1.jfif'
    },
    {
      titre: 'Terrain à Tunis',
      description: 'Studio moderne et bien situé.',
      prix: '120 000',
      image: 'assets/terrain.jfif'
    },{
      titre: 'Appartement à La Marsa',
      description: 'Magnifique appartement avec vue sur mer.',
      prix: '350 000',
      image: 'assets/appartement1.jfif'
    },
    {
      titre: 'Villa à Hammamet',
      description: 'Villa luxueuse avec piscine.',
      prix: '850 000',
      image: 'assets/villa1.jfif'
    },
    {
      titre: 'Terrain à Tunis',
      description: 'Studio moderne et bien situé.',
      prix: '120 000',
      image: 'assets/terrain.jfif'
    },
    // Ajoutez d'autres annonces ici...
  ];

  paginatedAnnonces: Annonce[] = [];  // Assurez-vous que paginatedAnnonces a le bon type
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;
  pageNumbers: number[] = [];

  ngOnInit() {
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.annonces.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);  // Génère les numéros de page
    this.paginatedAnnonces = this.annonces.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}

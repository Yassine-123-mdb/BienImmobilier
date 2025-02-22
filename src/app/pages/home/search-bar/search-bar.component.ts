import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  showAdvancedFilters: boolean = false;
  selectedCategory: string = '';
  selectedRegion: string = '';
  keyword: string = '';
  selectedOperation: string = 'tous'; // Valeur par défaut

  // Options pour les filtres
  nombrePieces = [1, 2, 3, 4, 5];
  nombreChambres = [1, 2, 3, 4];
  nombreSallesDeBain = [1, 2, 3];
  etages = [1, 2, 3, 4, 5];
  equipmentOptions = ['Climatiseur', 'Wi-Fi', 'Piscine', 'Garage'];

  selectedFilters: any = {
    pieces: null, // Sélection unique pour le nombre de pièces
    chambres: null, // Sélection unique pour le nombre de chambres
    sallesDeBain: null, // Sélection unique pour le nombre de salles de bain
    surface: null,
    etages: null,
    budget: null,
    equipments: [] // Sélection multiple pour les équipements
  };

  // Fonction pour afficher/masquer les filtres
  toggleFilters() {
    if (!this.selectedCategory) {
      alert("Veuillez sélectionner une catégorie avant d'appliquer des filtres !");
      return;
    }
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  // Fonction pour vérifier si un équipement est sélectionné
  isChecked(equipment: string): boolean {
    return this.selectedFilters.equipments.includes(equipment);
  }
}

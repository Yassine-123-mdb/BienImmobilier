export interface Bien {
    id: string;
    titre: string;
    prix: number;
    description: string;
    type: string;
    localisation: string;
    surface: number;
    chambres: number;
    etages: number;
    images: string[];
    mapUrl: string;
    proprietaire: {
      nom: string;
      photo: string;
      telephone: string;
      email: string;
    };
    etat: 'Disponible' | 'Non disponible'; // Nouvelle propriété
    transaction: 'louer' | 'vendre'; // Nouvelle propriété
  }
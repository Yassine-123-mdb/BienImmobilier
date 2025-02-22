export class Reservation {
    id: string;
    titre: string;
    dateDebut: string;
    dateFin: string;
    statut: 'Confirmée' | 'En attente' | 'Rejetée';
    localisation: string;
    bienId: string;
  
    constructor(
      id: string,
      titre: string,
      dateDebut: string,
      dateFin: string,
      statut: 'Confirmée' | 'En attente' | 'Rejetée',
      localisation: string,
      bienId: string
    ) {
      this.id = id;
      this.titre = titre;
      this.dateDebut = dateDebut;
      this.dateFin = dateFin;
      this.statut = statut;
      this.localisation = localisation;
      this.bienId = bienId;
    }
  }
  
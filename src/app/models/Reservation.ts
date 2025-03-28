export class Reservation {
  id?: number; 
  bienId: number;
  utilisateurId: number; 
  titre: string;
  dateDebut: Date; 
  adress:string;
  dateFin: Date; 
  prixTotal: number; 
  statut: 'En attente' | 'Confirme' | 'Annule' = 'En attente';
  commentaire?: string; 

  constructor(
    bienId: number,
    titre: string,
    utilisateurId: number,
    dateDebut: Date,
    adress: string,
    dateFin: Date,
    prixTotal: number,
    commentaire?: string
  ) {
    this.bienId = bienId;
    this.utilisateurId = utilisateurId;
    this.dateDebut = dateDebut;
    this.adress = adress;
    this.titre = titre;
    this.dateFin = dateFin;
    this.prixTotal = prixTotal;
    this.commentaire = commentaire;
  }
}

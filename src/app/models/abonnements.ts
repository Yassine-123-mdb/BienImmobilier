export interface Abonnement {
  id: number;
  type: string;
  nbrAnnonceAutorisees: number;
  dateExpiration: Date;
  prix: number;
}
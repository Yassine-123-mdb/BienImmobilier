import { Utilisateur } from "./Utilisateur";

export interface Reservation {
  id?: number;
  dateDebut: string;
  dateFin: string;
  dateReservation?: string;
  statut?: 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE' | 'REFUSEE' | 'TERMINEE';
  confirmeParProprietaire?: boolean;
  annuleParClient?: boolean;
  commentaire?: string;
  client?: Utilisateur;
  bienId?: number; // utile pour la création
  bien?: {
    id: number;
    titre: string;
    adresse: string;
    description: string;
    prix: number;
  };
}

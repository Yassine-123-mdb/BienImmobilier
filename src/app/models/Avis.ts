import { Utilisateur } from "./Utilisateur";
import { BienImmobilier } from "./BienImmobilier";

export interface Avis {
  id: number;
  note: number;
  commentaire: string;
  date: Date;
  auteur: Utilisateur;
  bienImmobilier: BienImmobilier;
}

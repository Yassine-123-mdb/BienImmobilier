import { Image } from "./Image";
import { Role } from "./Role";
import { BienImmobilier } from "./BienImmobilier";
import { Reservation } from "./Reservation";

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone: string;
  images: Image[];
  roles: Role[];
  biensImmobiliers: BienImmobilier[];
  favoris: BienImmobilier[];
  reservations: Reservation[];
}

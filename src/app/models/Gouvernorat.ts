import { Commune } from "./Commune";

export interface Gouvernorat {
  id: number;
  nom: string;
  communes: Commune[];
}

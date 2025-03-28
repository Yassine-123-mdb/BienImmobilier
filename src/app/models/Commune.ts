import { Gouvernorat } from "./Gouvernorat";

export interface Commune {
  id: number;
  nom: string;
  gouvernorat: Gouvernorat;
}

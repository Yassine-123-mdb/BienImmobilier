import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BienImmobilier } from '../models/BienImmobilier';
import { CategorieWrapper } from '../models/CategorieWrapper';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private apiUrl = "http://localhost:9091/api/biens";
  private apiURLCat = "http://localhost:9091/categories";
  
  constructor(private http: HttpClient) {}

  listeCategorie(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(this.apiURLCat);
  }

  ajouterAnnonce(annonce: BienImmobilier): Observable<BienImmobilier> {
    return this.http.post<BienImmobilier>(this.apiUrl, annonce);
  }

  getTopOffers(): Observable<BienImmobilier[]> {
    return this.http.get<BienImmobilier[]>(`${this.apiUrl}/top-offers`);
  }

  getTodayAdded(): Observable<BienImmobilier[]> {
    return this.http.get<BienImmobilier[]>(`${this.apiUrl}/today-added`);
  }

  getByCategory(category: string): Observable<BienImmobilier[]> {
    return this.http.get<BienImmobilier[]>(`${this.apiUrl}/categorie/${category}`);
  }

  toggleFavorite(annonceId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${annonceId}/favoris`, {});
  }

  getAnnonceById(id: number): Observable<BienImmobilier> {
    return this.http.get<BienImmobilier>(`${this.apiUrl}/${id}`);
  }
}
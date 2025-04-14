import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BienImmobilier } from '../models/BienImmobilier';
import { CategorieWrapper } from '../models/CategorieWrapper';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private apiUrl = "http://localhost:9091/api";
  private apiURLCat = "http://localhost:9091/categories";
  
  constructor(private http: HttpClient,private authService: AuthService) {}
  
  searchBiens(filters: any, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.post<any>(`${this.apiUrl}/biens/user/search`, filters, { params });
  }
  

  listeCategorie(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(this.apiURLCat); 
  }

  ajouterAnnonce(bien: BienImmobilier): Observable<BienImmobilier> {
    // Utilisation de AuthService pour obtenir les en-têtes avec le token
    const headers = this.authService.getAuthHeaders();
    
    return this.http.post<BienImmobilier>(`${this.apiUrl}/proprietaire`, bien, { headers, withCredentials: true });
  }

  getTopOffers(): Observable<BienImmobilier[]> {
    return this.http.get<BienImmobilier[]>(`${this.apiUrl}/biens/user/top-offers`);
  }

  getTodayAdded(): Observable<BienImmobilier[]> {
    return this.http.get<BienImmobilier[]>(`${this.apiUrl}/biens/user/today-added`);
  }

  getByCategory(category: string): Observable<BienImmobilier[]> {
    return this.http.get<BienImmobilier[]>(`${this.apiUrl}/categorie/${category}`);
  }

  toggleFavorite(annonceId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${annonceId}/favoris`, {});
  }

  getAnnonceById(id: number): Observable<BienImmobilier> {
    return this.http.get<BienImmobilier>(`${this.apiUrl}/biens/user/${id}`);
  }
  getAnnonceByPropietaire(): Observable<BienImmobilier[]> {
    return this.http.get<BienImmobilier[]>(`${this.apiUrl}/proprietaire/mes-biens`,{ withCredentials: true });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gouvernorat } from '../models/Gouvernorat';
import { Commune } from '../models/Commune';

@Injectable({
  providedIn: 'root'
})
export class GoverneratCommuneService {
  private apiUrl = 'http://localhost:9091/api';

  constructor(private http: HttpClient) {}

  getAllGouvernorats(): Observable<Gouvernorat[]> {
    return this.http.get<Gouvernorat[]>(`${this.apiUrl}/gouvernorats`);
  }

   getCommunesByGouvernorat(gouvernoratId: number): Observable<Commune[]> {
    return this.http.get<Commune[]>(`${this.apiUrl}/communes/byGouvernorat/${gouvernoratId}`);
  }
  getGouvernoratById(gouvernoratId: number|null): Observable<Gouvernorat> {
    return this.http.get<Gouvernorat>(`${this.apiUrl}/gouvernorats/${gouvernoratId}`);
  }
  getCommuneById(communeId: number): Observable<Commune> {
    return this.http.get<Commune>(`${this.apiUrl}/communes/${communeId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{Image} from '../models/Image';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiURLImg= "http://localhost:9091/api/images";
  constructor(private http: HttpClient) {}   
  
  uploadImage(file: File, filename: string): Observable<Image>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURLImg + '/upload'}`;
      return this.http.post<Image>(url, imageFormData);
      }
    loadImages(id: number): Observable<Image[]> {
      const url = `${this.apiURLImg + '/getImagesForBien'}/${id}`;
      return this.http.get<Image[]>(url);
      }
      getImageUrl(imageId: number): string {
        return `${this.apiURLImg}/load/${imageId}`;
      }
      uploadImageForBien(file: File, filename: string, bienId: number): Observable<Image> {
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename );
        return this.http.post<Image>(`${this.apiURLImg}/upload/${bienId}`, imageFormData);
      }
     supprimerImage(id : number) {
      const url = `${this.apiURLImg} /delete/${id}`;
      return this.http.delete(url,);
      }
}

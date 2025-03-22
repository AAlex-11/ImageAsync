// src/app/services/image-loader.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root', // Make the service available application-wide
})
export class ImageLoaderService {
  constructor(private http: HttpClient) {}

  // Method to load an image and return an Observable
  loadImage(imageUrl: string): Observable<string | null> {
    return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
      tap(blob => console.log('Received Blob:', blob)), // Log the Blob
      map(blob => URL.createObjectURL(blob)), // Convert Blob to URL
      tap(url => console.log('Generated URL:', url)), // Log the generated URL
      catchError(error => {
        console.error('Error loading image:', error);
        return of(null);
      })
    );
  }
}

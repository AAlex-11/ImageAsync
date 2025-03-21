import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import {catchError, Observable, of, tap} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environment'

@Component({
  selector: 'app-image-loader',
  standalone: true, // Mark as standalone
  imports: [AsyncPipe, CommonModule],
  templateUrl: './image-loader.component.html'
})
export class ImageLoaderComponent {
  imageUrl$: Observable<string | null>;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {
    this.imageUrl$ = this.http.get(environment.imageUrl, { responseType: 'blob' })
      .pipe(
        tap(blob => console.log('Received Blob:', blob)), // Log the Blob
        map(blob => URL.createObjectURL(blob)), // Convert Blob to URL
        tap(url => console.log('Generated URL:', url)), // Log the generated URL
        catchError(error => {
          console.error('Error loading image:', error);
          this.errorMessage = 'Failed to load image. Please try again later.';
          return of(null);
        })
    );
  }
}

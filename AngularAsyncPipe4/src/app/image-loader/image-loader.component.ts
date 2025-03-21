import {Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, of, Subject} from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environment'

@Component({
  selector: 'app-image-loader',
  standalone: true, // Mark as standalone
  imports: [AsyncPipe, CommonModule],
  templateUrl: './image-loader.component.html'
})
export class ImageLoaderComponent {
  @Input() imageUrl: string = ''
  imageUrl$: Observable<string | null>;
  errorMessage: string | null = null;
  private reload$ = new Subject<void>();// Subject to trigger reloads

  constructor(private http: HttpClient) {
    this.imageUrl$ = this.reload$.pipe(
      switchMap(() => this.http.get(environment.imageUrl, { responseType: 'blob' })
      .pipe(
        tap(blob => console.log('Received Blob:', blob)), // Log the Blob
        map(blob => URL.createObjectURL(blob)), // Convert Blob to URL
        tap(url => console.log('Generated URL:', url)), // Log the generated URL
        catchError(error => {
          console.error('Error loading image:', error);
          this.errorMessage = 'Failed to load image. Please try again later.';
          return of(null);
        })
      ))
    );
    // Trigger the first load
    this.loadImage();
  }

  // Method to trigger a reload
  loadImage() {
    this.errorMessage = null; // Clear any previous error message
    this.reload$.next(); // Emit a value to trigger the reload
  }
}

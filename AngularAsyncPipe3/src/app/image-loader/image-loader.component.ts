import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environment'

@Component({
  selector: 'app-image-loader',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './image-loader.component.html',
})
export class ImageLoaderComponent {
  imageUrl$: Observable<string | null>;
  errorMessage: string | null = null;
  private reload$ = new Subject<void>(); // Subject to trigger reloads

  constructor() {
    this.imageUrl$ = this.reload$.pipe(
      switchMap(() => this.loadImageWithXHR()), // Use XMLHttpRequest to load the image
      catchError(error => {
        console.error('Error loading image:', error);
        this.errorMessage = 'Failed to load image. Please try again later.';
        return of(null); // Return null in case of an error
      })
    );
    // Trigger the first load
    this.loadImage();
  }

  // Method to trigger a reload
  loadImage() {
    this.errorMessage = null; // Clear any previous error message
    this.reload$.next(); // Emit a value to trigger the reload
  }

  // Method to load an image using XMLHttpRequest
  private loadImageWithXHR(): Observable<string> {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', environment.imageUrl, true);
      xhr.responseType = 'blob'; // Set the response type to blob
      xhr.onload = () => {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const imageUrl = URL.createObjectURL(blob); // Convert Blob to URL
          observer.next(imageUrl); // Emit the image URL
          observer.complete(); // Complete the observable
        } else {
          observer.error(new Error(`Failed to load image. Status: ${xhr.status}`));
        }
      };
      xhr.onerror = () => {
        observer.error(new Error('Network error while loading image.'));
      };
      xhr.send(); // Send the request
    });
  }
}

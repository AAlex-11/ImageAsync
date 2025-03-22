import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { environment } from '../../environment';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom

@Component({
  selector: 'app-image-loader',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './image-loader.component.html',
})
export class ImageLoaderComponent {
  imageUrlPromise: Promise<string | null>; // Use a Promise
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {
    this.imageUrlPromise = this.loadImage();
  }

  // Method to load the image using Promises
  async loadImage(): Promise<string | null> {
    try {
      // firstValueFrom is a new alternatives to toPromise()
      const blob = await firstValueFrom(this.http.get(environment.imageUrl, { responseType: 'blob' }));
      console.log('Received Blob:', blob); // Log the Blob

      // Ensure blob is defined before creating the URL
      if (blob) {
        return URL.createObjectURL(blob); // Convert Blob to URL and return
      } else {
        throw new Error('Blob is undefined');
      }
    } catch (error) {
      console.error('Error loading image:', error);
      this.errorMessage = 'Failed to load image. Please try again later.';
      return null;
    }
  }
}

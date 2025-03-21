import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLoaderComponent } from './image-loader/image-loader.component';

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  imports: [CommonModule, ImageLoaderComponent],
  template: `
    <h3>Image Loader App</h3>
    <app-image-loader></app-image-loader>
  `,
})
export class AppComponent {
  currentTime: string;

  constructor() {
    this.currentTime = new Date().toLocaleTimeString();
    console.log('AppComponent rendered at:', this.currentTime);
  }
}

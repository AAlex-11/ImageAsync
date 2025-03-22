import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageListComponent} from './image-list/image-list.component';

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  imports: [CommonModule, ImageListComponent],
  template: `
    <h3>Image Loader App</h3>
    <app-image-list></app-image-list>
  `,
})
export class AppComponent {
  currentTime: string;

  constructor() {
    this.currentTime = new Date().toLocaleTimeString();
    console.log('AppComponent rendered at:', this.currentTime);
  }
}

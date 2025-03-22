import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule, ImageLoaderComponent],
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent {
  imageUrls: string[] = [
    'http://localhost:3000/image/',
    'http://localhost:3000/image/',
    'http://localhost:3000/image/',
  ];
}

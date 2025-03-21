import { Component } from '@angular/core';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule,ImageLoaderComponent],
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent {
  // Define an array of image URLs
  imageUrls: string[] = [
    'http://localhost:3000/images/image1.png',
    'http://localhost:3000/images/image2.png',
    'http://localhost:3000/images/image3.png',
    'http://localhost:3000/images/image4.png',
    'http://localhost:3000/images/image5.png',
    'http://localhost:3000/images/image6.png',
    'http://localhost:3000/images/image7.png',
    'http://localhost:3000/images/image8.png',
    'http://localhost:3000/images/image9.png',
    'http://localhost:3000/images/image10.png',
  ];
}

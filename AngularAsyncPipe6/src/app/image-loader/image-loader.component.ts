import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ImageLoaderService } from '../services/image-loader.service';

@Component({
  selector: 'app-image-loader',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './image-loader.component.html',
})
export class ImageLoaderComponent implements OnInit {
  @Input() imageUrl: string = ''; // Accept an input for the image URL
  imageUrl$: Observable<string | null> | null = null;
  errorMessage: string | null = null;

  constructor(private imageLoaderService: ImageLoaderService) {}

  ngOnInit() {
    this.imageUrl$ = this.imageLoaderService.loadImage(this.imageUrl);
  }

}

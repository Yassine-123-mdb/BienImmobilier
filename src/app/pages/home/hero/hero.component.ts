import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  images: string[] = [
    'assets/images.jfif',
    'assets/image2.jfif',
    'assets/banner.jpg',
    'assets/image4.jfif'
  ];
  currentIndex: number = 0;
  currentImage: string = this.images[this.currentIndex];

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 4000); // Change toutes les 3 secondes
  }
}

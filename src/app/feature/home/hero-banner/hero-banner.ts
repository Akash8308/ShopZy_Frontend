import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.html',
  styleUrls: ['./hero-banner.scss']
})
export class HeroBannerComponent implements OnInit {

  currentSlide = 0;

  banners = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/LA/PC_PUD_Hero_3000X1200_Prime_1x._CB761156182_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img21/APAY/MAYART26/travel/2_Hotels_PC_Hero_3000x1200._CB762668405_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/LA/PC_PUD_Hero_3000X1200_Prime_1x._CB761156182_.jpg'
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentSlide =
      (this.currentSlide + 1) % this.banners.length;
  }

  previousSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.banners.length) %
      this.banners.length;
  }
}
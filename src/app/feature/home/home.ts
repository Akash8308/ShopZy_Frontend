import { Component, inject } from '@angular/core';
import { DashboardItem, DashboardCardComponent } from './dashboard-card/dashboard-card';
import { HeroBannerComponent } from "./hero-banner/hero-banner";
import { ActivatedRoute } from '@angular/router';
import { RecommendationSection } from "./recommendation-section/recommendation-section";
import { Store } from '@ngrx/store';
import { exchange } from '../auth/states/auth.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [HeroBannerComponent, DashboardCardComponent, RecommendationSection]
})
export class HomeComponent {

  private route = inject(ActivatedRoute);
  private store = inject(Store);

  ngOnInit() {
  const token = this.route.snapshot.queryParamMap.get('token');

  if (token) {
    this.store.dispatch(exchange({ token })
    );
  }
}

  keepShopping: DashboardItem[] = [
  {
    name: 'Gaming Desk',
    image: 'https://m.media-amazon.com/images/I/81rz8Hz2TvL._SL1500_.jpg'
  },
  {
    name: 'Gaming Mouse',
    image: 'https://m.media-amazon.com/images/I/71mrcB4eVJL._SL1500_.jpg'
  },
  {
    name: 'Headphones',
    image: 'https://m.media-amazon.com/images/I/71bDMBs-kXL._SL1500_.jpg'
  },
  {
    name: 'Safety Razor',
    image: 'https://m.media-amazon.com/images/I/61jW7ZxJ4BL._SL1500_.jpg'
  }
];

deals: DashboardItem[] = [
  {
    name: 'Office Desk',
    image: 'https://m.media-amazon.com/images/I/71eA8VnM5sL._SL1500_.jpg'
  },
  {
    name: 'Running Shoes',
    image: 'https://m.media-amazon.com/images/I/71zkuNICJAL._UY1000_.jpg'
  },
  {
    name: 'Kitchen Oil Dispenser',
    image: 'https://m.media-amazon.com/images/I/71Pf7K2N2SL._SL1500_.jpg'
  },
  {
    name: 'Vegetable Cutter',
    image: 'https://m.media-amazon.com/images/I/81tKpVvXW8L._SL1500_.jpg'
  }
];

gamingChairs: DashboardItem[] = [
  {
    name: 'Gaming Chair',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800'
  },
  {
    name: 'RGB Chair',
    image: 'https://images.unsplash.com/photo-1616628182509-6c1c8dc3d5c0?w=800'
  },
  {
    name: 'Pro Gaming Chair',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'
  },
  {
    name: 'Executive Chair',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800'
  }
];

buyAgain: DashboardItem[] = [
  {
    name: 'Protein Powder',
    image: 'https://m.media-amazon.com/images/I/71L4JYf2N8L._SL1500_.jpg'
  },
  {
    name: 'Moisturizer',
    image: 'https://m.media-amazon.com/images/I/61cS4fMc5TL._SL1500_.jpg'
  },
  {
    name: 'Cleanser',
    image: 'https://m.media-amazon.com/images/I/61-Rz7q3xPL._SL1500_.jpg'
  },
  {
    name: 'Face Mask',
    image: 'https://m.media-amazon.com/images/I/71ODN1zM3AL._SL1500_.jpg'
  }
];

savedItems: DashboardItem[] = [
  {
    name: 'Monitor Stand',
    image: 'https://m.media-amazon.com/images/I/71P8g9gKjNL._SL1500_.jpg'
  },
  {
    name: 'Gaming Chair',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800'
  },
  {
    name: 'Running Shoes',
    image: 'https://m.media-amazon.com/images/I/71zkuNICJAL._UY1000_.jpg'
  },
  {
    name: 'Office Chair',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800'
  }
];

sponsoredProducts: DashboardItem[] = [
  {
    name: 'Mechanical Keyboard',
    image: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._SL1500_.jpg'
  },
  {
    name: 'Gaming Mouse',
    image: 'https://m.media-amazon.com/images/I/71mrcB4eVJL._SL1500_.jpg'
  },
  {
    name: 'Headphones',
    image: 'https://m.media-amazon.com/images/I/71bDMBs-kXL._SL1500_.jpg'
  },
  {
    name: 'RGB Setup',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800'
  }
];

}
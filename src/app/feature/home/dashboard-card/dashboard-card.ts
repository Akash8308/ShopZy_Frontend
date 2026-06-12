import { Component, Input } from '@angular/core';

export interface DashboardItem {
  name: string;
  image: string;
}

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.html',
  styleUrls: ['./dashboard-card.scss']
})
export class DashboardCardComponent {

  @Input() title = '';

  @Input() items: DashboardItem[] = [];

}
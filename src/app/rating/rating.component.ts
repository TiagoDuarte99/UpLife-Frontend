import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  ratingArr = [1, 2, 3, 4, 5];
  rating: number = 1;

  onClick(rating: number) {
    this.rating = rating;
  }
}

import { Component, OnInit } from '@angular/core';
import { MatsService } from '../services/mats.service';

@Component({
  selector: 'app-mats',
  templateUrl: './mats.component.html',
  styleUrls: ['./mats.component.scss'],
})
export class MatsComponent implements OnInit {
  mediaData;
  medianaData;
  modaData;

  options: {
    scales: {
      x: {
        ticks: {
          display: false;
        };
      };
      y: {
        ticks: {
          display: false;
        };
      };
    };
  };

  constructor(private matsService: MatsService) {}

  ngOnInit(): void {
    this.mediaData = this.matsService.getMedia();
    this.medianaData = this.matsService.getMediana();
    this.modaData = this.matsService.getModa();
  }
}

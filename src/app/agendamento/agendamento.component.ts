import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../models/schedule';
import { jwtDecode } from 'jwt-decode';
import { SchedulingService } from '../services/scheduling.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent {
  schedule: Schedule;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.schedule = this.route.snapshot.data['schedule'];
  }
}

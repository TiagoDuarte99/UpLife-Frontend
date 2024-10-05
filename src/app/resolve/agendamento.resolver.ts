import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { SchedulingService } from '../services/scheduling.service';
import { Observable, catchError } from 'rxjs';
import { Schedule } from '../models/schedule';

export const agendamentoResolver = (route) => {
  return inject(SchedulingService)
    .getScheduling(route.params['id'])
    .pipe(catchError((err) => inject(Router).navigate([''])));
};

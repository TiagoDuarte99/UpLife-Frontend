import { Component } from '@angular/core';
import { ScheduleFreelancerService } from '../services/scheduleFreelancer.service';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-horario-freelancer',
  templateUrl: './horario-freelancer.component.html',
  styleUrls: ['./horario-freelancer.component.scss']
})
export class HorarioFreelancerComponent {
  selectedDate: string;
  hours = [];
  selectedHourStart: string;
  selectedHourEnd: string;
  viewMode: string;
  noSchedule: boolean;

  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  selectedMonth: number;
  selectedYear: number;
  selectedDay: Date;

  months: { label: string; value: number }[];
  schedules: any[];


  editingMode: boolean = false;
  editingSchedule: {} = {};
  editingDate: string;
  editingHourStart: string;
  editingHourEnd: string;
  editingScheduleId: number;
  editingIndex: number | null = null;

  constructor(
    private scheduleFreelancerService: ScheduleFreelancerService,
    private snackBar: MatSnackBar) {
    this.generateHours();
    this.months = [
      { label: 'Janeiro', value: 1 },
      { label: 'Fevereiro', value: 2 },
      { label: 'Março', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Maio', value: 5 },
      { label: 'Junho', value: 6 },
      { label: 'Julho', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Setembro', value: 9 },
      { label: 'Outubro', value: 10 },
      { label: 'Novembro', value: 11 },
      { label: 'Dezembro', value: 12 },
    ];
  }

  ngOnInit(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    this.selectedMonth = currentMonth;
    const currentYear = currentDate.getFullYear();
    this.selectedYear = currentYear;
    this.onDateChange();
    this.viewMode = 'month'
  }

  generateHours() {
    for (let hour = 0; hour < 24; hour++) {
      const minutes = ['00', '15', '30', '45'];
      minutes.forEach((minute) => {
        this.hours.push({
          value: `${hour <= 9 ? `0${hour}` : hour}:${minute}:00`,
          viewValue: `${hour <= 9 ? `0${hour}` : hour}:${minute}:00`,
        });
      });
    }
  }

  addFreelancerSchedule() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const scheduleData = {
      freelancerId: freelancerId,
      date: this.selectedDate,
      startTime: this.selectedHourStart,
      endTime: this.selectedHourEnd,
    };

    this.scheduleFreelancerService.addFreelancerSchedule(scheduleData).subscribe({
      next: (response) => {
        this.message1 = 'Horário adicionado com sucesso';
        this.onDateChange();
        console.log('Horário do freelancer adicionado com sucesso:', response);
        this.isSuccess = true;
        this.isAlert = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Erro ao adicionar horário do freelancer:', error);
        if (error.status === 400) {
          this.alert1 = error.error.error;
          this.isSuccess = false;
          this.isAlert = true;
          this.isError = false;
        } else {
          this.isSuccess = false;
          this.isAlert = false;
          this.isError = true;
        };
      }
    }
    );
  }

  onViewModeChange(){
    this.selectedDay = null;
    this.onDateChange()
  }

  onDateChange() {
    console.log('Mês selecionado:', this.selectedMonth);
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    console.log(this.selectedDay);
    
    let filter: {
      freelancerId: any;
      month?: number;
      year?: number;
      day?: number;
      [key: string]: any;
    } = {
      freelancerId: freelancerId,
    };
    
    if (this.selectedDay !== undefined && this.selectedDay !== null) {
      // Se listPicker tiver um valor, usamos a data dele
      const selectedDate = this.selectedDay ? new Date(this.selectedDay) : null;
    
      if (selectedDate) {
        filter = {
          ...filter,
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        };
      }
    } else {
      // Se listPicker estiver vazio, usamos selectedMonth e selectedYear
      filter = {
        ...filter,
        month: this.selectedMonth,
        year: this.selectedYear,
      };
    }
    
    this.scheduleFreelancerService.getFreeSchedules(filter).subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.noSchedule = false;
          this.schedules = response;

        }else{
          this.noSchedule = true;
        }
      },
      error: (error) => {
        console.error('Erro ao adicionar horário do freelancer:', error);
        if (error.status === 400) {
          this.alert1 = error.error.error;
          this.isSuccess = false;
          this.isAlert = true;
          this.isError = false;
        } else {
          this.isSuccess = false;
          this.isAlert = false;
          this.isError = true;
        };
      }
    }
    );
  }

  editSchedule(schedule: any, index: number) {
    this.editingMode = true;
    this.editingSchedule = schedule;
    this.selectedDate = schedule.date;
    this.selectedHourStart = schedule.startTime;
    this.selectedHourEnd = schedule.endTime;
    this.editingIndex = index;
    this.editingScheduleId = schedule.id;
    console.log(schedule)
  }

  cancelEdit() {
    this.editingMode = false;
    this.editingSchedule = null;
    this.selectedDate = null;
    this.selectedHourStart = null;
    this.selectedHourEnd = null;
    this.editingIndex = null;
  }

  updateFreelancerSchedule() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const scheduleId = this.editingScheduleId
    const filter = {
      freelancerId, scheduleId
    }
    const newSchedule = {
      freelancerId: freelancerId,
      date: this.selectedDate,
      startTime: this.selectedHourStart,
      endTime: this.selectedHourEnd,
    }
    this.scheduleFreelancerService.updateFreelancerSchedule(filter, newSchedule).subscribe({
      next: (response) => {
        this.message1 = 'Horário editado com sucesso';
        this.cancelEdit()
        this.onDateChange()
        this.isSuccess = true;
        this.isAlert = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Erro ao adicionar horário do freelancer:', error);
        if (error.status === 400) {
          this.alert1 = error.error.error;
          this.isSuccess = false;
          this.isAlert = true;
          this.isError = false;
        } else {
          this.isSuccess = false;
          this.isAlert = false;
          this.isError = true;
        };
      }
    });
  }

  public exibirMensagem(schedule): void {
    const snackBarRef = this.snackBar.open("Tem a ceteza que pretende eliminar o agendamento?", "Eliminar", {
      duration: 6000
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteSchedule(schedule);
    });
  }

  deleteSchedule(schedule: any) {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const scheduleId = schedule.id;
    const filter = {
      freelancerId, scheduleId
    }
    this.scheduleFreelancerService.deleteFreelancerSchedule(filter).subscribe({
      next: (response) => {
        this.message1 = 'Horário removido com sucesso';
        this.onDateChange()
        this.isSuccess = true;
        this.isAlert = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Erro ao adicionar horário do freelancer:', error);
        if (error.status === 400) {
          this.alert1 = error.error.error;
          this.isSuccess = false;
          this.isAlert = true;
          this.isError = false;
        } else {
          this.isSuccess = false;
          this.isAlert = false;
          this.isError = true;
        };
      }
    });
  }




}

import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PeriodoAgendaComponent } from './components/periodo-agenda/periodo-agenda.component';
import { HorarioModel } from '../../../shared/models/horario.model';
import { AgendamentoDialogComponent } from './components/agendamento-dialog/agendamento-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    PeriodoAgendaComponent, 
    MatDatepickerModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selected: Date | null | undefined;


  constructor(private router: Router) {}

  horariosManha: HorarioModel[] = [
    { horario: '08:30' },
    { horario: '09:30' },
    { horario: '10:30' },
    { horario: '11:30' }
    
  ];
  horariosTarde: HorarioModel[] = [
    { horario: '13:30' },
    { horario: '14:30' },
    { horario: '16:00' },
    { horario: '17:30' }

  ];
  horariosNoite: HorarioModel[] = [
    { horario: '18:30' },
    { horario: '19:30' },
    { horario: '21:00' }

  ];

  openDialog(): void {
    this.router.navigate(['agendamento'], {queryParams: {ag: 123}})
  }
  
}

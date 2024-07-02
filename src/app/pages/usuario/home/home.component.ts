import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AgendamentoService } from '../../../services/agendamento.service';
import { HorariosSemanaModel } from '../../../shared/models/horarios-semana-model';
import { AgendamentoModel } from '../../../shared/models/agendamento.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    PeriodoAgendaComponent,
    MatDatepickerModule,
    MatCardModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selected: Date | null | undefined;
  loading = false;
  horariosSemana!: HorariosSemanaModel;

  constructor(private router: Router, private agendamentoService: AgendamentoService) {

  }

  ngOnInit(): void {
    this.buscarHorarioDaSemana();
  }

  selecionarHorario(agendamento: AgendamentoModel): void {
    this.router.navigate(['agendamento'], { queryParams: { ag: agendamento.id } })
  }

  buscarHorarioDaSemana(dataInicial?: string) {
    this.loading = true;
    if (dataInicial === undefined) {
      this.agendamentoService.buscarAgendamentosDaSemana().subscribe(
        response => { this.horariosSemana = response; this.loading = false; }
      );
    }else{
      this.agendamentoService.buscarAgendamentosDaSemana(dataInicial).subscribe(
        response => { this.horariosSemana = response; this.loading = false; }
      );
    }

  }

}

import { Component, inject, model, OnInit } from '@angular/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
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
import { DialogPlanosComponent } from './components/dialog-planos/dialog-planos.component';
import { CalendarioComponent } from "./components/calendario/calendario.component";
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import moment, { Moment } from 'moment';

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
    MatProgressBarModule,
    CalendarioComponent, CalendarioComponent
],
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  //selected: Date | null | undefined;
  selected = model<Date | null>(null);
  loading = false;
  horariosSemana!: HorariosSemanaModel;

  readonly date = new FormControl(moment());
  
  constructor(private router: Router, private agendamentoService: AgendamentoService) {

  }

  ngOnInit(): void {
    this.buscarHorarioDaSemana();
    localStorage.clear();
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

  openDialogCadastrarHorario() {
    const dialogRef = this.dialog.open(DialogPlanosComponent, {
      data: { },
      disableClose: false,
      width: '300px'
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

}

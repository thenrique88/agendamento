import { Component, Input } from '@angular/core';
import { HorarioModel } from '../../../../../shared/models/horario.model';
import {
  MatDialog
} from '@angular/material/dialog';
import { AgendamentoDialogComponent } from '../agendamento-dialog/agendamento-dialog.component';

@Component({
  selector: 'app-periodo-agenda',
  standalone: true,
  imports: [],
  templateUrl: './periodo-agenda.component.html',
  styleUrl: './periodo-agenda.component.scss'
})
export class PeriodoAgendaComponent {
@Input() descricao: string = '';
@Input() horarios: HorarioModel[] = [];

constructor(public dialog: MatDialog) {}


openDialog(): void {
  const dialogRef = this.dialog.open(AgendamentoDialogComponent, {
    data: {name: '', animal: ''},
    width: '50%',
    height: '300px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}

}

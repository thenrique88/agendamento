import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HorarioModel } from '../../../../shared/models/horario.model';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { AgendamentoService } from '../../../../services/agendamento.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-dialog-cadastrar-horario',
  standalone: true,
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
    MatDatepickerModule
  ],
  templateUrl: './dialog-cadastrar-horario.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './dialog-cadastrar-horario.component.scss'
})
export class DialogCadastrarHorarioComponent {

  horario: string;
  tempoAtendimento: string;
  dia: Date;

  constructor(private toastrService: ToastrService, private agendamentoService: AgendamentoService) {
    this.horario = '';
    this.tempoAtendimento = '90';
    this.dia = new Date();
  }

  selected = model<Date | null>(null);
  readonly dialogRef = inject(MatDialogRef<DialogCadastrarHorarioComponent>);
  readonly data = inject<HorarioModel>(MAT_DIALOG_DATA);

  cadastrarHorario() {
    let valido = true;

    if (this.dia === null) {
      valido = false;
      this.toastrService.error('Selecione uma data válida.');
    }

    if (this.horario === '' || this.horario.length < 4) {
      valido = false;
      this.toastrService.error('Digite um horário válido');
    }

    if (this.tempoAtendimento === null) {
      valido = false;
      this.toastrService.error('Digite um tempo de atendimento (em minutos)');
    }


    if (valido) {

      this.agendamentoService.cadastrarHorarioDisponivel({
        horario: this.horario,
        tempoAtendimento: this.tempoAtendimento.toString(),
        data: format(this.dia, 'yyyy/MM/dd')
      }).subscribe(r => {
        if (r.sucesso) {
          this.toastrService.success('Horário cadastrado com sucesso.');
          this.dialogRef.close(true);
        }
        else{
          r.erros.forEach(f => this.toastrService.error(f));
        }
      })


    }
  }


}

import { Component, inject, model, OnInit } from '@angular/core';
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
import { AgendamentoModel } from '../../../../shared/models/agendamento.model';

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
export class DialogCadastrarHorarioComponent implements OnInit {

  horario: string;
  tempoAtendimento: string;
  dia: Date;

  horarios: HorarioModel[] = [];
  contHorarios = 0;

  constructor(private toastrService: ToastrService, private agendamentoService: AgendamentoService) {
    this.horario = '';
    this.tempoAtendimento = '80';
    this.dia = new Date();


  }
  ngOnInit(): void {
    this.inclurNovoHorario();
  }

  inclurNovoHorario() {
    this.horarios.push({
      id: this.contHorarios,
      tempoAtendimento: '80',
      data: '',
      horario: ''
    });

    this.contHorarios++;

  }

  excluirHorario(index: number) {
    const novosHorarios = this.horarios.filter(f => f.id !== index);
    this.horarios = novosHorarios;

    if (this.horarios.length === 0)
      this.inclurNovoHorario();
  }

  selected = model<Date | null>(null);
  readonly dialogRef = inject(MatDialogRef<DialogCadastrarHorarioComponent>);
  readonly data = inject<HorarioModel>(MAT_DIALOG_DATA);


  validarHorarios() {
    this.horarios.forEach(f => {
      if (f.horario === '' || f.data === '' || f.tempoAtendimento === '') {
        this.toastrService.error('Existem horários incompletos.');
        return;
      }
      else {
        this.cadastrarHorarios();
      }
    });
  }

  cadastrarHorarios() {

    this.horarios.forEach(h => {

      let valido = true;
      if (h.data === null) {
        valido = false;
      }

      if (!h.horario || h.horario.length < 3) {
        valido = false;
      }

      if (h.tempoAtendimento === null) {
        valido = false;
      }

      if (!valido) {
        this.toastrService.error(`Horário: ${h.data} - ${h.horario} - Não cadastrado.`)
      }
      else {
        const dataAtendimento = h.data.slice(4) + '/' + h.data.slice(2, 4) + '/' + h.data.slice(0, 2);
        this.agendamentoService.cadastrarHorarioDisponivel({
          id: 1,
          horario: h.horario,
          tempoAtendimento: h.tempoAtendimento.toString(),
          data: format(dataAtendimento, 'yyyy/MM/dd')
        }).subscribe(r => {
          if (r.sucesso) {
            this.toastrService.success(`Horário: ${h.data} - ${h.horario} - cadastrado`);
          }
          else {
            r.erros.forEach(f => this.toastrService.error(`Horário: ${h.data} - ${h.horario} - ${f}`));
          }
        })
      }

    });

    this.horarios = [];
    this.dialogRef.close(true);

  }

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
        id: 1,
        horario: this.horario,
        tempoAtendimento: this.tempoAtendimento.toString(),
        data: format(this.dia, 'yyyy/MM/dd')
      }).subscribe(r => {
        if (r.sucesso) {
          this.toastrService.success('Horário cadastrado com sucesso.');
          this.dialogRef.close(true);
        }
        else {
          r.erros.forEach(f => this.toastrService.error(f));
        }
      })


    }
  }


}

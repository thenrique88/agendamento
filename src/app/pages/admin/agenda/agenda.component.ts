import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../../../services/agendamento.service';
import { FormsModule } from '@angular/forms';
import { AgendamentoModel } from '../../../shared/models/agendamento.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogCadastrarHorarioComponent } from './dialog-cadastrar-horario/dialog-cadastrar-horario.component';
import { HorarioModel } from '../../../shared/models/horario.model';
import { DialogConfirmacaoComponent } from '../../../shared/components/dialog-confirmacao/dialog-confirmacao.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {

  meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  mesSelecionado: number;
  agendamentos: AgendamentoModel[] = [];

  readonly dialog = inject(MatDialog);
  
  
  
  constructor(private agendamentoService: AgendamentoService, private toastrService: ToastrService){
    const dataAtual = new Date();
    this.mesSelecionado = dataAtual.getMonth(); 
  }

  ngOnInit(): void {
    this.buscarAgendamento(this.mesSelecionado);
  }

  onMesChange(): void {
    this.buscarAgendamento(this.mesSelecionado);
  }

  buscarAgendamento(mes: number): void {
    this.agendamentoService.buscarAgendamentosDoMes(this.mesSelecionado)
    .subscribe(r => {
      if(r.sucesso){
        this.agendamentos = r.data;
      }
      else{
        this.agendamentos = [];
      }
    });
  }

  cadastrarNovoHorario(){

  }

  openDialogCadastrarHorario(){
    const dialogRef = this.dialog.open(DialogCadastrarHorarioComponent, {
      data: {name: '', animal: ''},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.buscarAgendamento(this.mesSelecionado);
      }
    });
  }

  cancelarAtendimento(agendamento: AgendamentoModel){
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      data: `Cancelar o atendimento de <b>${agendamento.nomeCliente}</b>?`,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.agendamentoService.cancelarAgendamento(agendamento.id!).subscribe(r =>{
          if(r.sucesso){
            this.toastrService.success('Atendimento cancelado com sucesso.');
            this.buscarAgendamento(this.mesSelecionado);
          }
          else{
            this.toastrService.success('Erro ao cancelar o Atendimento');
          }
        });
      }
    });
  }

  confirmarAtendimento(agendamento: AgendamentoModel){
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      data: `Confirmar o atendimento de <b>${agendamento.nomeCliente}</b>?`,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.agendamentoService.confirmarAgendamento(agendamento.id!).subscribe(r =>{
          if(r.sucesso){
            this.toastrService.success('Atendimento confirmado com sucesso.');
            this.buscarAgendamento(this.mesSelecionado);
          }
          else{
            this.toastrService.success('Erro ao confirmar o Atendimento');
          }
        });
      }
    });
  }
}

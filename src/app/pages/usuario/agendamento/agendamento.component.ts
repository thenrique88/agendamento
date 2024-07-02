import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AgendamentoService } from '../../../services/agendamento.service';
import { ActivatedRoute } from '@angular/router';
import { AgendamentoModel } from '../../../shared/models/agendamento.model';
import { ClienteService } from '../../../services/cliente.service';
import { LoginClienteModel } from '../../../shared/models/login-cliente.model';
import { ClienteModel } from '../../../shared/models/cliente.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.scss'
})
export class AgendamentoComponent implements OnInit {

  formDados: FormGroup;
  formCodigo: FormGroup;

  cliente!: ClienteModel;
  idAgendamento = '';
  agendamento: AgendamentoModel = {};

  loading = false;
  exibirFormLogin = true;
  exibirFormCodigoConfirmacao = false;
  exibirFormDadosCliente = false;
  exibirAgendamentoConfirmado = false;
  exibirMensagemConfirmacaoWhatsapp = false;
  desabilitarBotaoReenviarCodigo = false;
  

  constructor(private route: ActivatedRoute, private toastrService: ToastrService, private formBuilder: FormBuilder, private agendamentoService: AgendamentoService, private clienteService: ClienteService) {

    this.formDados = formBuilder.group({
      nome: ['', Validators.required],
      whatsapp: ['', Validators.required]
    });

    this.formCodigo = formBuilder.group({
      codigo: ['', Validators.required]
    });

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idAgendamento = params['ag'];
    });

    this.buscarDadosAgendamento(this.idAgendamento);
    this.validarClienteLogado();
  }

  buscarDadosAgendamento(id: string) {
    this.agendamentoService.buscarAgendamento(id)
      .subscribe(result => {
        this.agendamento = result.data;
        if(this.agendamento.status === 'agendado'){
          this.exibirAgendamentoConfirmado = true;
          this.exibirFormCodigoConfirmacao = false;
          this.exibirFormDadosCliente = false;
          this.exibirFormLogin = false;
        }
      });

      
  }

  submitDados(): void {
    if (this.formDados.valid) {

      const dadosCliente : LoginClienteModel = {
        nome: this.formDados.get('nome')?.value,
        whatsapp: this.formDados.get('whatsapp')?.value
      };

      this.clienteService.enviarCodigoConfirmacaoLogin(dadosCliente)
      .subscribe(r =>{
        if(r.sucesso){
          this.exibirFormLogin = false;
          this.exibirFormCodigoConfirmacao = true;
          this.setarClienteLogado(r.data);
          this.cliente = r.data;
        }
        else{

        }
      });
    }
    else {
    }
  }

  reenviarCodigoConfirmacao(){
    const dadosCliente : LoginClienteModel = {
      nome: this.cliente.nome,
      whatsapp: this.cliente.whatsapp
    };

    this.clienteService.reenviarCodigoConfirmacaoLogin(dadosCliente)
      .subscribe(r =>{
        if(r.sucesso){
          this.toastrService.success('Código reenviado para seu Whatsapp.');
          this.desabilitarBotaoReenviarCodigo = true;
          setTimeout(() => {
            this.desabilitarBotaoReenviarCodigo = false;
          }, 30000);
        }
        else{

        }
      });
  }

  submitCodigo(): void {
    if (this.formCodigo.valid) {

      this.clienteService.confirmarCodigoLoginCliente(this.cliente.id, this.formCodigo.get('codigo')?.value)
      .subscribe(r =>{
        if(r.sucesso){
          this.exibirFormLogin = false;
          this.exibirFormCodigoConfirmacao = false;
          this.exibirFormDadosCliente = true;
        }
        else{
          this.toastrService.error('Código incorreto.');
        }
      });
    }
    else {
    }
  }

  validarClienteLogado(){
    if(localStorage.getItem('cliente') !== null){
      
      let cliente: ClienteModel = JSON.parse(localStorage.getItem('cliente')!);
      this.setarClienteLogado(cliente);
      this.cliente = cliente;
      this.exibirFormLogin = false;
      this.exibirFormCodigoConfirmacao = false;
      this.exibirFormDadosCliente = true;

    }
  }

  setarClienteLogado(cliente: ClienteModel ){
    localStorage.removeItem('cliente');
    localStorage.setItem('cliente', JSON.stringify(cliente));
  }

  confirmarAgendamento(){
    this.agendamentoService.agendarAtendimento(this.cliente.id, this.idAgendamento)
    .subscribe(r =>{
      if(r.sucesso){
        this.exibirFormDadosCliente = false;
        this.exibirAgendamentoConfirmado = true;
        this.exibirMensagemConfirmacaoWhatsapp = false;
      }
      else{
        alert('Tem erro');
      }
    });
  }

  preencherDadosCliente(){

  }

  voltarPagina() {
    history.back();
  }

}

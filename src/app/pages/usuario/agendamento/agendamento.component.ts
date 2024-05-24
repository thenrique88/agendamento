import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

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
export class AgendamentoComponent {

  loading = false;
  showForm = true;
  formDados: FormGroup;
  formCodigo = FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formDados = formBuilder.group({
      nome: ['', Validators.required],
      whatsapp: ['', Validators.required]
    });
  }

  submitDados(): void{
    if(this.formDados.valid){
      this.showForm = false;
      alert('valido');
    }
    else{
    }
  }

  voltarPagina(){
    history.back();
  }

}

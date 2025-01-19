import { Component } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-descricao-profissional',
  standalone: true,
  imports: [],
  templateUrl: './descricao-profissional.component.html',
  styleUrl: './descricao-profissional.component.scss'
})
export class DescricaoProfissionalComponent {
  profissional = '';

  constructor(){
    this.profissional = environment.profissional;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HorariosSemanaModel } from '../shared/models/horarios-semana-model';
import { AgendamentoModel } from '../shared/models/agendamento.model';
import { ResponseModel } from '../shared/models/response.model';

@Injectable({
  providedIn: 'root'
})

export class AgendamentoService {

  private urlApi = environment.apiUrl + '/agendamento';

  constructor(private http: HttpClient) { }

  buscarAgendamento(id: string) {
    return this.http.get<ResponseModel<AgendamentoModel>>(`${this.urlApi}?id=${id}`);
  }

  buscarAgendamentosDaSemana(dataInicial?: string): Observable<HorariosSemanaModel> {
    if (dataInicial === undefined)
      return this.http.get<HorariosSemanaModel>(`${this.urlApi}/horarios/semana`);
    else
      return this.http.get<HorariosSemanaModel>(`${this.urlApi}/horarios/semana?data=${dataInicial}`);
  }

  confirmarAgendamento(idCliente: string, idAgendamento: string){
    return this.http.post<ResponseModel<boolean>>(`${this.urlApi}/${idAgendamento}/confirmar/cliente/${idCliente}`, null)
  }
}

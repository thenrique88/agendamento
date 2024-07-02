import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HorariosSemanaModel } from '../shared/models/horarios-semana-model';
import { AgendamentoModel } from '../shared/models/agendamento.model';
import { ResponseModel } from '../shared/models/response.model';
import { HorarioModel } from '../shared/models/horario.model';

@Injectable({
  providedIn: 'root'
})

export class AgendamentoService {

  private urlApi = environment.apiUrl + '/agendamento';

  constructor(private http: HttpClient) { }


  cadastrarHorarioDisponivel(request: HorarioModel){
    return this.http.post<ResponseModel<string>>(`${this.urlApi}`, request, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})});
  };

  buscarAgendamento(id: string) {

    const header = {
      'ngrok-skip-browser-warning': '69420'
    };
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(header), 
    };

    return this.http.get<ResponseModel<AgendamentoModel>>(`${this.urlApi}?id=${id}`, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})});
  }

  buscarAgendamentosDaSemana(dataInicial?: string): Observable<HorariosSemanaModel> {
    if (dataInicial === undefined)
      return this.http.get<HorariosSemanaModel>(`${this.urlApi}/horarios/semana`, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})});
    else
      return this.http.get<HorariosSemanaModel>(`${this.urlApi}/horarios/semana?data=${dataInicial}`, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})});
  }

  buscarAgendamentosDoMes(mes: number){
    return this.http.get<ResponseModel<AgendamentoModel[]>>(`${this.urlApi}/mes/${mes}`, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})})
  }

  agendarAtendimento(idCliente: string, idAgendamento: string){
    return this.http.post<ResponseModel<boolean>>(`${this.urlApi}/${idAgendamento}/agendar/cliente/${idCliente}`, null, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})})
  }

  cancelarAgendamento(idAgendamento: string){
    return this.http.post<ResponseModel<boolean>>(`${this.urlApi}/${idAgendamento}/cancelar`, null, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})})
  }

  confirmarAgendamento(idAgendamento: string){
    return this.http.post<ResponseModel<boolean>>(`${this.urlApi}/${idAgendamento}/confirmar`, null, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})})
  }
}

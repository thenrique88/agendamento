import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginClienteModel } from '../shared/models/login-cliente.model';
import { ResponseModel } from '../shared/models/response.model';
import { ClienteModel } from '../shared/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlApi = environment.apiUrl + '/cliente';

  constructor(private http: HttpClient) { }

  enviarCodigoConfirmacaoLogin(request: LoginClienteModel){
    return this.http.post<ResponseModel<ClienteModel>>(`${this.urlApi}/login/codigo/confirmacao`, request, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})});
  }

  confirmarCodigoLoginCliente(idCliente: string, codigo: string){
    return this.http.post<ResponseModel<boolean>>(`${this.urlApi}/${idCliente}/confirmar/codigo/${codigo}`, null, {headers: new HttpHeaders({'ngrok-skip-browser-warning': '69420'})});
  }
}

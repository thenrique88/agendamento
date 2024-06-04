import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class HttpRequestInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // Erro do lado do cliente
              errorMessage = `Erro: ${error.error.message}`;
            } else {
              // Erro do lado do servidor
              errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
            }
            // Aqui você pode adicionar lógica para exibir o erro, por exemplo, usando um serviço de notificação
            console.error(errorMessage);
            return throwError(errorMessage);
          })
        );
      }
}
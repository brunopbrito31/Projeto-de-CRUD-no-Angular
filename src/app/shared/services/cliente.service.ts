import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://60afe4991f26610017ffd79f.mockapi.io/api/v1/clientes';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos os cliente
  getClientes(): Observable<Cliente[]> {
    return this.httpClient
      .get<Cliente[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Obtem um cliente pelo id
  getClienteById(id: number): Observable<Cliente> {
    return this.httpClient
      .get<Cliente>(this.url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  // salva um cliente
  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient
      .post<Cliente>(this.url, JSON.stringify(cliente), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // atualiza um cliente
  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient
      .put<Cliente>(
        this.url + '/' + cliente.Id,
        JSON.stringify(cliente),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleta um cliente
  deleteCliente(cliente: Cliente) {
    return this.httpClient
      .delete<Cliente>(this.url + '/' + cliente.Id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Cep } from "src/app/models/cep";

@Injectable({
  providedIn: "root",
})
export class CepService {
  url = "viacep.com.br/ws/";
  urlEnd = "/json/";

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  // Obtem um endereço pelo cep
  getCep(cepProcurado: string): Observable<Cep> {
    return this.httpClient
      .get<Cep>("https://viacep.com.br/ws/" + cepProcurado +"/json/")
      .pipe(retry(2), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
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

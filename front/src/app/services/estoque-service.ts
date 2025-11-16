import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estoque } from '../model/Estoque';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/estoque'
  
  constructor(private http: HttpClient) {}

  update(atualizarEstoque: Estoque): Observable<Estoque> {
    return this.http.put<Estoque>(`${this.apiUrl}/atualizar`, atualizarEstoque).pipe(catchError(this.handleError));
  }

  private handleError(error: any){
    return throwError(() => new Error('Erro ao consultar a API de produto.'))
  }
}

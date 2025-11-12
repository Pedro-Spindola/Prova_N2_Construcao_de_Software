import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/cliente'
  private clientes: Cliente[] = [];

  constructor(private http: HttpClient) {}
  
  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/buscartodosCliente`).pipe(catchError(this.handleError));
  }

  findById(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(novoCliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/salvar`, novoCliente).pipe(catchError(this.handleError));
  }

  update(atualizarCliente: Cliente, id: number): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/atualizar/${id}`, atualizarCliente).pipe(catchError(this.handleError));
  }

  obterClientes(): Cliente[]{
    return this.clientes;
  }

  adicionarClientes(cliente: Cliente[]): void{
    this.clientes = cliente;
  }

  private handleError(error: any){
    return throwError(() => new Error('Erro ao consultar a API de cliente.'))
  }
}

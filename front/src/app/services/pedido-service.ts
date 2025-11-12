import { Injectable } from '@angular/core';
import { Pedido } from '../model/Pedido';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/pedido'
  private pedidos: Pedido[] = [];

  constructor(private http: HttpClient) {}
  
  findAll(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  create(novoPedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/salvar`, novoPedido).pipe(catchError(this.handleError));
  }

  update(atualizarPedido: Pedido, id: number): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, atualizarPedido).pipe(catchError(this.handleError));
  }
  
  obterPedido(): Pedido[]{
    return this.pedidos;
  }

  adicionarPedido(pedido: Pedido[]): void{
    this.pedidos = pedido;
  }

  private handleError(error: any){
    return throwError(() => new Error('Erro ao consultar a API de pedido.'))
  }
}

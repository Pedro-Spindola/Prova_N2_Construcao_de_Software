import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/produto'
  private produtos: Produto[] = [];

  constructor(private http: HttpClient) {}
  
  findAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  create(novoProduto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, novoProduto).pipe(catchError(this.handleError));
  }

  update(atualizarProduto: Produto, id: number): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, atualizarProduto).pipe(catchError(this.handleError));
  }
  
  obterProduto(): Produto[]{
    return this.produtos;
  }

  adicionarProduto(produto: Produto[]): void{
    this.produtos = produto;
  }

  private handleError(error: any){
    return throwError(() => new Error('Erro ao consultar a API de produto.'))
  }
}

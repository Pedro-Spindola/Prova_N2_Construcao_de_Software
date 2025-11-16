import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Caixa {
  id: number;
  carteira: number; // ou BigDecimal, mas aqui usamos number
}

@Injectable({
  providedIn: 'root',
})
export class CaixaService {
  private baseUrl = 'http://localhost:8080/api/v1/caixa'; // ajuste para seu backend

  constructor(private http: HttpClient) { }

  // Obter caixa pelo ID
  getCaixa(id: number): Observable<Caixa> {
    return this.http.get<Caixa>(`${this.baseUrl}/${id}`);
  }

  // Atualizar carteira
  atualizarCarteira(id: number, novoValor: number): Observable<Caixa> {
    return this.http.put<Caixa>(`${this.baseUrl}/${id}/atualizar`, novoValor);
  }

  // Acrescentar valor
  acrescentarValor(id: number, valor: number): Observable<Caixa> {
    return this.http.put<Caixa>(`${this.baseUrl}/${id}/acrescentar`, valor);
  }
}

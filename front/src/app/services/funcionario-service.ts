import { Injectable } from '@angular/core';
import { Funcionario } from '../model/Funcionario';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/funcionario'
  private funcionarios: Funcionario[] = [];

  constructor(private http: HttpClient) {}
  
  findAll(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  create(novoFuncionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, novoFuncionario).pipe(catchError(this.handleError));
  }

  update(atualizarFuncionario: Funcionario, id: number): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, atualizarFuncionario).pipe(catchError(this.handleError));
  }
  
  obterFuncionario(): Funcionario[]{
    return this.funcionarios;
  }

  adicionarFuncionario(funcionario: Funcionario[]): void{
    this.funcionarios = funcionario;
  }

  private handleError(error: any){
    return throwError(() => new Error('Erro ao consultar a API de funcionario.'))
  }
}

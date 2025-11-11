import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../model/Funcionario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/v1/usuario';
  
  // Chave para o LocalStorage
  private readonly CHAVE_USUARIO = 'usuarioLogado';

 constructor(private http: HttpClient) {}

 // Login (Seu método original)
 login(credencial: { email: string; senha: string }): Observable<Funcionario> {
    // Esperamos que o retorno seja um 'Funcionario'
  return this.http.post<Funcionario>(`${this.baseUrl}/login`, credencial);
 }

  // --- NOVOS MÉTODOS ---

  /**
   * Salva o funcionário logado no LocalStorage.
   */
  salvarUsuarioLogado(funcionario: Funcionario): void {
    // Convertemos o objeto JSON para string para salvar
    localStorage.setItem(this.CHAVE_USUARIO, JSON.stringify(funcionario));
  }

  /**
   * Remove o funcionário do LocalStorage (Logout).
   */
  logout(): void {
    localStorage.removeItem(this.CHAVE_USUARIO);
  }

  /**
   * (Bônus) Pega o funcionário logado do LocalStorage.
   */
  getUsuarioLogado(): Funcionario | null {
    const usuarioStr = localStorage.getItem(this.CHAVE_USUARIO);
    if (usuarioStr) {
      return JSON.parse(usuarioStr) as Funcionario;
    }
    return null;
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth-service';
import { Credencial } from '../../model/Credencial';
import { Funcionario } from '../../model/Funcionario';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  credencial: Credencial = { email: '', senha: '' }; 
  errorMessage: string = '';

  constructor(private authService: LoginService, private router: Router) {}

  login() {
    // A verificação agora funciona sem o '?'
    if (!this.credencial.email || !this.credencial.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos...';
      return;
    }
    
    this.errorMessage = ''; // Limpa o erro
    
    this.authService.login(this.credencial).subscribe({
        next: (funcionarioLogado: Funcionario) => {
          // SUCESSO! O back-end retornou o funcionário
          console.log('Login bem-sucedido', funcionarioLogado);
          
          // MUDANÇA: Salva o usuário no LocalStorage
          this.authService.salvarUsuarioLogado(funcionarioLogado);
          
          this.router.navigate(['']); // Navega para a home
        },
        error: (err) => {
          // FALHA! O back-end retornou um erro (ex: 401 Não Autorizado)
          console.error('Erro na requisição:', err);
          
          if (err.status === 401 || err.status === 403) {
            this.errorMessage = 'Usuário ou senha inválidos';
          } else {
            this.errorMessage = 'Erro ao tentar fazer login. Tente novamente.';
          }
        }
      });
  }
}

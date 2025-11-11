import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth-service';
import { Funcionario } from '../../model/Funcionario';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  userName: string = '';
  valorCaixa: number = 0;
  funcionario: Funcionario | null = null;

  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(): void {
    // Busca o usuário do LocalStorage
    this.funcionario = this.authService.getUsuarioLogado();

    if (this.funcionario) {
      this.userName = this.funcionario.nome;
      // Depois buscar o valor real do caixa e colocar aqui.
      this.valorCaixa = 1250.75;
    }
  }

  // 5. Método de logout completo
  logout() {
    console.log('Usuário saiu do sistema');
    this.authService.logout(); // Limpa o LocalStorage
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }
}

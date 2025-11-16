import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth-service';
import { Funcionario } from '../../model/Funcionario';
import { Caixa, CaixaService } from '../../services/caixa-service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  userName: string = '';
  valorCaixa: number = 0;
  caixa: Caixa | null = null;;
  funcionario: Funcionario | null = null;

  constructor(private authService: LoginService, private router: Router, private caixaServices: CaixaService) {}

  ngOnInit(): void {
  // Busca o usuário do LocalStorage
  this.funcionario = this.authService.getUsuarioLogado();

  if (this.funcionario) {
    this.userName = this.funcionario.nome;
  }

  // Buscar valor real do caixa
  this.caixaServices.getCaixa(1).subscribe({
    next: (caixa) => {
      this.caixa = caixa;       // agora é do tipo Caixa
      this.valorCaixa = caixa.carteira; // acessa normalmente
    },
    error: (err) => {
      console.error('Erro ao buscar caixa', err);
    }
  });
}


  // 5. Método de logout completo
  logout() {
    console.log('Usuário saiu do sistema');
    this.authService.logout(); // Limpa o LocalStorage
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Funcionario } from '../../model/Funcionario';
import { Router } from '@angular/router';
import { PerfilUsuario } from '../../model/enums/PerfilUsuario';
import { StatusUsuario } from '../../model/enums/StatusUsuario';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { FuncionarioService } from '../../services/funcionario-service';

@Component({
  selector: 'app-funcionario',
  imports: [CommonModule, ReactiveFormsModule, NavBar],
  templateUrl: './funcionario.page.html',
  styleUrl: './funcionario.page.scss',
})
export class FuncionarioPage {
  private funcionariosTodos: Funcionario[] = [];
  funcionarioFiltrados: Funcionario[] = [];
  isLoading = false;
  filtroForm: FormGroup;

  // Opções para os <select>
  statusOptions = Object.values(StatusUsuario);
  perfilOptions = Object.values(PerfilUsuario);
  
  // Enums para usar no HTML
  StatusUsuario = StatusUsuario;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private funcionarioService: FuncionarioService
    // private funcionarioService: FuncionarioService // Injete seu serviço
  ) {
    // Inicializa o formulário de filtro
    this.filtroForm = this.fb.group({
      nome: [''],
      email: [''],
      perfil: [null],
      status: [null] 
    });
  }

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.isLoading = true;
    
    this.funcionarioService.findAll().subscribe({
      next: (dadosApi) => {
        this.funcionariosTodos = dadosApi; 
        this.funcionarioFiltrados = dadosApi; 
        this.funcionarioService.adicionarFuncionario(dadosApi);
        console.log('Funcionario carregado com sucesso: ', this.funcionarioFiltrados);

        this.isLoading = false; 
      },
      error: (erro) => {
        console.error('Falha ao carregar a lista de funcionario.', erro);
        this.isLoading = false; 
      }
    });
  }

  /**
 * Filtra a lista de funcionários (no frontend) com base 
 * nos campos do formulário.
 */
  filtrar(): void {
    // 1. Pega os valores do formulário
    const filtros = this.filtroForm.value;
    
    // 2. Começa com a lista mestre completa
    let listaFiltrada = this.funcionariosTodos;

    // 3. Aplica filtro de NOME (parcial, case-insensitive)
    if (filtros.nome) {
      const nomeFiltro = filtros.nome.toLowerCase();
      listaFiltrada = listaFiltrada.filter(funcionario => 
        funcionario.nome.toLowerCase().includes(nomeFiltro)
      );
    }

    // 4. Aplica filtro de EMAIL (parcial, case-insensitive)
    if (filtros.email) {
      const emailFiltro = filtros.email.toLowerCase();
      listaFiltrada = listaFiltrada.filter(funcionario => 
        funcionario.email.toLowerCase().includes(emailFiltro)
      );
    }

    // 5. Aplica filtro de PERFIL (exato)
    if (filtros.perfil) {
      listaFiltrada = listaFiltrada.filter(funcionario => 
        funcionario.perfil === filtros.perfil
      );
    }

    // 6. Aplica filtro de STATUS (exato)
    if (filtros.status) {
      listaFiltrada = listaFiltrada.filter(funcionario => 
        funcionario.status === filtros.status
      );
    }

    // 7. Atualiza a lista exibida na tela
    this.funcionarioFiltrados = listaFiltrada;
  }

  /**
   * Limpa os campos do formulário e restaura a lista
   * para mostrar todos os funcionários (sem chamar a API).
   */
  limparFiltros(): void {
    this.filtroForm.reset();
    this.funcionarioFiltrados = this.funcionariosTodos;
  }

  novoFuncionario(): void {
    this.router.navigateByUrl('/gerenciarFuncionario');
  }

  editarFuncionario(id: number): void {
    this.router.navigateByUrl(`/gerenciarFuncionario/${id}`);
  }
}

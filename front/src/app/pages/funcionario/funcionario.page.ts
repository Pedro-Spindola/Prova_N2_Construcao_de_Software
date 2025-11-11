import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Funcionario } from '../../model/Funcionario';
import { Router } from '@angular/router';
import { PerfilUsuario } from '../../model/enums/PerfilUsuario';
import { StatusUsuario } from '../../model/enums/StatusUsuario';
import { NavBar } from "../../components/nav-bar/nav-bar";

@Component({
  selector: 'app-funcionario',
  imports: [CommonModule, ReactiveFormsModule, NavBar],
  templateUrl: './funcionario.page.html',
  styleUrl: './funcionario.page.scss',
})
export class FuncionarioPage {
  funcionarios: Funcionario[] = [];
  isLoading = false;
  filtroForm: FormGroup;

  // Opções para os <select>
  statusOptions = Object.values(StatusUsuario);
  perfilOptions = Object.values(PerfilUsuario);
  
  // Enums para usar no HTML
  StatusUsuario = StatusUsuario;

  constructor(
    private fb: FormBuilder,
    private router: Router
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
    const filtros = this.filtroForm.value;
    console.log('Buscando funcionários com filtros:', filtros);

    // --- SIMULAÇÃO DE API ---
    setTimeout(() => {
      const mockFuncionarios: Funcionario[] = [
        {
          id: 1,
          nome: 'Admin do Sistema',
          email: 'admin@email.com',
          senha: '', // Senha nunca deve vir do back-end
          perfil: PerfilUsuario.ADMIN,
          status: this.StatusUsuario.ATIVO
        },
        {
          id: 2,
          nome: 'Operador Exemplo',
          email: 'operador@email.com',
          senha: '',
          perfil: PerfilUsuario.OPERADOR,
          status: this.StatusUsuario.ATIVO
        },
        {
          id: 3,
          nome: 'Supervisor Inativo',
          email: 'inativo@email.com',
          senha: '',
          perfil: PerfilUsuario.SUPERVISOR,
          status: this.StatusUsuario.INATIVO
        }
      ];

      // Simula o filtro
      this.funcionarios = mockFuncionarios.filter(f => {
        const filtroNome = !filtros.nome || f.nome.toLowerCase().includes(filtros.nome.toLowerCase());
        const filtroEmail = !filtros.email || f.email.toLowerCase().includes(filtros.email.toLowerCase());
        const filtroPerfil = !filtros.perfil || f.perfil === filtros.perfil;
        const filtroStatus = !filtros.status || f.status === filtros.status;
        return filtroNome && filtroEmail && filtroPerfil && filtroStatus;
      });

      this.isLoading = false;
    }, 1000); 
    // --- FIM DA SIMULAÇÃO ---
  }

  filtrar(): void {
    this.carregarFuncionarios();
  }

  limparFiltros(): void {
    this.filtroForm.reset({
      nome: '',
      email: '',
      perfil: null,
      status: null
    });
    this.carregarFuncionarios();
  }

  novoFuncionario(): void {
    this.router.navigateByUrl('/gerenciarFuncionario');
  }

  editarFuncionario(id: number): void {
    this.router.navigateByUrl('/gerenciarFuncionario');
  }
}

import { Component } from '@angular/core';
import { TipoCliente } from '../../model/enums/TipoCliente';
import { Cliente } from '../../model/Cliente';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StatusCliente } from '../../model/enums/StatusCliente';
import { Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBar } from "../../components/nav-bar/nav-bar";

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, ReactiveFormsModule, NavBar],
  templateUrl: './cliente.page.html',
  styleUrl: './cliente.page.scss',
})
export class ClientePage {
  // Lista de clientes exibida na tabela
  clientes: Cliente[] = [];
  
  // Flag para controlar a mensagem "Carregando..."
  isLoading = false;

  // Formulário de filtro
  filtroForm: FormGroup;

  // Opções para os <select>
  statusOptions = Object.values(StatusCliente);
  tipoOptions = Object.values(TipoCliente);
  
  // Enums para usar no HTML
  StatusCliente = StatusCliente;

  constructor(
    private fb: FormBuilder,
    private router: Router
    // private clienteService: ClienteService // Injete seu serviço de clientes aqui
  ) {
    // Inicializa o formulário de filtro
    this.filtroForm = this.fb.group({
      nome: [''],
      documento: [''],
      tipo: [null], // Valor padrão (null ou '' para 'Todos')
      status: [null] // Valor padrão (null ou '' para 'Todos')
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
  }

  /**
   * Simula o carregamento de clientes.
   * Substitua esta lógica pela chamada ao seu 'clienteService.getClientes(filtros)'.
   */
  carregarClientes(): void {
    this.isLoading = true;
    const filtros = this.filtroForm.value;
    console.log('Buscando clientes com filtros:', filtros);

    // --- SIMULAÇÃO DE API ---
    // (Substitua isso pela chamada ao seu service)
    setTimeout(() => {
      // Dados de exemplo
      const mockClientes: Cliente[] = [
        {
          id: 1,
          nome: 'Cliente Exemplo PF',
          tipo: TipoCliente.PF,
          documento: '111.222.333-44',
          endereco: 'Rua A, 123',
          status: this.StatusCliente.ATIVO
        },
        {
          id: 2,
          nome: 'Empresa Exemplo PJ',
          tipo: TipoCliente.PJ,
          documento: '12.345.678/0001-99',
          endereco: 'Avenida B, 456',
          status: this.StatusCliente.INATIVO
        },
        {
          id: 3,
          nome: 'Cliente Pendente',
          tipo: TipoCliente.PF,
          documento: '999.888.777-66',
          endereco: 'Rua C, 789',
          status: this.StatusCliente.PEDENTE
        }
      ];

      // Simula o filtro (em um caso real, o back-end faria isso)
      this.clientes = mockClientes.filter(c => {
        const filtroNome = !filtros.nome || c.nome.toLowerCase().includes(filtros.nome.toLowerCase());
        const filtroDoc = !filtros.documento || c.documento.includes(filtros.documento);
        const filtroTipo = !filtros.tipo || c.tipo === filtros.tipo;
        const filtroStatus = !filtros.status || c.status === filtros.status;
        return filtroNome && filtroDoc && filtroTipo && filtroStatus;
      });

      this.isLoading = false;
    }, 1000); // Simula 1 segundo de espera
    // --- FIM DA SIMULAÇÃO ---
  }

  filtrar(): void {
    this.carregarClientes();
  }

  limparFiltros(): void {
    this.filtroForm.reset({
      nome: '',
      documento: '',
      tipo: null,
      status: null
    });
    this.carregarClientes();
  }

  novoCliente(): void {
    this.router.navigateByUrl('/gerenciarCliente');
  }

  editarCliente(id: number): void {
    this.router.navigateByUrl('/gerenciarCliente');
  }
}

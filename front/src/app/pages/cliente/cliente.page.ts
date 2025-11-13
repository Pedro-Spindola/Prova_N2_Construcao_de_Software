import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model/Cliente';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { ClienteService } from '../../services/cliente-service';
import { StatusCliente } from '../../model/enums/StatusCliente';
import { TipoCliente } from '../../model/enums/TipoCliente';

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, ReactiveFormsModule, NavBar],
  templateUrl: './cliente.page.html',
  styleUrl: './cliente.page.scss',
})
export class ClientePage implements OnInit {
  private clientesTodos: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtroForm!: FormGroup;
  
  statusOptions = Object.values(StatusCliente);
  tipoOptions = Object.values(TipoCliente);

  // Flag para controlar a mensagem "Carregando..."
  isLoading = false;

  // Enums para usar no HTML
  StatusCliente = StatusCliente;
  
  constructor(private clienteService: ClienteService, private router: Router, private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      nome: [null],
      documento: [null],
      tipo: [null],
      status: [null]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(filtros: any = null): void {
    this.isLoading = true;
    
    this.clienteService.findAll().subscribe({
      next: (dadosApi) => {
        this.clientesTodos = dadosApi; 
        this.clientesFiltrados = dadosApi; 
        this.clienteService.adicionarClientes(dadosApi);
        console.log('Clientes carregado com sucesso: ', this.clientesFiltrados);

        this.isLoading = false; 
      },
      error: (erro) => {
        console.error('Falha ao carregar a lista de clientes.', erro);
        this.isLoading = false; 
      }
    });
  }
  
  filtrar(): void {
    const filtros = this.filtroForm.value;
    
    let listaFiltrada = this.clientesTodos;

    if (filtros.nome) {
      const nomeFiltro = filtros.nome.toLowerCase();
      listaFiltrada = listaFiltrada.filter(cliente => 
        cliente.nome.toLowerCase().includes(nomeFiltro)
      );
    }

    if (filtros.documento) {
      const docFiltro = filtros.documento;
      listaFiltrada = listaFiltrada.filter(cliente => 
        cliente.documento.includes(docFiltro)
      );
    }

    if (filtros.tipo) {
      listaFiltrada = listaFiltrada.filter(cliente => 
        cliente.tipo === filtros.tipo
      );
    }

    if (filtros.status) {
      listaFiltrada = listaFiltrada.filter(cliente => 
        cliente.status === filtros.status
      );
    }

    this.clientesFiltrados = listaFiltrada;
  }

  limparFiltros(): void {
    this.filtroForm.reset();
    this.clientesFiltrados = this.clientesTodos;
  }

  novoCliente(): void {
    this.router.navigateByUrl('/gerenciarCliente');
  }

  editarCliente(id: number): void {
    this.router.navigateByUrl(`/gerenciarCliente/${id}`);
  }
}

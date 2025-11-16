import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/Item';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pedido } from '../../model/Pedido';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NavBar } from "../nav-bar/nav-bar";
import { PedidoService } from '../../services/pedido-service';
import { PedidoDTO } from '../../model/PedidoDTO';

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, DatePipe, NavBar],
  templateUrl: './relatorios.page.html',
  styleUrl: './relatorios.page.scss',
})
export class RelatoriosPage implements OnInit {
  
  // Lista Mestre (usando a nova interface PedidoDTO)
  private pedidosTodos: PedidoDTO[] = [];
  
  // Lista de exibição
  pedidos: PedidoDTO[] = [];
  
  isLoading = false;
  filtroForm: FormGroup;

  expandedPedidoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService // Injete o PedidoService real
  ) {
    this.filtroForm = this.fb.group({
      funcionario: [''],
      cliente: [''],
      dataInicio: [null], 
      dataFim: [null]
    });
  }

  ngOnInit(): void {
    this.carregarRelatorio();
  }

  /**
   * Carrega TODOS os pedidos da API (uma vez)
   */
  carregarRelatorio(): void {
    this.isLoading = true;
    
    // O 'findAll' do seu service precisa retornar 'Observable<PedidoDTO[]>'
    this.pedidoService.findAll().subscribe({
      next: (dadosApi) => {
        this.pedidosTodos = dadosApi as any; // (Usando 'as any' caso o service não esteja atualizado)
        this.pedidos = this.pedidosTodos;
        this.isLoading = false;
        console.log('Pedidos carregados:', this.pedidos);
      },
      error: (erro) => {
        console.error('Falha ao carregar pedidos.', erro);
        this.isLoading = false;
      }
    });
  }

  /**
   * Filtra a lista mestre (pedidosTodos) no FRONTEND
   * (Lógica de filtro CORRIGIDA para os DTOs)
   */
  filtrar(): void {
    this.expandedPedidoId = null; 
    const filtros = this.filtroForm.value;
    
    const funcFiltro = filtros.funcionario ? filtros.funcionario.toLowerCase() : null;
    const cliFiltro = filtros.cliente ? filtros.cliente.toLowerCase() : null;
    const dataInicioFiltro = filtros.dataInicio ? new Date(filtros.dataInicio + 'T00:00:00') : null;
    const dataFimFiltro = filtros.dataFim ? new Date(filtros.dataFim + 'T23:59:59') : null;

    let listaFiltrada = this.pedidosTodos;

    // CORREÇÃO: Filtrando pelo nome dentro do objeto 'usuario'
    if (funcFiltro) {
      listaFiltrada = listaFiltrada.filter(p => 
        p.usuario.nome.toLowerCase().includes(funcFiltro)
      );
    }

    // CORREÇÃO: Filtrando pelo nome dentro do objeto 'cliente'
    if (cliFiltro) {
      listaFiltrada = listaFiltrada.filter(p => 
        p.cliente.nome.toLowerCase().includes(cliFiltro)
      );
    }

    // Filtro de Data Início
    if (dataInicioFiltro) {
      listaFiltrada = listaFiltrada.filter(p => 
        new Date(p.data) >= dataInicioFiltro
      );
    }

    // Filtro de Data Fim
    if (dataFimFiltro) {
      listaFiltrada = listaFiltrada.filter(p => 
        new Date(p.data) <= dataFimFiltro
      );
    }

    this.pedidos = listaFiltrada;
  }

  /**
   * Limpa os filtros e restaura a lista completa.
   */
  limparFiltros(): void {
    this.filtroForm.reset({
      funcionario: '',
      cliente: '',
      dataInicio: null,
      dataFim: null
    });
    this.expandedPedidoId = null;
    this.pedidos = this.pedidosTodos;
  }

  /**
   * Controla a expansão da linha da tabela.
   */
  toggleSubitens(pedidoId: number): void {
    if (this.expandedPedidoId === pedidoId) {
      this.expandedPedidoId = null;
    } else {
      this.expandedPedidoId = pedidoId;
    }
  }
}

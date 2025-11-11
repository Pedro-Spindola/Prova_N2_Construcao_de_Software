import { Component } from '@angular/core';
import { Item } from '../../model/Item';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pedido } from '../../model/Pedido';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, DatePipe, NavBar],
  templateUrl: './relatorios.page.html',
  styleUrl: './relatorios.page.scss',
})
export class RelatoriosPage {
  pedidos: Pedido[] = [];
  isLoading = false;
  filtroForm: FormGroup;

  // Variável para controlar qual linha da tabela está expandida
  expandedPedidoId: number | null = null;

  constructor(
    private fb: FormBuilder
    // private relatorioService: RelatorioService // Injete seu serviço
  ) {
    // Inicializa o formulário de filtro
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
   * Simula o carregamento dos dados do relatório.
   */
  carregarRelatorio(): void {
    this.isLoading = true;
    const filtros = this.filtroForm.value;
    console.log('Buscando relatório com filtros:', filtros);

    // --- SIMULAÇÃO DE API ---
    setTimeout(() => {
      // Dados de exemplo
      const mockItens1: Item[] = [
        { id: 'i1', quantidade: 2, nomeProduto: 'Produto A', valorUnitario: 50, valorTotal: 100 },
        { id: 'i2', quantidade: 1, nomeProduto: 'Produto B', valorUnitario: 75, valorTotal: 75 }
      ];
      const mockItens2: Item[] = [
        { id: 'i3', quantidade: 10, nomeProduto: 'Produto C (Caixa)', valorUnitario: 120, valorTotal: 1200 }
      ];
      
      const mockPedidos: Pedido[] = [
        {
          id: 1001,
          funcionario: 'Vendedor 1 (João)',
          cliente: 'Cliente PF (Maria)',
          data: '2025-11-05', // Formato ISO (YYYY-MM-DD)
          valorTotal: 175,
          item: mockItens1
        },
        {
          id: 1002,
          funcionario: 'Vendedor 2 (Ana)',
          cliente: 'Empresa PJ (TechCorp)',
          data: '2025-11-06',
          valorTotal: 1200,
          item: mockItens2
        }
      ];

      // Aqui você aplicaria os filtros. Por enquanto, apenas retornamos os mocks.
      this.pedidos = mockPedidos;
      this.isLoading = false;
    }, 1000); 
    // --- FIM DA SIMULAÇÃO ---
  }

  /**
   * Chamado ao clicar em "Filtrar".
   */
  filtrar(): void {
    this.expandedPedidoId = null; // Fecha qualquer linha aberta ao filtrar
    this.carregarRelatorio();
  }

  /**
   * Chamado ao clicar em "Limpar".
   */
  limparFiltros(): void {
    this.filtroForm.reset({
      funcionario: '',
      cliente: '',
      dataInicio: null,
      dataFim: null
    });
    this.expandedPedidoId = null;
    this.carregarRelatorio();
  }

  /**
   * Controla a expansão da linha da tabela.
   * Se a linha clicada já estiver aberta, ela fecha (id = null).
   * Se outra linha estiver aberta, ela fecha e abre a nova.
   */
  toggleSubitens(pedidoId: number): void {
    if (this.expandedPedidoId === pedidoId) {
      this.expandedPedidoId = null; // Fecha a linha
    } else {
      this.expandedPedidoId = pedidoId; // Abre a nova linha
    }
  }
}

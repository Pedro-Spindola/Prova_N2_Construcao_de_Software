import { Component, OnInit } from '@angular/core';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Produto } from '../../model/Produto';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StatusProduto } from '../../model/enums/StatusProduto';
import { ProdutoService } from '../../services/produto-service';

@Component({
  selector: 'app-produto',
  imports: [CommonModule, NavBar, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './produto.page.html',
  styleUrl: './produto.page.scss',
})
export class ProdutoPage implements OnInit {
  // A "Lista Mestre" que guarda todos os produtos
  private produtosTodos: Produto[] = []; 
  
  // A lista que o HTML exibe (que será filtrada)
  produtos: Produto[] = []; 
  
  isLoading = false;
  filtroForm: FormGroup;
  statusOptions = Object.values(StatusProduto);
  statusProduto = StatusProduto; // Para usar no HTML

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService // <-- Injetado
  ) {
    this.filtroForm = this.fb.group({
      nome: [null],
      status: [null]
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  /**
   * Carrega TODOS os produtos da API, UMA VEZ.
   */
  carregarProdutos(): void {
    this.isLoading = true;

    // Chama o serviço (sem filtros) para pegar tudo
    this.produtoService.findAll().subscribe({
      next: (dadosApi) => {
        // Preenche AMBAS as listas (a mestre e a de exibição)
        this.produtosTodos = dadosApi;
        this.produtos = dadosApi;
        this.isLoading = false;
        console.log('Produtos carregados:', this.produtos);
      },
      error: (erro) => {
        console.error('Falha ao carregar produtos.', erro);
        this.isLoading = false;
      }
    });
  }

  // ######################################################
  // ## MÉTODOS DE FILTRAGEM (Padrão Frontend Solicitado) ##
  // ######################################################

  /**
   * Filtra a lista mestre (produtosTodos) no FRONTEND
   * e atualiza a lista 'produtos'.
   */
  filtrar(): void {
    const filtros = this.filtroForm.value;
    
    // Começa com a lista mestre completa
    let listaFiltrada = this.produtosTodos;

    // Aplica o filtro de NOME (se existir)
    if (filtros.nome) {
      const nomeFiltro = filtros.nome.toLowerCase();
      listaFiltrada = listaFiltrada.filter(produto =>
        produto.nome.toLowerCase().includes(nomeFiltro)
      );
    }

    // Aplica o filtro de STATUS (se existir)
    if (filtros.status) {
      listaFiltrada = listaFiltrada.filter(produto =>
        produto.status === filtros.status
      );
    }

    // Atualiza a lista que o HTML está exibindo
    this.produtos = listaFiltrada;
  }

  /**
   * Limpa os filtros e restaura a lista completa (sem chamar API).
   */
  limparFiltros(): void {
    this.filtroForm.reset({
      nome: null,
      status: null
    });
    // Restaura a lista de exibição para a lista mestre
    this.produtos = this.produtosTodos;
  }

  // ######################################################
  // ## MÉTODOS DE NAVEGAÇÃO                          ##
  // ######################################################

  novoProduto(): void {
    this.router.navigateByUrl('/gerenciarProduto');
  }

  /**
   * Navega para a rota de edição com o ID correto.
   */
  editarProduto(id: number): void {
    this.router.navigateByUrl(`/gerenciarProduto/${id}`);
  }

  editarEstoque(id: number): void {
    
  }
}
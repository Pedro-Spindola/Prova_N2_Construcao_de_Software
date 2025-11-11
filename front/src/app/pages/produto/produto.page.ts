import { Component } from '@angular/core';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Produto } from '../../model/Produto';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StatusProduto } from '../../model/enums/StatusProduto';

@Component({
  selector: 'app-produto',
  imports: [CommonModule, NavBar, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './produto.page.html',
  styleUrl: './produto.page.scss',
})
export class ProdutoPage {
  produtos: Produto[] = [];
  isLoading = false;
  filtroForm: FormGroup;
  statusOptions = Object.values(StatusProduto);
  statusProduto = StatusProduto;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.filtroForm = this.fb.group({
      nome: [''],
      status: [null]
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.isLoading = true;
    const filtros = this.filtroForm.value;
    console.log('Buscando produtos com filtros:', filtros);

    // (Substitua isso pela chamada ao seu service)
    setTimeout(() => {
      const mockProdutos: Produto[] = [
        {
          id: 1,
          nome: 'Produto A (Exemplo)',
          descricao: 'Descrição do produto A',
          quantidadeCaixa: 10,
          precoVenda: 150.75,
          status: this.statusProduto.ATIVO,
          quantidadeEmEstoque: 100
        },
        {
          id: 2,
          nome: 'Produto B (Exemplo)',
          descricao: 'Descrição do produto B',
          quantidadeCaixa: 5,
          precoVenda: 89.90,
          status: this.statusProduto.INATIVO,
          quantidadeEmEstoque: 0
        },
        {
          id: 3,
          nome: 'Produto C (Exemplo)',
          descricao: 'Descrição do produto C',
          quantidadeCaixa: 1,
          precoVenda: 500.00,
          status: this.statusProduto.ATIVO,
          quantidadeEmEstoque: 25
        },
        {
          id: 4,
          nome: 'Produto D (Exemplo)',
          descricao: 'Descrição do produto D',
          quantidadeCaixa: 9,
          precoVenda: 380.50,
          status: this.statusProduto.ATIVO,
          quantidadeEmEstoque: 12
        },
        {
          id: 5,
          nome: 'Produto E (Exemplo)',
          descricao: 'Descrição do produto E',
          quantidadeCaixa: 12,
          precoVenda: 1250.40,
          status: this.statusProduto.INATIVO,
          quantidadeEmEstoque: 85
        }
      ];

      this.produtos = mockProdutos.filter(p => {
        const filtroNome = !filtros.nome || p.nome.toLowerCase().includes(filtros.nome.toLowerCase());
        const filtroStatus = !filtros.status || p.status === filtros.status;
        return filtroNome && filtroStatus;
      });

      this.isLoading = false;
    }, 1000);
    // --- FIM DA SIMULAÇÃO ---
  }

  filtrar(): void {
    this.carregarProdutos();
  }

  limparFiltros(): void {
    this.filtroForm.reset({
      nome: '',
      status: null
    });
    this.carregarProdutos();
  }

  novoProduto(): void {
    this.router.navigateByUrl('/gerenciarProduto');
  }

  editarProduto(id: Number): void {
    this.router.navigateByUrl('/gerenciarProduto');
  }
}

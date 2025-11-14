import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../model/Cliente';
import { Funcionario } from '../../model/Funcionario';
import { Router } from '@angular/router';
import { Pedido } from '../../model/Pedido';
import { CommonModule } from '@angular/common';
import { Produto } from '../../model/Produto';
import { PedidoService } from '../../services/pedido-service';
import { ClienteService } from '../../services/cliente-service';
import { FuncionarioService } from '../../services/funcionario-service';
import { ProdutoService } from '../../services/produto-service';
import { forkJoin } from 'rxjs';
import { ItemLancamento } from '../../model/ItemLancamento';
import { ItemCompraRequest } from '../../model/ItemCompraRequest';


@Component({
  selector: 'app-lancamento',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lancamento.page.html',
  styleUrl: './lancamento.page.scss',
})
export class LancamentoPage implements OnInit {
  
  // --- Formulários ---
  cabecalhoForm: FormGroup;
  addItemForm: FormGroup;

  // --- Listas para os <select> ---
  clientesLista: Cliente[] = [];
  funcionariosLista: Funcionario[] = [];
  produtosLista: Produto[] = [];

  // --- Estado do Pedido Atual ---
  itensDoPedido: ItemLancamento[] = [];
  totalGeralPedido: number = 0;
  isLoading = true; // Flag para carregar dados iniciais

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // --- Serviços Injetados ---
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private produtoService: ProdutoService
  ) {
    // Formulário principal (Cliente e Funcionário)
    this.cabecalhoForm = this.fb.group({
      clienteId: [null, Validators.required],
      funcionarioId: [null, Validators.required]
    });

    // Formulário para adicionar itens
    this.addItemForm = this.fb.group({
      // O [ngValue]="p" no HTML armazena o OBJETO Produto inteiro
      produto: [null, Validators.required], 
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.carregarDadosIniciais();
    
    // Escuta mudanças no select de produto para atualizar a validação de estoque
    this.addItemForm.get('produto')?.valueChanges.subscribe(produto => {
      this.atualizarValidacaoEstoque(produto);
    });
  }

  /**
   * Carrega Clientes, Funcionários e Produtos da API
   * para preencher os menus <select>.
   */
  carregarDadosIniciais(): void {
    this.isLoading = true;
    
    // forkJoin espera todas as chamadas terminarem
    forkJoin({
      clientes: this.clienteService.findAll(),
      funcionarios: this.funcionarioService.findAll(),
      produtos: this.produtoService.findAll()
    }).subscribe({
      next: (resultados) => {
        // Filtra apenas clientes/funcionários ATIVOS (boa prática)
        this.clientesLista = resultados.clientes.filter(c => c.status === 'ATIVO');
        this.funcionariosLista = resultados.funcionarios.filter(f => f.status === 'ATIVO');
        
        // Filtra apenas produtos ATIVOS e com ESTOQUE
        this.produtosLista = resultados.produtos.filter(p => p.status === 'ATIVO' && p.quantidadeEmEstoque > 0);
        
        console.log('Dados iniciais carregados.');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar dados iniciais', err);
        this.isLoading = false;
        alert('Falha ao carregar dados. Tente novamente.');
      }
    });
  }

  /**
   * Atualiza o validador 'max' do campo 'quantidade'
   * com base no estoque do produto selecionado.
   */
  atualizarValidacaoEstoque(produto: Produto | null): void {
    const qtdControl = this.addItemForm.get('quantidade');
    if (!qtdControl) return;

    if (produto) {
      qtdControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(produto.quantidadeEmEstoque) // Validação dinâmica
      ]);
    } else {
      // Reseta para o padrão se nenhum produto for selecionado
      qtdControl.setValidators([Validators.required, Validators.min(1)]);
    }
    qtdControl.updateValueAndValidity(); // Aplica as novas regras
  }

  /**
   * Adiciona o item do formulário 'addItemForm' para a
   * tabela 'itensDoPedido'.
   */
  adicionarItem(): void {
    if (this.addItemForm.invalid) {
      this.addItemForm.markAllAsTouched();
      return;
    }

    const formValue = this.addItemForm.value;
    const produtoSelecionado: Produto = formValue.produto;
    const quantidade: number = formValue.quantidade;

    // Verifica se o item já existe na lista
    const itemExistente = this.itensDoPedido.find(
      item => item.produtoId === produtoSelecionado.id
    );

    if (itemExistente) {
      // Apenas atualiza a quantidade (respeitando o estoque)
      const novaQtde = itemExistente.quantidade + quantidade;
      if (novaQtde > itemExistente.estoqueDisponivel) {
        alert(`Estoque insuficiente. Você já tem ${itemExistente.quantidade} e tentou adicionar ${quantidade}. Limite: ${itemExistente.estoqueDisponivel}`);
        return;
      }
      itemExistente.quantidade = novaQtde;
      itemExistente.valorTotal = itemExistente.quantidade * itemExistente.valorUnitario;
    } else {
      // Adiciona um novo item
      console.log(produtoSelecionado);
      const novoItem: ItemLancamento = {
        produtoId: produtoSelecionado.id,
        nomeProduto: produtoSelecionado.nome,
        quantidade: quantidade,
        valorUnitario: produtoSelecionado.precoVenda,
        valorTotal: quantidade * produtoSelecionado.precoVenda,
        estoqueDisponivel: produtoSelecionado.quantidadeEmEstoque
      };
      this.itensDoPedido.push(novoItem);
    }

    this.calcularTotalGeral();
    this.resetAddItemForm();
  }

  /**
   * Reseta o formulário de adicionar item.
   */
  resetAddItemForm(): void {
    this.addItemForm.reset({
      produto: null,
      quantidade: 1
    });
    // this.atualizarValidacaoEstoque(null); // (já é chamado pelo valueChanges)
  }

  /**
   * Remove um item da tabela pelo seu índice.
   */
  removerItem(index: number): void {
    this.itensDoPedido.splice(index, 1);
    this.calcularTotalGeral();
  }

  /**
   * Calcula o valor total do pedido somando os subtotais dos itens.
   */
  calcularTotalGeral(): void {
    this.totalGeralPedido = this.itensDoPedido.reduce(
      (total, item) => total + item.valorTotal,
      0
    );
  }

  // --- Getters para facilitar a validação no HTML ---
  get fCabecalho(): { [key: string]: AbstractControl } { 
    return this.cabecalhoForm.controls; 
  }
  get fAddItem(): { [key: string]: AbstractControl } { 
    return this.addItemForm.controls; 
  }

  /**
   * Chamado ao clicar em "Salvar Lançamento".
   * Monta o DTO CORRETO e envia para a API.
   */
  onSubmit(): void {
    
    // 1. Validações
    if (this.cabecalhoForm.invalid) {
      this.cabecalhoForm.markAllAsTouched();
      alert('Por favor, selecione o Cliente e o Funcionário.');
      return;
    }
    if (this.itensDoPedido.length === 0) {
      alert('Adicione pelo menos um item ao pedido.');
      return;
    }

    // 2. Mapeia os itens da tabela (ItemLancamento) para o DTO (ItemCompraRequest)
    const itensParaDTO: ItemCompraRequest[] = this.itensDoPedido.map(item => {
      return {
        idProduto: item.produtoId,
        quantidade: item.quantidade
      };
    });

    // 3. Monta o DTO final (PedidoRequest)
    const pedidoParaAPI: Pedido = {
      id: 0, // O backend gerará o ID
      total: this.totalGeralPedido, // Total calculado no frontend
      troco: 0, // O formulário não tem campo de troco
      cliente: this.cabecalhoForm.value.clienteId,     // <-- Envia o ID (number)
      usuario: this.cabecalhoForm.value.funcionarioId, // <-- Envia o ID (number)
      itensComprados: itensParaDTO
    };

    console.log('--- ENVIANDO PARA API ---', pedidoParaAPI);

    // 4. Chama o serviço
    // O (pedidoParaAPI as any) é usado para garantir que o DTO
    // seja enviado, mesmo que a interface 'Pedido' no service esteja
    // levemente diferente.
    this.pedidoService.create(pedidoParaAPI as any).subscribe({
      next: (respostaApi) => {
        console.log('API respondeu:', respostaApi);
        alert('Lançamento salvo com sucesso!');
        // Limpa tudo e navega para outra página
        this.router.navigateByUrl('/'); // (ou para uma lista de pedidos)
      },
      error: (err) => {
        console.error('Erro ao salvar pedido:', err);
        alert('Falha ao salvar o lançamento. Verifique o console.');
      }
    });
  }
  voltar(): void {
    this.router.navigateByUrl('/');
  }
}
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../model/Cliente';
import { Funcionario } from '../../model/Funcionario';
import { Router } from '@angular/router';
import { TipoCliente } from '../../model/enums/TipoCliente';
import { PerfilUsuario } from '../../model/enums/PerfilUsuario';
import { StatusCliente } from '../../model/enums/StatusCliente';
import { StatusUsuario } from '../../model/enums/StatusUsuario';
import { Item } from '../../model/Item';
import { Pedido } from '../../model/Pedido';
import { CommonModule } from '@angular/common';

// O que usamos para o 'carrinho' (lista local)
interface ItemLancamento {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

// O que esperamos da API de Produtos para o <select>
interface ProdutoParaVenda {
  id: number;
  nome: string;
  precoVenda: number;
  quantidadeEmEstoque: number;
}

@Component({
  selector: 'app-lancamento',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lancamento.page.html',
  styleUrl: './lancamento.page.scss',
})
export class LancamentoPage {
  // --- Formulários ---
  cabecalhoForm: FormGroup;
  addItemForm: FormGroup;

  // ***************************************************************
  // 2. ATUALIZANDO AS LISTAS PARA USAR AS INTERFACES COMPLETAS
  // ***************************************************************
  clientesLista: Cliente[] = [];
  funcionariosLista: Funcionario[] = [];
  produtosLista: ProdutoParaVenda[] = []; // Mantemos esta, pois você não forneceu a de Produto

  // --- Estado do Pedido Atual ---
  itensDoPedido: ItemLancamento[] = [];
  totalGeralPedido: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router
    // ... Seus serviços
  ) {
    // Formulário principal (Cliente e Funcionário) - SEM MUDANÇAS
    this.cabecalhoForm = this.fb.group({
      clienteId: [null, Validators.required],
      funcionarioId: [null, Validators.required]
    });

    // Formulário para adicionar itens - SEM MUDANÇAS
    this.addItemForm = this.fb.group({
      produto: [null, Validators.required], 
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.carregarDadosIniciais();
    this.addItemForm.get('produto')?.valueChanges.subscribe(produto => {
      this.atualizarValidacaoEstoque(produto);
    });
  }

  /**
   * (SIMULAÇÃO) Carrega dados.
   */
  carregarDadosIniciais(): void {
    
    // ***************************************************************
    // 3. ATUALIZANDO OS MOCKS PARA USAREM AS INTERFACES COMPLETAS
    // ***************************************************************

    // Simulação ClienteService.getAll()
    this.clientesLista = [
      { id: 1, nome: 'Cliente Exemplo PF', tipo: TipoCliente.PF, documento: '111...', endereco: 'Rua A', status: StatusCliente.ATIVO },
      { id: 2, nome: 'Empresa Exemplo PJ', tipo: TipoCliente.PJ, documento: '222...', endereco: 'Rua B', status: StatusCliente.ATIVO }
    ];

    // Simulação FuncionarioService.getAll()
    this.funcionariosLista = [
      { id: 1, nome: 'Vendedor 1 (João)', email: 'j@j.com', senha: '', perfil: PerfilUsuario.OPERADOR, status: StatusUsuario.ATIVO },
      { id: 2, nome: 'Vendedor 2 (Ana)', email: 'a@a.com', senha: '', perfil: PerfilUsuario.OPERADOR, status: StatusUsuario.ATIVO }
    ];

    // Simulação ProdutoService.getParaVenda() (Sem mudanças)
    this.produtosLista = [
      { id: 10, nome: 'Produto A', precoVenda: 50.00, quantidadeEmEstoque: 100 },
      { id: 11, nome: 'Produto B', precoVenda: 75.50, quantidadeEmEstoque: 50 },
      { id: 12, nome: 'Produto C (Caixa)', precoVenda: 120.00, quantidadeEmEstoque: 10 }
    ];
  }

  // --- Nenhuma mudança nas funções abaixo ---
  atualizarValidacaoEstoque(produto: ProdutoParaVenda | null): void { /* ...código idêntico... */ 
    const qtdControl = this.addItemForm.get('quantidade');
    if (!qtdControl) return;

    if (produto) {
      qtdControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(produto.quantidadeEmEstoque) // Validação dinâmica
      ]);
    } else {
      qtdControl.setValidators([Validators.required, Validators.min(1)]);
    }
    qtdControl.updateValueAndValidity();
  }
  adicionarItem(): void { /* ...código idêntico... */ 
    if (this.addItemForm.invalid) {
      this.addItemForm.markAllAsTouched();
      return;
    }

    const formValue = this.addItemForm.value;
    const produtoSelecionado: ProdutoParaVenda = formValue.produto;
    const quantidade: number = formValue.quantidade;

    const itemExistente = this.itensDoPedido.find(
      item => item.produtoId === produtoSelecionado.id
    );

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
      itemExistente.valorTotal = itemExistente.quantidade * itemExistente.valorUnitario;
    } else {
      const novoItem: ItemLancamento = {
        produtoId: produtoSelecionado.id,
        nomeProduto: produtoSelecionado.nome,
        quantidade: quantidade,
        valorUnitario: produtoSelecionado.precoVenda,
        valorTotal: quantidade * produtoSelecionado.precoVenda
      };
      this.itensDoPedido.push(novoItem);
    }

    this.calcularTotalGeral();
    this.resetAddItemForm();
  }
  resetAddItemForm(): void { /* ...código idêntico... */ 
    this.addItemForm.reset({
      produto: null,
      quantidade: 1
    });
    this.atualizarValidacaoEstoque(null);
  }
  removerItem(index: number): void { /* ...código idêntico... */ 
    this.itensDoPedido.splice(index, 1);
    this.calcularTotalGeral();
  }
  calcularTotalGeral(): void { /* ...código idêntico... */ 
    this.totalGeralPedido = this.itensDoPedido.reduce(
      (total, item) => total + item.valorTotal,
      0
    );
  }
  get fCabecalho(): { [key: string]: AbstractControl } { return this.cabecalhoForm.controls; }
  get fAddItem(): { [key: string]: AbstractControl } { return this.addItemForm.controls; }
  // --- Fim das funções idênticas ---


  /**
   * Chamado ao clicar em "Salvar Lançamento".
   */
  onSubmit(): void {
    /*
    // Validações (sem mudanças)
    if (this.cabecalhoForm.invalid) {
      this.cabecalhoForm.markAllAsTouched();
    }
    if (this.itensDoPedido.length === 0) {
      alert('Adicione pelo menos um item ao pedido.');
      return;
    }
    if (this.cabecalhoForm.invalid) {
       return;
    }

    // ***************************************************************
    // 4. LÓGICA DE CRIAÇÃO DO DTO CONFORME SUA SOLICITAÇÃO
    // ***************************************************************

    // 1. Encontra o NOME do cliente e funcionário baseado no ID do formulário
    const clienteIdSelecionado = this.cabecalhoForm.value.clienteId;
    const funcionarioIdSelecionado = this.cabecalhoForm.value.funcionarioId;

    const clienteSelecionado = this.clientesLista.find(c => c.id === clienteIdSelecionado);
    const funcionarioSelecionado = this.funcionariosLista.find(f => f.id === funcionarioIdSelecionado);

    if (!clienteSelecionado || !funcionarioSelecionado) {
      alert('Erro: Cliente ou Funcionário não encontrado. Tente novamente.');
      return;
    }

    // 2. Mapeia os itens do carrinho (ItemLancamento) para o DTO 'Item'
    //    (Assumindo que 'Item.id' deve ser o 'produtoId' como string)
    const itensParaDTO: Item[] = this.itensDoPedido.map(item => {
      return {
        id: item.produtoId.toString(), // <-- Mapeando 'produtoId' (number) para 'id' (string)
        nomeProduto: item.nomeProduto,
        quantidade: item.quantidade,
        valorUnitario: item.valorUnitario,
        valorTotal: item.valorTotal
      };
    });

    // 3. Monta o DTO final EXATAMENTE como a interface 'Pedido'
    //    (Omitindo 'id' do Pedido, pois é gerado pelo back-end)
    const lancamentoDTO: Omit<Pedido, 'id'> = {
      cliente: clienteSelecionado.nome,     // <-- Enviando NOME (string)
      funcionario: funcionarioSelecionado.nome, // <-- Enviando NOME (string)
      data: new Date().toISOString(),         // <-- Enviando Data
      valorTotal: this.totalGeralPedido,      // <-- Enviando Valor Total (calculado no front)
      item: itensParaDTO                      // <-- Enviando a lista de Itens
    };

    console.log('--- ENVIANDO PARA API (SIMULAÇÃO) ---', lancamentoDTO);

    // 4. Chama o serviço (Simulação)
    // this.pedidoService.create(lancamentoDTO).subscribe({ ... });
    */
    // Simulação de sucesso
    alert('Lançamento salvo com sucesso! (Simulação)');
    this.router.navigateByUrl('/');
  }
}

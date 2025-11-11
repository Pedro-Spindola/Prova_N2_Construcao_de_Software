import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StatusProduto } from '../../model/enums/StatusProduto';
import { Produto } from '../../model/Produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerenciar-produto',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './gerenciar-produto.page.html',
  styleUrl: './gerenciar-produto.page.scss',
})
export class GerenciarProdutoPage implements OnInit {

  produtoForm: FormGroup;
  isEditing = false;
  produtoId: number | null = null;
  
  // Para o <select> de Status
  statusOptions = Object.values(StatusProduto);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // Para ler o ID da URL
    private router: Router,
    // private produtoService: ProdutoService // Injete seu serviço
  ) {
    // Inicializa o formulário
    this.produtoForm = this.fb.group({
      // O ID é desabilitado; ele só é preenchido no modo de edição
      id: [{ value: null, disabled: true }],
      nome: ['', Validators.required],
      descricao: [''], // Descrição não é obrigatória no seu form
      quantidadeCaixa: [null, [Validators.required, Validators.min(0)]],
      precoCusto: [null, [Validators.required, Validators.min(0)]],
      precoVenda: [null, [Validators.required, Validators.min(0)]],
      // O status será 'ATIVO' ou 'INATIVO' (do Enum)
      status: [StatusProduto.ATIVO, Validators.required],
      // Segui seu HTML, mas lembre-se que no back-end o Estoque é separado
      quantidadeEmEstoque: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Verifica se há um 'id' nos parâmetros da rota
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.isEditing = true;
      this.produtoId = +idParam; // Converte string 'id' para number
      this.carregarProduto();
    }
  }

  /**
   * (SIMULAÇÃO) Carrega os dados do produto da API.
   * Substitua pela chamada real do seu serviço.
   */
  carregarProduto(): void {
    console.log('Modo Edição: Carregando produto ID:', this.produtoId);
    
    // --- Início da Simulação ---
    // (Substitua pelo seu this.produtoService.getById(this.produtoId).subscribe(...))
    const mockProduto: Produto = {
      id: this.produtoId!,
      nome: 'Produto (Carregado da API)',
      descricao: 'Esta é uma descrição vinda da API.',
      quantidadeCaixa: 12,
      precoVenda: 199.90,
      status: StatusProduto.INATIVO,
      quantidadeEmEstoque: 50
    };
    
    // Simula o 'precoCusto' (que não vem no seu 'Produto' interface)
    const mockPrecoCusto = 120.00; 
    
    // Preenche o formulário com os dados carregados
    this.produtoForm.patchValue({
      ...mockProduto,
      precoCusto: mockPrecoCusto 
    });
    // --- Fim da Simulação ---
  }

  /**
   * Chamado ao clicar em "Salvar".
   */
  onSubmit(): void {
    if (this.produtoForm.invalid) {
      console.log('Formulário inválido');
      this.produtoForm.markAllAsTouched(); // Mostra erros de validação
      return;
    }

    // Pega todos os valores, incluindo o 'id' desabilitado
    const produtoData = this.produtoForm.getRawValue();

    if (this.isEditing) {
      console.log('Salvando (Update):', produtoData);
      // Aqui você chamaria seu serviço de atualização
      // this.produtoService.update(this.produtoId, produtoData).subscribe(() => {
      //   alert('Produto atualizado com sucesso!');
      //   this.voltar();
      // });
    } else {
      console.log('Salvando (Create):', produtoData);
      // Aqui você chamaria seu serviço de criação
      // this.produtoService.create(produtoData).subscribe(() => {
      //   alert('Produto criado com sucesso!');
      //   this.voltar();
      // });
    }
  }

  /**
   * Chamado ao clicar em "Voltar" ou "Cancelar".
   */
  voltar(): void {
    this.router.navigateByUrl('/produto');
  }
}

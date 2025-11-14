import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StatusProduto } from '../../model/enums/StatusProduto';
import { Produto } from '../../model/Produto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto-service';

@Component({
  selector: 'app-gerenciar-produto',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './gerenciar-produto.page.html',
  styleUrl: './gerenciar-produto.page.scss',
})
export class GerenciarProdutoPage implements OnInit {

  produtoForm: FormGroup;
  isEditing = false;
  produtoId: number | null = null;
  
  statusOptions = Object.values(StatusProduto);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService // <-- Injetado
  ) {
    this.produtoForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: ['', Validators.required],
      descricao: [''], 
      quantidadeCaixa: [null, [Validators.required, Validators.min(0)]],
      // Assumindo que seu modelo 'Produto' inclui 'precoCompra'
      precoCompra: [null, [Validators.required, Validators.min(0)]],
      precoVenda: [null, [Validators.required, Validators.min(0)]],
      status: [StatusProduto.ATIVO, Validators.required],
      quantidadeEmEstoque: [{ value: null, disabled: true }, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.isEditing = true;
      this.produtoId = +idParam;
      this.carregarProduto();
    }
  }

  /**
   * Carrega os dados do produto da API (não mais simulado).
   */
  carregarProduto(): void {
    if (!this.produtoId) return;

    console.log('Modo Edição: Carregando produto ID:', this.produtoId);
    
    this.produtoService.findById(this.produtoId).subscribe({
      next: (produtoDaApi) => {
        // Preenche o formulário com os dados carregados
        this.produtoForm.patchValue(produtoDaApi);
        console.log('Produto carregado:', produtoDaApi);
      },
      error: (erro) => {
        console.error('Falha ao carregar produto.', erro);
        alert('Erro ao carregar o produto. Voltando para a lista.');
        this.voltar();
      }
    });
  }

  /**
   * Chamado ao clicar em "Salvar".
   * Agora chama o serviço de create ou update.
   */
  onSubmit(): void {
    if (this.produtoForm.invalid) {
      console.log('Formulário inválido');
      this.produtoForm.markAllAsTouched();
      return;
    }

    // Pega todos os valores, incluindo o 'id' desabilitado
    const produtoData = this.produtoForm.getRawValue() as Produto;

    if (this.isEditing) {
      console.log('Salvando (Update):', produtoData);
      
      // Chama o serviço de atualização
      this.produtoService.update(produtoData, this.produtoId!).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.voltar();
        },
        error: (erro) => {
          console.error('Falha ao atualizar produto.', erro);
          alert('Erro ao atualizar produto.');
        }
      });

    } else {
      console.log('Salvando (Create):', produtoData);
      
      // Chama o serviço de criação
      this.produtoService.create(produtoData).subscribe({
        next: () => {
          alert('Produto criado com sucesso!');
          this.voltar();
        },
        error: (erro) => {
          console.error('Falha ao criar produto.', erro);
          alert('Erro ao criar produto.');
        }
      });
    }
  }

  /**
   * Chamado ao clicar em "Voltar" ou "Cancelar".
   */
  voltar(): void {
    this.router.navigateByUrl('/produto');
  }
}

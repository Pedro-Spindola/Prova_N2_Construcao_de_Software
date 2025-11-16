import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../model/Produto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-model-estoque',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './model-estoque.html',
  styleUrl: './model-estoque.scss',
})
export class ModelEstoque {
  @Input() produto!: Produto;
  @Input() aberto: boolean = false;
  
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<number>();

  novaQuantidade!: number;

  ngOnChanges() {
    if (this.produto) {
      this.novaQuantidade = this.produto.quantidadeEmEstoque;
    }
  }

  onSalvar() {
    this.salvar.emit(this.novaQuantidade);
  }
}

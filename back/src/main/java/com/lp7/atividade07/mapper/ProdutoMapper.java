package com.lp7.atividade07.mapper;

import org.springframework.stereotype.Component;

import com.lp7.atividade07.dto.ProdutoRequestDTO;
import com.lp7.atividade07.dto.ProdutoResponseDTO;
import com.lp7.atividade07.model.Estoque;
import com.lp7.atividade07.model.Produto;

@Component
public class ProdutoMapper {

    public Produto toEntity(ProdutoRequestDTO dto, Estoque estoque) {
        Produto produto = new Produto();
        produto.setId(dto.id());
        produto.setNome(dto.nome());
        produto.setDescricao(dto.descricao());
        produto.setQuantidadeCaixa(dto.quantidadeCaixa());
        produto.setPrecoCusto(dto.precoCompra());
        produto.setPrecoVenda(dto.precoVenda());
        produto.setStatus(dto.status());
        produto.setEstoque(estoque);
        
        return produto;
    }

    public ProdutoResponseDTO toResponseDTO(Produto produto) {
        
        Integer estoqueAtual = 0;
        if (produto.getEstoque() != null) {
            estoqueAtual = produto.getEstoque().getQuantidade();
        }

        return new ProdutoResponseDTO(
            produto.getId(),
            produto.getNome(),
            produto.getDescricao(),
            produto.getQuantidadeCaixa(),
            produto.getPrecoVenda(),
            produto.getPrecoCusto(),
            produto.getStatus(),
            estoqueAtual
        );
        
    }
}

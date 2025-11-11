package com.lp7.atividade07.mapper;

import org.springframework.stereotype.Component;

import com.lp7.atividade07.dto.EstoqueRequestDTO;
import com.lp7.atividade07.dto.EstoqueResponseDTO;
import com.lp7.atividade07.model.Estoque;
import com.lp7.atividade07.model.Produto;

@Component
public class EstoqueMapper {
    public Estoque toEntity(EstoqueRequestDTO dto, Produto produto) {
        Estoque estoque = new Estoque();
        estoque.setQuantidade(dto.quantidade());
        estoque.setProduto(produto);

        return estoque;
    }
    
    public EstoqueResponseDTO toResponseDTO(Estoque estoque) {
        return new EstoqueResponseDTO(
            estoque.getId(),
            estoque.getQuantidade(),
            estoque.getProduto().getId(),
            estoque.getProduto().getNome()
        );
    }
}

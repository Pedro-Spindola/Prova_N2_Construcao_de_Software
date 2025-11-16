package com.lp7.atividade07.dto;

import java.math.BigDecimal;

import com.lp7.atividade07.model.enums.StatusProduto;

public record ProdutoResponseDTO(
    Long id,
    String nome,
    String descricao,
    Integer quantidadeCaixa,
    BigDecimal precoVenda,
    BigDecimal precoCompra,
    StatusProduto status,
    Integer quantidadeEmEstoque
) {
}

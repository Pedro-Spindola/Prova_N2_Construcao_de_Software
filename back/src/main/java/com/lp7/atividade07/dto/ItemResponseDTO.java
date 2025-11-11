package com.lp7.atividade07.dto;

import java.math.BigDecimal;

public record ItemResponseDTO(
    Integer quantidade,
    BigDecimal subTotal,
    ProdutoResponseDTO produto
) {
}

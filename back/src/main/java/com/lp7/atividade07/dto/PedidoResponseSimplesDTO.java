package com.lp7.atividade07.dto;

import java.math.BigDecimal;

public record PedidoResponseSimplesDTO(
    Long id,
    BigDecimal total,
    String cliente,
    String usuario
) {
}

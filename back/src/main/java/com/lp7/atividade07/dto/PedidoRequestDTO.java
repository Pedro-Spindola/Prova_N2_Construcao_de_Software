package com.lp7.atividade07.dto;

import java.math.BigDecimal;
import java.util.List;

public record PedidoRequestDTO(
    Long id,
    BigDecimal total,
    BigDecimal troco,
    Long cliente,
    Long usuario,
    List<ItemRequestDTO> itensComprados
) {}

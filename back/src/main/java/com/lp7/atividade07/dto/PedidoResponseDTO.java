package com.lp7.atividade07.dto;

import java.math.BigDecimal;
import java.util.List;

public record PedidoResponseDTO(
    Long id,
    BigDecimal total,
    BigDecimal troco,
    ClienteResponseDTO cliente,
    UsuarioResponseDTO usuario,
    List<ItemResponseDTO> itensComprados
) {}



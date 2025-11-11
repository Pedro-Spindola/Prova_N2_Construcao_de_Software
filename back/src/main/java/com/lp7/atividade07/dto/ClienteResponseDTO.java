package com.lp7.atividade07.dto;

import com.lp7.atividade07.model.enums.StatusCliente;
import com.lp7.atividade07.model.enums.TipoCliente;

public record ClienteResponseDTO(
    Long id,
    String nome,
    TipoCliente tipo,
    String documento,
    String endereco,
    StatusCliente status
) {
}

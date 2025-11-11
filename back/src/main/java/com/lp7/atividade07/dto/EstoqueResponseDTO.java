package com.lp7.atividade07.dto;

public record EstoqueResponseDTO(
    Long id,
    Integer quantidade,
    Long idProduto,
    String nomeProduto
) {}

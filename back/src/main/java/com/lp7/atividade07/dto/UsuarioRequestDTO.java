package com.lp7.atividade07.dto;

import com.lp7.atividade07.model.enums.PerfilUsuario;
import com.lp7.atividade07.model.enums.StatusUsuario;

public record UsuarioRequestDTO(
    Long id,
    String nome,
    String email,
    String senha,
    PerfilUsuario perfil,
    StatusUsuario status
) {}

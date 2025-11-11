package com.lp7.atividade07.mapper;

import org.springframework.stereotype.Component;

import com.lp7.atividade07.dto.UsuarioRequestDTO;
import com.lp7.atividade07.dto.UsuarioResponseDTO;
import com.lp7.atividade07.model.Usuario;

@Component
public class UsuarioMapper {
 public Usuario toEntity(UsuarioRequestDTO dto ){
    Usuario usuario = new Usuario();
    usuario.setNome(dto.nome());
    usuario.setEmail(dto.email());
    usuario.setSenha(dto.senha());
    usuario.setPerfil(dto.perfil());
    usuario.setStatus(dto.status());

    return usuario;
} 
public UsuarioResponseDTO toResponseDTO(Usuario usuario){
    return new UsuarioResponseDTO(
        usuario.getId(),
        usuario.getNome(),
        usuario.getEmail(),
        usuario.getSenha(),
        usuario.getPerfil(),
        usuario.getStatus()
            );
}
}



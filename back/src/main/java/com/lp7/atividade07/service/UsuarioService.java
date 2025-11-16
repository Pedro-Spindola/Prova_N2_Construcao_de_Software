package com.lp7.atividade07.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lp7.atividade07.dto.LoginRequestDTO;
import com.lp7.atividade07.dto.UsuarioRequestDTO;
import com.lp7.atividade07.dto.UsuarioResponseDTO;
import com.lp7.atividade07.exception.CampoObrigatorioNuloException;
import com.lp7.atividade07.exception.DadoJaCadastradoException;
import com.lp7.atividade07.mapper.UsuarioMapper;
import com.lp7.atividade07.model.Caixa;
import com.lp7.atividade07.model.Usuario;
import com.lp7.atividade07.model.enums.StatusUsuario;
import com.lp7.atividade07.repository.CaixaRepository;
import com.lp7.atividade07.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    CaixaRepository caixaRepository;

    @Autowired
    UsuarioMapper usuarioMapper;

    public UsuarioResponseDTO buscarUsuarioPorId(Long idUsuario){
         Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new CampoObrigatorioNuloException("Usuário não encontrado."));

    return usuarioMapper.toResponseDTO(usuario);
    }

    public UsuarioResponseDTO registrarUsuario(UsuarioRequestDTO dto){

        if(dto.nome() == null || dto.nome().trim().isEmpty())
            throw new CampoObrigatorioNuloException("nome é obrigatório");
        if(dto.nome().trim().length() < 3)
            throw new CampoObrigatorioNuloException("nome deve ter no mínimo 3 caracteres");


        if(dto.email() == null || dto.email().trim().isEmpty())
            throw new CampoObrigatorioNuloException("email é obrigatório");
        if(!dto.email().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"))
            throw new CampoObrigatorioNuloException("email inválido (formato incorreto)");
        if(usuarioRepository.findByEmail(dto.email()).isPresent())
            throw new DadoJaCadastradoException("Esse email já existe.");


            
        if(dto.senha() == null || dto.senha().trim().isEmpty())
            throw new CampoObrigatorioNuloException("senha é obrigatório ");
        if(dto.senha().length() < 8)
            throw new CampoObrigatorioNuloException("senha deve ter no mínimo 8 caracteres");
        if(!dto.senha().matches(".*[A-Z].*"))
            throw new CampoObrigatorioNuloException("senha deve conter pelo menos uma letra maiúscula");
        if(!dto.senha().matches(".*[0-9].*"))
            throw new CampoObrigatorioNuloException("senha deve conter pelo menos um número");


        if(dto.perfil() == null)
            throw new CampoObrigatorioNuloException("perfil é obrigatório");

        if(dto.status() == null)
            throw new CampoObrigatorioNuloException("status é obrigatório");

        Usuario usuario = usuarioMapper.toEntity(dto);
        Usuario salvo = usuarioRepository.save(usuario);

        Caixa caixa = new Caixa();
        caixaRepository.save(caixa);

        return usuarioMapper.toResponseDTO(salvo);
    }

    public UsuarioResponseDTO atualizarUsuario(UsuarioRequestDTO dto, Long idUsuario){
       Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new CampoObrigatorioNuloException("Usuário com ID " + idUsuario + " não encontrado."));

    if(dto.nome() == null || dto.nome().trim().isEmpty())
        throw new CampoObrigatorioNuloException("nome é obrigatório");
    if(dto.nome().trim().length() < 3)
        throw new CampoObrigatorioNuloException("nome deve ter no mínimo 3 caracteres");

    if(dto.email() == null || dto.email().trim().isEmpty())
        throw new CampoObrigatorioNuloException("email é obrigatório");
    if(!dto.email().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"))
        throw new CampoObrigatorioNuloException("email inválido (formato incorreto)");

    // Verifica se o email existe e se NÃO pertence ao usuário que está sendo atualizado
    usuarioRepository.findByEmail(dto.email())
        .filter(u -> !u.getId().equals(idUsuario))
        .ifPresent(u -> { throw new DadoJaCadastradoException("Esse email já existe."); });// se estiver outro id com esse email gera um erro

            if(dto.senha() == null || dto.senha().trim().isEmpty())
                throw new CampoObrigatorioNuloException("senha é obrigatório ");
            if(dto.senha().length() < 8)
                throw new CampoObrigatorioNuloException("senha deve ter no mínimo 8 caracteres");
            if(!dto.senha().matches(".*[A-Z].*"))
                throw new CampoObrigatorioNuloException("senha deve conter pelo menos uma letra maiúscula");
            if(!dto.senha().matches(".*[0-9].*"))
                throw new CampoObrigatorioNuloException("senha deve conter pelo menos um número");

            if(dto.perfil() == null)
                throw new CampoObrigatorioNuloException("perfil é obrigatório");

            if(dto.status() == null)
                throw new CampoObrigatorioNuloException("status é obrigatório");

    usuario.setNome(dto.nome());
    usuario.setEmail(dto.email());
    usuario.setSenha(dto.senha());
    usuario.setPerfil(dto.perfil());
    usuario.setStatus(dto.status());

    Usuario salvo = usuarioRepository.save(usuario);
    return usuarioMapper.toResponseDTO(salvo);
    }

    public List<UsuarioResponseDTO> buscarTodos(){
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                       .map(usuarioMapper::toResponseDTO)
                       .toList();
    }

    public UsuarioResponseDTO inativarUsuario(Long idUsuario){
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new CampoObrigatorioNuloException("Usuário não encontrado."));
        if(usuario.getStatus() == StatusUsuario.ATIVO) {
            usuario.setStatus(StatusUsuario.INATIVO);
        } else {
            usuario.setStatus(StatusUsuario.ATIVO);
        }

        Usuario salvo = usuarioRepository.save(usuario);
        return usuarioMapper.toResponseDTO(salvo);
    }

  public UsuarioResponseDTO autenticar(LoginRequestDTO request){
    Usuario usuario = usuarioRepository.findByEmail(request.email())
        .orElseThrow(() -> new CampoObrigatorioNuloException("Usuário não encontrado."));
    if(!usuario.getSenha().equals(request.senha()))throw new CampoObrigatorioNuloException("Senha invalida.");
    
    return usuarioMapper.toResponseDTO(usuario); 
    }
}
    


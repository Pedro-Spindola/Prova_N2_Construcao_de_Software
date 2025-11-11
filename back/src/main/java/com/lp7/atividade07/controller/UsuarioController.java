package com.lp7.atividade07.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lp7.atividade07.dto.LoginRequestDTO;
import com.lp7.atividade07.dto.UsuarioRequestDTO;
import com.lp7.atividade07.dto.UsuarioResponseDTO;
import com.lp7.atividade07.service.UsuarioService;
@RestController
@RequestMapping("/api/v1/usuario")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/{idUsuario}")
    public UsuarioResponseDTO buscarUsuario(@PathVariable Long idUsuario){
        return usuarioService.buscarUsuarioPorId(idUsuario);
    }

    @GetMapping("/buscartodos")
    public List<UsuarioResponseDTO> buscarTodos(){
        return usuarioService.buscarTodos();
    }

    @PostMapping("/salvar")
    public UsuarioResponseDTO registrarUsuario(@RequestBody UsuarioRequestDTO dto){
        return usuarioService.registrarUsuario(dto);
    }

    @PutMapping("/atualizar/{idUsuario}")
    public UsuarioResponseDTO atualizarUsuario(@RequestBody UsuarioRequestDTO dto, @PathVariable Long idUsuario){
        return usuarioService.atualizarUsuario(dto, idUsuario);
    }

    @PutMapping("/inativar/{idUsuario}")
    public UsuarioResponseDTO inativarUsuario(@PathVariable Long idUsuario){
        return usuarioService.inativarUsuario(idUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        try {
            // Tenta autenticar
            UsuarioResponseDTO response = usuarioService.autenticar(request);
            // Se der certo, retorna 200 OK com o usuário no corpo
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Se a autenticação falhar (usuário/senha errados)
            // Retorna 401 Unauthorized com a mensagem de erro
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}



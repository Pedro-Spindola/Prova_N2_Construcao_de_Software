package com.lp7.atividade07.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lp7.atividade07.dto.ClienteRequestDTO;
import com.lp7.atividade07.dto.ClienteResponseDTO;
import com.lp7.atividade07.service.ClienteService;
@RestController
@RequestMapping("/api/v1/cliente")

public class ClienteController {
    
    @Autowired
    ClienteService clienteService;

    @GetMapping("/{idCliente}")
    public ClienteResponseDTO buscarCliente(@PathVariable Long idCliente){
        return clienteService.buscarClientePorId(idCliente);
    }

    @GetMapping("/buscartodosCliente")
    public List<ClienteResponseDTO> buscarTodos(){
        return clienteService.buscarTodos();
    }

    @PostMapping("/salvar")
    public ClienteResponseDTO registrarCliente(@RequestBody ClienteRequestDTO dto){
    return clienteService.registrarCliente(dto);
    }

    @PutMapping("/atualizar/{idCliente}")
    public ClienteResponseDTO atualizar(@RequestBody ClienteRequestDTO dto, @PathVariable Long idCliente){
        return clienteService.atualizarCliente(dto, idCliente);
    }

    @PutMapping("/inativar/{idCliente}")
    public ClienteResponseDTO inativar(@PathVariable Long idCliente){
        return clienteService.inativarCliente(idCliente);
    }
}
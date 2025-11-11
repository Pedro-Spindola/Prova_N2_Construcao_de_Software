package com.lp7.atividade07.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lp7.atividade07.dto.PedidoRequestDTO;
import com.lp7.atividade07.dto.PedidoResponseDTO;
import com.lp7.atividade07.dto.PedidoResponseSimplesDTO;
import com.lp7.atividade07.service.PedidoService;

@RestController
@RequestMapping("/api/v1/pedido")
public class PedidoController {
    @Autowired
    PedidoService pedidoService;

    @GetMapping
    public List<PedidoResponseSimplesDTO> buscarTodos(){
        return pedidoService.buscarTodos();
    }

    @GetMapping("/{idPedido}")
    public PedidoResponseSimplesDTO buscarPedidoPorId(@PathVariable Long idPedido){
        return pedidoService.buscarPedidoPorId(idPedido);
    }

    @PostMapping("/salvar")
    public PedidoResponseDTO registrarPedido(@RequestBody PedidoRequestDTO dto){
        return pedidoService.registrarPedido(dto);
    }

}

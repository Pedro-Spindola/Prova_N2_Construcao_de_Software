package com.lp7.atividade07.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.lp7.atividade07.dto.ClienteResponseDTO;
import com.lp7.atividade07.dto.ItemResponseDTO;
import com.lp7.atividade07.dto.PedidoRequestDTO;
import com.lp7.atividade07.dto.PedidoResponseDTO;
import com.lp7.atividade07.dto.PedidoResponseSimplesDTO;
import com.lp7.atividade07.dto.UsuarioResponseDTO;
import com.lp7.atividade07.model.Cliente;
import com.lp7.atividade07.model.ItemPedido;
import com.lp7.atividade07.model.Pedido;
import com.lp7.atividade07.model.Usuario;

@Component
public class PedidoMapper {
    public Pedido toEntity(PedidoRequestDTO dto, Cliente cliente, Usuario usuario, List<ItemPedido> listItem){
    Pedido pedido = new Pedido();
        pedido.setTotal(dto.total());
        pedido.setTroco(dto.troco());
        pedido.setCliente(cliente);
        pedido.setUsuario(usuario);
        for (ItemPedido item : listItem) {
            item.setPedido(pedido);
        }
        pedido.setItensPedido(listItem);
        return pedido;
    }

    public PedidoResponseDTO toResponseDTO(Pedido pedido, ClienteResponseDTO cliente, UsuarioResponseDTO usuario, List<ItemResponseDTO> listItem){
        return new PedidoResponseDTO(
            pedido.getId(),
            pedido.getTotal(),
            pedido.getTroco(),
            cliente,
            usuario,
            listItem
        );
    }

    public PedidoResponseSimplesDTO toResponseSimplesDTO(Pedido pedido){
        return new PedidoResponseSimplesDTO(
            pedido.getId(),
            pedido.getTotal(),
            pedido.getCliente().getNome(),
            pedido.getUsuario().getNome()
            );
    }

}

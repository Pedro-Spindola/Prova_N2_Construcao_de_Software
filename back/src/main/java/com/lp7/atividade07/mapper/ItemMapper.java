package com.lp7.atividade07.mapper;

import org.springframework.stereotype.Component;

import com.lp7.atividade07.dto.ItemRequestDTO;
import com.lp7.atividade07.dto.ItemResponseDTO;
import com.lp7.atividade07.dto.ProdutoResponseDTO;
import com.lp7.atividade07.model.ItemPedido;
import com.lp7.atividade07.model.Produto;

@Component
public class ItemMapper {
    public ItemPedido toEntity(ItemRequestDTO dto, Produto produto){
        ItemPedido item = new ItemPedido();
        item.setQuantidade(dto.quantidade());
        item.setProduto(produto);
        return item;
    }

    public ItemResponseDTO toResponseDTO(ItemPedido itemPedido, ProdutoResponseDTO produto){
        return new ItemResponseDTO(itemPedido.getQuantidade(), itemPedido.getSubTotal(), produto);
    }
}

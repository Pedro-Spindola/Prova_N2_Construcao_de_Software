package com.lp7.atividade07.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lp7.atividade07.dto.ClienteResponseDTO;
import com.lp7.atividade07.dto.ItemRequestDTO;
import com.lp7.atividade07.dto.ItemResponseDTO;
import com.lp7.atividade07.dto.PedidoRequestDTO;
import com.lp7.atividade07.dto.PedidoResponseDTO;
import com.lp7.atividade07.dto.ProdutoResponseDTO;
import com.lp7.atividade07.dto.UsuarioResponseDTO;
import com.lp7.atividade07.exception.CampoObrigatorioNuloException;
import com.lp7.atividade07.exception.ClienteNaoEncontradoException;
import com.lp7.atividade07.exception.PedidoNaoEncontradoException;
import com.lp7.atividade07.exception.ProdutoNaoEncontradoException;
import com.lp7.atividade07.exception.UsuarioNaoEncontradoException;
import com.lp7.atividade07.mapper.ClienteMapper;
import com.lp7.atividade07.mapper.ItemMapper;
import com.lp7.atividade07.mapper.PedidoMapper;
import com.lp7.atividade07.mapper.ProdutoMapper;
import com.lp7.atividade07.mapper.UsuarioMapper;
import com.lp7.atividade07.model.Cliente;
import com.lp7.atividade07.model.ItemPedido;
import com.lp7.atividade07.model.Pedido;
import com.lp7.atividade07.model.Produto;
import com.lp7.atividade07.model.Usuario;
import com.lp7.atividade07.repository.ClienteRepository;
import com.lp7.atividade07.repository.PedidoRepository;
import com.lp7.atividade07.repository.ProdutoRepository;
import com.lp7.atividade07.repository.UsuarioRepository;

@Service
public class PedidoService {
    @Autowired
    PedidoRepository pedidoRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    PedidoMapper pedidoMapper;

    @Autowired
    ClienteMapper clienteMapper;

    @Autowired
    UsuarioMapper usuarioMapper;

    @Autowired
    ItemMapper itemMapper;

    @Autowired
    ProdutoMapper produtoMapper;
    

  public PedidoResponseDTO buscarPedidoPorId(Long idPedido) {
    Pedido pedido = pedidoRepository.findById(idPedido)
        .orElseThrow(() -> new PedidoNaoEncontradoException("Pedido com id " + idPedido + " não encontrado."));

    ClienteResponseDTO clienteResponseDTO = clienteMapper.toResponseDTO(pedido.getCliente());
    UsuarioResponseDTO usuarioResponseDTO = usuarioMapper.toResponseDTO(pedido.getUsuario());

    List<ItemResponseDTO> itensResponseDTO = pedido.getItensPedido().stream()
        .map(item -> {
            ProdutoResponseDTO produtoResponseDTO = produtoMapper.toResponseDTO(item.getProduto());
            return itemMapper.toResponseDTO(item, produtoResponseDTO);
        }) .toList();
        
    return pedidoMapper.toResponseDTO(pedido, clienteResponseDTO, usuarioResponseDTO, itensResponseDTO);
}

    public PedidoResponseDTO registrarPedido(PedidoRequestDTO dto){
     Pedido pedido = new Pedido();
    pedido.setItensPedido(new ArrayList<>());

    Cliente cliente = clienteRepository.findById(dto.cliente())
        .orElseThrow(() -> new ClienteNaoEncontradoException(
            "Cliente com id: " + dto.cliente() + " não encontrado."
        ));

    Usuario usuario = usuarioRepository.findById(dto.usuario())
        .orElseThrow(() -> new UsuarioNaoEncontradoException(
            "Usuário com id: " + dto.usuario() + " não encontrado."
        ));

    List<ItemPedido> meusItems = new ArrayList<>();

    System.out.println("Tamanho de list pedidoDTO: " + dto.itensComprados().size());

    for(ItemRequestDTO i : dto.itensComprados()){

        Produto produto = produtoRepository.findById(i.idProduto())
            .orElseThrow(() -> new ProdutoNaoEncontradoException(
                "Produto com id: " + i.idProduto() + " não encontrado."
            ));

        ItemPedido novoItem = itemMapper.toEntity(i, produto);
        novoItem.setSubTotal(
        produto.getPrecoVenda().multiply(BigDecimal.valueOf(i.quantidade())));

        novoItem.setPedido(pedido);
        meusItems.add(novoItem);
    }

    pedido = pedidoMapper.toEntity(dto, cliente, usuario, meusItems);

    System.out.println("Tamanho de list pedido: " + pedido.getItensPedido().size());
    for(ItemPedido i : pedido.getItensPedido()){
        System.out.println("Testando antes de enviar: " + i.getPedido());
    }

    Pedido salvo = pedidoRepository.save(pedido);

    ClienteResponseDTO clienteResponseDTO = clienteMapper.toResponseDTO(cliente);
    UsuarioResponseDTO usuarioResponseDTO = usuarioMapper.toResponseDTO(usuario);

    List<ItemResponseDTO> itemsResponseDTOs = new ArrayList<>();

    for(ItemPedido i : salvo.getItensPedido()){
        ProdutoResponseDTO produtoResponseDTO = produtoMapper.toResponseDTO(i.getProduto());
        ItemResponseDTO itemResponseDTO = itemMapper.toResponseDTO(i, produtoResponseDTO);
        itemsResponseDTOs.add(itemResponseDTO);
    }

    return pedidoMapper.toResponseDTO(salvo, clienteResponseDTO, usuarioResponseDTO, itemsResponseDTOs);
}

    
    public PedidoResponseDTO atualizarPedido(PedidoRequestDTO dto, Long idPedido){
    if(dto.itensComprados() == null || dto.itensComprados().isEmpty())
        throw new CampoObrigatorioNuloException("lista de itens do pedido");

    Cliente cliente = clienteRepository.findById(dto.cliente())
            .orElseThrow(() -> new ClienteNaoEncontradoException(
                "Cliente com id " + dto.cliente() + " não encontrado."
            ));

    Usuario usuario = usuarioRepository.findById(dto.usuario())
            .orElseThrow(() -> new UsuarioNaoEncontradoException(
                "Usuário com id " + dto.usuario() + " não encontrado."
            ));

    List<ItemPedido> meusItems = new ArrayList<>();

    for(ItemRequestDTO i : dto.itensComprados()){

        if(i == null) throw new CampoObrigatorioNuloException("item do pedido");

        Produto produto = produtoRepository.findById(i.idProduto())
                .orElseThrow(() -> new ProdutoNaoEncontradoException(
                    "Produto com id " + i.idProduto() + " não encontrado."
                ));

        ItemPedido novoItem = itemMapper.toEntity(i, produto);
        meusItems.add(novoItem);
    }

    Pedido pedido = pedidoMapper.toEntity(dto, cliente, usuario, meusItems);

    Pedido salvo = pedidoRepository.save(pedido);

    ClienteResponseDTO clienteResponseDTO = clienteMapper.toResponseDTO(cliente);
    UsuarioResponseDTO usuarioResponseDTO = usuarioMapper.toResponseDTO(usuario);

    List<ItemResponseDTO> itemsResponseDTOs = new ArrayList<>();
    for(ItemPedido i : salvo.getItensPedido()){
        ProdutoResponseDTO produtoResponseDTO = produtoMapper.toResponseDTO(i.getProduto());
        ItemResponseDTO itemResponseDTO = itemMapper.toResponseDTO(i, produtoResponseDTO);
        itemsResponseDTOs.add(itemResponseDTO);
    }

    return pedidoMapper.toResponseDTO(
        salvo, clienteResponseDTO, usuarioResponseDTO, itemsResponseDTOs
    );
}

public List<PedidoResponseDTO> buscarTodos() {

    List<Pedido> pedidos = pedidoRepository.findAll();

    List<PedidoResponseDTO> resposta = new ArrayList<>();

    for (Pedido pedido : pedidos) {

        // CLIENTE
        ClienteResponseDTO clienteResponseDTO =
                clienteMapper.toResponseDTO(pedido.getCliente());

        // USUÁRIO
        UsuarioResponseDTO usuarioResponseDTO =
                usuarioMapper.toResponseDTO(pedido.getUsuario());

        // ITENS
        List<ItemResponseDTO> itensResponseDTO = new ArrayList<>();

        for (ItemPedido item : pedido.getItensPedido()) {

            ProdutoResponseDTO produtoResponseDTO =
                    produtoMapper.toResponseDTO(item.getProduto());

            ItemResponseDTO itemResponseDTO =
                    itemMapper.toResponseDTO(item, produtoResponseDTO);

            itensResponseDTO.add(itemResponseDTO);
        }

        // MONTA O PEDIDO COMPLETO
        PedidoResponseDTO pedidoResponseDTO =
                pedidoMapper.toResponseDTO(
                        pedido,
                        clienteResponseDTO,
                        usuarioResponseDTO,
                        itensResponseDTO
                );

        resposta.add(pedidoResponseDTO);
    }

    return resposta;
}
    
}





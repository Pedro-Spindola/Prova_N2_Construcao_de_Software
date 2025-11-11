package com.lp7.atividade07.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lp7.atividade07.dto.ClienteRequestDTO;
import com.lp7.atividade07.dto.ClienteResponseDTO;
import com.lp7.atividade07.exception.CampoObrigatorioNuloException;
import com.lp7.atividade07.exception.ClienteNaoEncontradoException;
import com.lp7.atividade07.mapper.ClienteMapper;
import com.lp7.atividade07.model.Cliente;
import com.lp7.atividade07.model.enums.StatusCliente;
import com.lp7.atividade07.repository.ClienteRepository;
import com.lp7.atividade07.repository.ProdutoRepository;

@Service
public class ClienteService {
    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ClienteMapper clienteMapper;

     public ClienteResponseDTO buscarClientePorId(Long idCliente){
         Cliente cliente = clienteRepository.findById(idCliente)
            .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente com ID " + idCliente + " não encontrado."));
        return clienteMapper.toResponseDTO(cliente);
    }


    public ClienteResponseDTO registrarCliente(ClienteRequestDTO dto){
        if(dto.nome() == null || dto.nome().trim().isEmpty())
            throw new CampoObrigatorioNuloException("nome");
        if(dto.nome().length() < 3)
            throw new CampoObrigatorioNuloException("nome deve ter no mínimo 3 caracteres");

        if(dto.tipo() == null)
            throw new CampoObrigatorioNuloException("tipo é obrigatório");

        if(dto.documento() == null || dto.documento().trim().isEmpty())
            throw new CampoObrigatorioNuloException("documento é obrigatório");

        if(dto.endereco() == null || dto.endereco().trim().isEmpty())
            throw new CampoObrigatorioNuloException("endereco é obrigatório");

        if(dto.status() == null)
            throw new CampoObrigatorioNuloException("status");

        Cliente cliente = clienteMapper.toEntity(dto);
        Cliente salvo = clienteRepository.save(cliente);
        return clienteMapper.toResponseDTO(salvo);
    }

   
    public ClienteResponseDTO atualizarCliente(ClienteRequestDTO dto, Long idCliente){
       Cliente cliente = clienteRepository.findById(idCliente)
            .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente com ID " + idCliente + " não encontrado."));

        if(dto.nome() == null || dto.nome().trim().isEmpty())
            throw new CampoObrigatorioNuloException("nome");
        if(dto.nome().length() < 3)
            throw new CampoObrigatorioNuloException("nome deve ter no mínimo 3 caracteres");

        cliente.setNome(dto.nome());
        cliente.setTipo(dto.tipo());
        cliente.setDocumento(dto.documento());
        cliente.setEndereco(dto.endereco());
        cliente.setStatus(dto.status());

        Cliente salvo = clienteRepository.save(cliente);
        return clienteMapper.toResponseDTO(salvo);
    }

    
    public List<ClienteResponseDTO> buscarTodos(){
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream() .map(clienteMapper::toResponseDTO) .toList();
    }

 
    public ClienteResponseDTO inativarCliente(Long idCliente){
    Cliente cliente = clienteRepository.findById(idCliente)
        .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente de ID " + idCliente + " não encontrado."));

        if(cliente.getStatus() == StatusCliente.ATIVO) {
            cliente.setStatus(StatusCliente.INATIVO);
        } else {
            cliente.setStatus(StatusCliente.ATIVO);
        }
        Cliente salvo = clienteRepository.save(cliente);
        return clienteMapper.toResponseDTO(salvo);
        }
}

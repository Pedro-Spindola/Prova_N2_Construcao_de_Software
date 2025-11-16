package com.lp7.atividade07.mapper;

import org.springframework.stereotype.Component;

import com.lp7.atividade07.dto.ClienteRequestDTO;
import com.lp7.atividade07.dto.ClienteResponseDTO;
import com.lp7.atividade07.model.Cliente;

@Component
public class ClienteMapper {
    public Cliente toEntity(ClienteRequestDTO dto ){
        Cliente cliente = new Cliente();

        cliente.setNome(dto.nome());
        cliente.setTipo(dto.tipo());
        cliente.setDocumento(dto.documento());
        cliente.setEndereco(dto.endereco());
        cliente.setStatus(dto.status());

        return cliente;
    }
    public ClienteResponseDTO toResponseDTO(Cliente cliente) {
        return new ClienteResponseDTO(
          cliente.getId(),
          cliente.getNome(),
          cliente.getTipo(),
          cliente.getDocumento(),
          cliente.getEndereco(),
          cliente.getStatus()
      );
    }
}

    

        
    


      
    


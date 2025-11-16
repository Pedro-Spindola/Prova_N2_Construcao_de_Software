package com.lp7.atividade07.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lp7.atividade07.dto.EstoqueRequestDTO;
import com.lp7.atividade07.dto.EstoqueResponseDTO;
import com.lp7.atividade07.exception.CampoObrigatorioNuloException;
import com.lp7.atividade07.exception.ProdutoNaoEncontradoException;
import com.lp7.atividade07.mapper.EstoqueMapper;
import com.lp7.atividade07.model.Estoque;
import com.lp7.atividade07.repository.EstoqueRepository;
import com.lp7.atividade07.repository.ProdutoRepository;

@Service
public class EstoqueService {
    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    EstoqueRepository estoqueRepository;

    @Autowired
    EstoqueMapper estoqueMapper;

  public EstoqueResponseDTO buscarEstoquePorIdProduto(Long idProduto){
    Estoque estoque = estoqueRepository.findByProdutoId(idProduto).orElse(null);
        return estoqueMapper.toResponseDTO(estoque);
}


  public EstoqueResponseDTO atualizarEstoqueProduto(EstoqueRequestDTO dto){
    System.out.println("Meu dto: " + dto.idProduto() + " - " + dto.quantidade());

      if(dto.idProduto() == null)
            throw new CampoObrigatorioNuloException("id do produto");

        if(dto.quantidade() == null)
            throw new CampoObrigatorioNuloException("quantidade é obrigatótio");

        if(dto.quantidade() < 0)
            throw new CampoObrigatorioNuloException("quantidade deve ser maior ou igual a zero");

        Estoque estoque = estoqueRepository.findByProdutoId(dto.idProduto())
            .orElseThrow(() -> new ProdutoNaoEncontradoException("Produto não encontrado para ID: " + dto.idProduto()));

    estoque.setQuantidade(dto.quantidade());
    Estoque salvo = estoqueRepository.save(estoque);

    return estoqueMapper.toResponseDTO(salvo);
  }
}


    

